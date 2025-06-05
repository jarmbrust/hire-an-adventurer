import { NextResponse } from 'next/server';
import adventurers from '@/adventurers.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('request:', request);
    const adventurerId = parseInt(params.id, 10);
    const adventurer = adventurers.adventurers.find((adv) => adv.id === adventurerId);

    if (!adventurer) {
      return NextResponse.json(
        { error: `Adventurer with id ${adventurerId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(adventurer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch adventurer' },
      { status: 500 }
    );
  }
}