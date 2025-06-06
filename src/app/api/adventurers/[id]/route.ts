import { NextResponse } from 'next/server';
import { getAdventurerById } from '@/app/actions';

export async function GET({ params }: { params: { id: number } }) {
  try {

    const adventurer = await getAdventurerById(params?.id);

    if (!adventurer.length) {
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
}
