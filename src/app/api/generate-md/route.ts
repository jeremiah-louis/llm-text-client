import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${process.env.WETRO_API_KEY}`,
  },
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

    const { data } = await api.post('/markdown-converter/', { 
      link, 
      resource_type: 'web' 
    });

    if (!data?.response) {
      return NextResponse.json(
        { error: 'No content received from server' },
        { status: 500 }
      );
    }

    return NextResponse.json({ markdown: data.response });
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