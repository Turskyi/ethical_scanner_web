export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

const BARCODE_INFO_PROMPT =
  'You analyze product identifiers. Explain what can and cannot be inferred ' +
  'from the provided barcode or product identifier, especially GS1 prefix ' +
  'country assignment and common identifier formats. Clarify that a GS1 ' +
  'prefix identifies the GS1 member organization that allocated the number, ' +
  'not necessarily where the product was manufactured. Do not claim a ' +
  'product origin without reliable evidence. Be concise and state when the ' +
  'identifier alone is insufficient.';
const GEMINI_MODEL = 'gemini-3.5-flash-lite';

const PROVIDERS = [
  {
    name: 'Groq',
    model: 'qwen/qwen3.8-27b',
    apiKey: () => process.env.GROQ_API_KEY,
    url: 'https://api.groq.com/openai/v1/chat/completions',
  },
  {
    name: 'OpenRouter',
    model: 'deepseek/deepseek-chat',
    apiKey: () => process.env.OPENROUTER_API_KEY,
    url: 'https://openrouter.ai/api/v1/chat/completions',
  },
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function jsonResponse(body: object, status: number): Response {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

function extractChatCompletionText(value: unknown): string | null {
  if (!isRecord(value) || !Array.isArray(value.choices)) {
    return null;
  }

  const firstChoice = value.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    return null;
  }

  const content = firstChoice.message.content;
  if (typeof content === 'string' && content.trim().length > 0) {
    return content.trim();
  }

  return null;
}

async function requestChatCompletion(
  provider: (typeof PROVIDERS)[number],
  barcode: string,
  apiKey: string,
): Promise<string> {
  const response = await fetch(provider.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.2,
      max_tokens: 250,
      messages: [
        { role: 'system', content: BARCODE_INFO_PROMPT },
        { role: 'user', content: `Analyze this identifier: ${barcode}` },
      ],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Provider returned HTTP ${response.status}`);
  }

  const info = extractChatCompletionText(await response.json());
  if (info === null) {
    throw new Error('Provider returned an empty response');
  }

  return info;
}

async function requestGemini(barcode: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: BARCODE_INFO_PROMPT }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `Analyze this identifier: ${barcode}` }],
          },
        ],
        generationConfig: { temperature: 0.2, maxOutputTokens: 250 },
      }),
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Provider returned HTTP ${response.status}`);
  }

  const result: unknown = await response.json();
  if (!isRecord(result) || !Array.isArray(result.candidates)) {
    throw new Error('Provider returned an invalid response');
  }

  const candidate = result.candidates[0];
  if (
    !isRecord(candidate) ||
    !isRecord(candidate.content) ||
    !Array.isArray(candidate.content.parts)
  ) {
    throw new Error('Provider returned an invalid response');
  }

  const info = candidate.content.parts
    .filter(isRecord)
    .map((part) => part.text)
    .filter((text): text is string => typeof text === 'string')
    .join(' ')
    .trim();

  if (typeof info !== 'string' || info.length === 0) {
    throw new Error('Provider returned an empty response');
  }

  return info;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > 1024) {
    return jsonResponse({ error: 'Request body is too large' }, 413);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 1024) {
      return jsonResponse({ error: 'Request body is too large' }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (typeof body !== 'object' || body === null || !('barcode' in body)) {
    return jsonResponse({ error: 'A barcode is required' }, 400);
  }

  const barcode = body.barcode;
  if (
    typeof barcode !== 'string' ||
    barcode.length < 5 ||
    barcode.length > 64 ||
    !/^[A-Za-z0-9]+$/.test(barcode)
  ) {
    return jsonResponse({ error: 'Invalid barcode' }, 400);
  }

  for (const provider of PROVIDERS) {
    const apiKey = provider.apiKey();
    if (apiKey) {
      try {
        const info = await requestChatCompletion(provider, barcode, apiKey);
        return jsonResponse(
          { info, provider: provider.name, model: provider.model },
          200,
        );
      } catch (error) {
        console.warn(`${provider.name} barcode lookup failed:`, error);
      }
    }
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const info = await requestGemini(barcode, geminiApiKey);
      return jsonResponse({ info, provider: 'Gemini', model: GEMINI_MODEL }, 200);
    } catch (error) {
      console.warn('Gemini barcode lookup failed:', error);
    }
  }

  return jsonResponse({ error: 'AI service is unavailable' }, 503);
}
