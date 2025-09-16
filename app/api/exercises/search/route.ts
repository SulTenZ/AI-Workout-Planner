// app/api/exercises/search/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
  }

  const apiUrl = `${process.env.EXERCISEDB_API_URL}/exercises/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`ExerciseDB API responded with status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch from ExerciseDB:', error);
    return NextResponse.json({ message: 'Failed to fetch exercises' }, { status: 500 });
  }
}