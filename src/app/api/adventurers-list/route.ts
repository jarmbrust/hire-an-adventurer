import { NextResponse } from 'next/server';
import { getAllAdventurers } from '@/app/actions';

export async function GET() {
  try {
    if(!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not defined' },
        { status: 500 }
      );
    }

    const adventurers = await getAllAdventurers();

    if (!adventurers.length) {
      return NextResponse.json(
        { message: 'No adventurers found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ adventurers });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adventurers from database' },
      { status: 500 }
    );
  }
}
