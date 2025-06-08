import { NextResponse, NextRequest } from 'next/server';
import Wetrocloud from "wetro-sdk";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  // Get API key from cookie
  const apiKey = request.cookies.get('wetro-api-key')?.value;
  if (!apiKey || !apiKey.startsWith('wtc-')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const { website, json_schema } = await request.json();
    if (!website) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }
    if (!json_schema) {
      return NextResponse.json(
        { error: 'JSON schema is required' },
        { status: 400 }
      );
    }
    // Use apikey for Wetrocloud Service
    const wetrocloud = new Wetrocloud({ apiKey });
    const response = await wetrocloud.extract({
      website,
      json_schema,
    });
    // Attempt to locate the `json` key in different possible nesting levels.
    const jsonPayload =
      (response as any)?.json || (response as any)?.data?.json || (response as any)?.response?.data?.json;
    if (!jsonPayload) {
      return NextResponse.json(
        { error: 'No "json" field found in extraction response' },
        { status: 500 },
      );
    }
    return NextResponse.json({ data: jsonPayload });
  } catch (error) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract structured data' },
      { status: 500 }
    );
  }
}