import { NextResponse } from 'next/server';
import { getAdventurerById } from '@/app/actions';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const adventurer = await getAdventurerById(Number(params.id));
    if (!adventurer) {
      return NextResponse.json(
        { message: 'Adventurer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ adventurer });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adventurer from database' },
      { status: 500 }
    );
  }
};

export async function PATCH(request: Request, { params }: { params: { id: string } }) {

  const adventurer = await getAdventurerById(Number(params.id));
  if (!adventurer) {
    return NextResponse.json(
      { message: 'Adventurer not found' },
      { status: 404 }
    );
  }

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
};
