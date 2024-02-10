import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'russia-sponsors-response.json');

  // Read the file asynchronously
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON file
  const data = JSON.parse(fileContents);
    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json(data);
  
}
