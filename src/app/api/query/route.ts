import Wetrocloud from "wetro-sdk";
import { NextResponse, NextRequest } from 'next/server';

export const maxDuration = 60; // This function can run for a maximum of 5 seconds

export async function POST(request: NextRequest) {
  // Get API key from cookie
  const apiKey = request.cookies.get('wetro-api-key')?.value;
  if (!apiKey || !apiKey.startsWith('wtc-')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    // Initialize the Wetrocloud client
    const client = new Wetrocloud({
      apiKey: apiKey,
    });

    const { collection_id, request_query } = await request.json();

    if (!collection_id || !request_query) {
      return NextResponse.json(
        { success: false, error: 'Missing collection_id or request_query' },
        { status: 400 }
      );
    }

    // Query the collection
    const response = await client.queryCollection({
      collection_id,
      request_query,
    });

    // Type assertion for the response
    const responseData = response as Record<string, any>;
    const responseText = responseData.response || responseData.message || 'No response from the model';
    
    // Create metadata without the response and message fields
    const { response: _, message: __, ...metadata } = responseData;

    return NextResponse.json({
      success: true,
      collection_id,
      response: responseText,
      metadata
    });
  } catch (error) {
    console.error('Error querying collection:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process query' 
      },
      { status: 500 }
    );
  }
}