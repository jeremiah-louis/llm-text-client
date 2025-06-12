import { NextResponse, NextRequest } from 'next/server';
import Wetrocloud from 'wetro-sdk';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Get API key from cookie
    const apiKey = request.cookies.get('wetro-api-key')?.value;
    if (!apiKey || !apiKey.startsWith('wtc-')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Parse request body
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Initialize the Wetrocloud client
    const client = new Wetrocloud({
      apiKey: apiKey,
    });

    // Call the Wetrocloud API
    const transcript = await client.transcript({
      resource: url,
      resource_type: "youtube"
    });

    // Return the transcript
    return NextResponse.json({ transcript });
    
  } catch (error) {
    console.error('Error in /api/youtube-transcript:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}