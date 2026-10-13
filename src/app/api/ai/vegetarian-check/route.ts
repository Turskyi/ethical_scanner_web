export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

const VEGETARIAN_CHECK_PROMPT =
  'You are an expert food safety and dietary analyst. Your job is to analyze ' +
  'a list of product ingredients and determine whether the product is 100% vegetarian ' +
  '(suitable for vegetarians: no meat, poultry, fish, seafood, gelatin, animal fat, tallow, ' +
  'animal rennet, carmine, cochineal, or slaughter byproducts; dairy, eggs, and honey ' +
  'are allowed for vegetarians).\n\n' +
  'Analyze carefully. Respond ONLY with a valid JSON object matching this structure:\n' +
  '{\n' +
  '  "isVegetarian": boolean,\n' +
  '  "confidence": "high" | "medium" | "low",\n' +
  '  "reason": "Concise explanation (1-2 sentences) of why it is or is not vegetarian."\n' +
  '}\n' +
  'Do not include any Markdown code blocks or text outside the JSON object.';

const GEMINI_MODEL = 'gemini-3.5-flash-lite';
const MAX_OUTPUT_TOKENS = 400;

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

interface VegetarianAnalysis {
  isVegetarian: boolean;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function jsonResponse(body: object, status: number): Response {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

function parseVegetarianAnalysis(text: string): VegetarianAnalysis | null {
  const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  try {
    const parsed = JSON.parse(clean);
    if (
      isRecord(parsed) &&
      typeof parsed.isVegetarian === 'boolean' &&
      typeof parsed.reason === 'string'
    ) {
      const confidence =
        parsed.confidence === 'high' ||
        parsed.confidence === 'medium' ||
        parsed.confidence === 'low'
          ? parsed.confidence
          : 'medium';
      return {
        isVegetarian: parsed.isVegetarian,
        confidence,
        reason: parsed.reason.trim(),
      };
    }
  } catch (error) {
    console.warn('Failed to parse JSON from AI response:', error, text);
  }
  return null;
}

function extractChatCompletionText(value: unknown): string | null {
  if (!isRecord(value) || !Array.isArray(value.choices)) {
    return null;
  }

  const firstChoice = value.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    return null;
  }

  if (firstChoice.finish_reason === 'length') {
    throw new Error('Provider response reached its output token limit');
  }

  const content = firstChoice.message.content;
  if (typeof content === 'string' && content.trim().length > 0) {
    return content.trim();
  }

  return null;
}

async function requestChatCompletion(
  provider: (typeof PROVIDERS)[number],
  ingredients: string,
  apiKey: string,
): Promise<VegetarianAnalysis> {
  const response = await fetch(provider.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.1,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [
        { role: 'system', content: VEGETARIAN_CHECK_PROMPT },
        { role: 'user', content: `Ingredients to analyze: ${ingredients}` },
      ],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Provider returned HTTP ${response.status}`);
  }

  const rawText = extractChatCompletionText(await response.json());
  if (rawText === null) {
    throw new Error('Provider returned an empty response');
  }

  const analysis = parseVegetarianAnalysis(rawText);
  if (analysis === null) {
    throw new Error('Provider returned invalid analysis format');
  }

  return analysis;
}

async function requestGemini(
  ingredients: string,
  apiKey: string,
): Promise<VegetarianAnalysis> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: VEGETARIAN_CHECK_PROMPT }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `Ingredients to analyze: ${ingredients}` }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          responseMimeType: 'application/json',
        },
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

  if (candidate.finishReason === 'MAX_TOKENS') {
    throw new Error('Provider response reached its output token limit');
  }

  const rawText = candidate.content.parts
    .filter(isRecord)
    .map((part) => part.text)
    .filter((text): text is string => typeof text === 'string')
    .join(' ')
    .trim();

  if (typeof rawText !== 'string' || rawText.length === 0) {
    throw new Error('Provider returned an empty response');
  }

  const analysis = parseVegetarianAnalysis(rawText);
  if (analysis === null) {
    throw new Error('Provider returned invalid analysis format');
  }

  return analysis;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 10240) {
      return jsonResponse({ error: 'Request body is too large' }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (typeof body !== 'object' || body === null || !('ingredients' in body)) {
    return jsonResponse({ error: 'Ingredients are required' }, 400);
  }

  const ingredients = body.ingredients;
  if (
    typeof ingredients !== 'string' ||
    ingredients.trim().length < 3 ||
    ingredients.trim().length > 5000
  ) {
    return jsonResponse({ error: 'Invalid ingredients text' }, 400);
  }

  for (const provider of PROVIDERS) {
    const apiKey = provider.apiKey();
    if (apiKey) {
      try {
        const analysis = await requestChatCompletion(
          provider,
          ingredients,
          apiKey,
        );
        return jsonResponse(
          {
            ...analysis,
            provider: provider.name,
            model: provider.model,
          },
          200,
        );
      } catch (error) {
        console.warn(`${provider.name} vegetarian check failed:`, error);
      }
    }
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const analysis = await requestGemini(ingredients, geminiApiKey);
      return jsonResponse(
        { ...analysis, provider: 'Gemini', model: GEMINI_MODEL },
        200,
      );
    } catch (error) {
      console.warn('Gemini vegetarian check failed:', error);
    }
  }

  return jsonResponse({ error: 'AI service is unavailable' }, 503);
}
