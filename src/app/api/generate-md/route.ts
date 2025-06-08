import { NextResponse } from 'next/server';
import Wetrocloud from 'wetro-sdk';

const client = new Wetrocloud({ apiKey: process.env.WETRO_API_KEY || "" });

export async function POST(request: Request) {
  try {
    const { link } = await request.json();

    if (!link) {
      return NextResponse.json(
        { error: 'Link is required' },
        { status: 400 }
      );
    }

    const response = await client.markDownConverter({
      resource: link,
      resource_type: 'web'
    });

    if (!response || !response.success) {
      return NextResponse.json(
        { error: 'Failed to generate markdown' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: response.success,
      tokens: response.tokens,
      markdown: response.response
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate markdown' },
      { status: 500 }
    );
  }
}