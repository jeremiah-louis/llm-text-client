import Wetrocloud from "wetro-sdk";
import { NextResponse } from 'next/server';

// Initialize the Wetrocloud client
const client = new Wetrocloud({
  apiKey: process.env.WETRO_API_KEY || "",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { collection_id, resource, resource_type } = await req.json();

    if (!collection_id || !resource || !resource_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await client.insertResource({
      collection_id,
      resource,
      type: resource_type,
    });

    return NextResponse.json({
      success: true,
      collection_id,
      resource_type,
      ...response
    });
  } catch (error) {
    console.error("Error inserting resource:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to insert resource' 
      },
      { status: 500 }
    );
  }
}
