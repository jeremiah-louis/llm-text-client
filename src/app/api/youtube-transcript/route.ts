import { NextResponse } from 'next/server';
import Wetrocloud from "wetro-sdk";

const wetrocloud = new Wetrocloud({ apiKey: process.env.WETRO_API_KEY || "" });
export const maxDuration = 30;
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const response = await wetrocloud.transcript({
      resource: url,
      resource_type: "youtube"
    });

    return NextResponse.json({ data: response });

  } catch (error) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract structured data' },
      { status: 500 }
    );
  }
}