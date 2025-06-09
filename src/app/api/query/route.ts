import Wetrocloud from "wetro-sdk";
import { NextResponse } from 'next/server';

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: process.env.WETRO_API_KEY || "",
});

export default async function POST(req: Request) {
  const { collection_id, request_query } = await req.json();

  // Query with streaming enabled
  const response = await client.queryCollection({
    collection_id,
    request_query,
  });

  // Process streaming response
  return NextResponse.json(response);
}