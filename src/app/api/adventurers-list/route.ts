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

export async function POST() {
  try {
    if(!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not defined' },
        { status: 500 }
      );
    }

    // Handle POST request logic here, if needed
    return NextResponse.json(
      { message: 'POST request received' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to handle POST request' },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  try {
    if(!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not defined' },
        { status: 500 }
      );
    }

    // Handle PATCH request logic here, if needed
    return NextResponse.json(
      { message: 'PATCH request received' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to handle PATCH request' },
      { status: 500 }
    );
  }
}
