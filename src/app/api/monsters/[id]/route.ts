import { NextResponse } from 'next/server';
import { getMonsterById } from '@/app/actions';

export async function GET({ params }: { params: { id: number } }) {
  try {
    const monster = await getMonsterById(params?.id);
    if (!monster) {
      return NextResponse.json(
        { message: 'Monster not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ monster });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monster from database' },
      { status: 500 }
    );
  }
};

