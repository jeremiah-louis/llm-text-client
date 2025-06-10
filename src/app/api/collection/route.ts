import { NextResponse } from 'next/server';
import Wetrocloud from "wetro-sdk";

export const maxDuration = 60;

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: process.env.WETRO_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const { collection_id } = await request.json();

    if (!collection_id) {
      return NextResponse.json(
        { error: 'Collection ID is required' },
        { status: 400 }
      );
    }

    const response = await client.createCollection({
      collection_id,
    });

    return NextResponse.json({
      success: true,
      collection_id,
      ...response
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create collection' 
      },
      { status: 500 }
    );
  }
}
