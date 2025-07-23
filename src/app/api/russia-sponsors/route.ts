

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Define the path to the JSON file.
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'russia-sponsors-response.json',
  );

  // Read the file synchronously.
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON file.
  const data = JSON.parse(fileContents);

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}