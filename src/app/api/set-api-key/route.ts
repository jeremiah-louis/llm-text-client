import { NextResponse } from 'next/server';

/**
 * POST endpoint to set the API key in an HTTP-only cookie
 * Validates the API key format and sets it securely if valid
 */
export async function POST(request: Request) {
  try {
    // Extract API key from request body
    const { apiKey } = await request.json();

    // Validate API key format - must be string and start with 'wtc-'
    if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('wtc-')) {
      return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 400 });
    }

    // Create success response
    const response = NextResponse.json({ success: true });

    // Set API key in HTTP-only cookie with secure settings
    response.cookies.set('wetro-api-key', apiKey, {
      httpOnly: true,     // Prevents JavaScript access to cookie
      secure: true,       // Only sent over HTTPS
      sameSite: 'strict', // Prevents CSRF attacks
      path: '/',          // Cookie available across all paths
      // Optionally set maxAge for session duration, e.g., 1 day:
      // maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    // Return error for invalid requests (e.g. malformed JSON)
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
} 