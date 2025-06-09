import { NextResponse } from 'next/server';
import axios from 'axios';
import Wetrocloud from "wetro-sdk";

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: process.env.WETRO_API_KEY || ""
});

export async function POST(request: Request) {
  try {
    const { link } = await request.json();

    if (!link) {
      return NextResponse.json(
        { error: 'Link is required' },
        { status: 400 }
      );
    }

    const { response } = await client.markDownConverter({
      resource: link,
      resource_type: 'web'
    });

    if (!response) {
      return NextResponse.json(
        { error: 'No content received from server' },
        { status: 500 }
      );
    }

    return NextResponse.json({ markdown: response });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: 'Failed to generate markdown' },
      { status: 500 }
    );
  }
} 