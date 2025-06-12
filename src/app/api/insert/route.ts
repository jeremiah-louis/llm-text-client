import Wetrocloud from "wetro-sdk";
import { NextResponse, NextRequest } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  // Get API key from cookie
  const apiKey = request.cookies.get('wetro-api-key')?.value;
  if (!apiKey || !apiKey.startsWith('wtc-')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  // Initialize the Wetrocloud client
  const client = new Wetrocloud({
    apiKey: apiKey,
  });

  try {
    const { collection_id, resource, resource_type } = await request.json();

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
