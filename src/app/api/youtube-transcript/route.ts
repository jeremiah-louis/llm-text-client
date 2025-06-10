import { NextResponse } from 'next/server';
import Wetrocloud from 'wetro-sdk';

const wetrocloud = new Wetrocloud({ apiKey: process.env.WETRO_API_KEY || '' });

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    // Parse request body
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Call the Wetrocloud API
    const transcript = await wetrocloud.transcript({
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