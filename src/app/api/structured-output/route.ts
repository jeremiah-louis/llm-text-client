import { NextResponse } from 'next/server';
import Wetrocloud from "wetro-sdk";

const wetrocloud = new Wetrocloud({ apiKey: process.env.WETRO_API_KEY || "" });

export async function POST(request: Request) {
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

    const response = await wetrocloud.extract({
      website,
      json_schema,
    });

    // Attempt to locate the `json` key in different possible nesting levels.
    const jsonPayload =
      // @ts-ignore – SDK typing is unknown; we defensively access optional chains.
      response?.json || response?.data?.json || response?.response?.data?.json;

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