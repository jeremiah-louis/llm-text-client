import { NextResponse, NextRequest } from 'next/server';
import Wetrocloud from 'wetro-sdk';

export async function POST(request: NextRequest) {
  // Get API key from cookie
  const apiKey = request.cookies.get('wetro-api-key')?.value;
  if (!apiKey || !apiKey.startsWith('wtc-')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const { link } = await request.json();
    if (!link) {
      return NextResponse.json(
        { error: 'Link is required' },
        { status: 400 }
      );
    }
    // Use apiKey from cookie
    const client = new Wetrocloud({ apiKey });
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