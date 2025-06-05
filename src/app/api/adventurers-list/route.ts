import { NextResponse } from 'next/server';
import { adventurers } from '@/adventurers.json';

export async function GET() {
  try {
    return NextResponse.json({ adventurers });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch adventurers' },
      { status: 500 }
    );
  }
}
