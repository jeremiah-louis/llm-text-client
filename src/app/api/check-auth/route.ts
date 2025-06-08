import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = request.cookies.get('wetro-api-key')?.value;
  const isAuthenticated = Boolean(apiKey && apiKey.startsWith('wtc-'));
  return NextResponse.json({ isAuthenticated });
}