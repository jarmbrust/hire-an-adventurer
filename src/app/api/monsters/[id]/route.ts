import { NextRequest, NextResponse } from 'next/server';
import { getMonsterById } from '@/app/actions';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const { id } = await params;
  const monsterId = Number(id);
  try {
    const monster = await getMonsterById(monsterId);
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

