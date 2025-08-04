import { getTopScores, insertTopScore } from '@/app/actions';
import { NextRequest, NextResponse } from 'next/server';
import { type HighScoreList } from '@/app/lib/definitions';

export async function GET(request: NextRequest, { params }: { params: Promise<{ number: string }> }): Promise<NextResponse> {
  const { number } = await params;
  const topNumberOfScores = Number(number) ?? 10;
  try {
    const topScores = await getTopScores(topNumberOfScores);
    return NextResponse.json({ topScores });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top scores from database' },
      { status: 500 }
    );
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const newScore: HighScoreList = await request.json();
  try {
    await insertTopScore(newScore.score, newScore.initials, newScore.gameVersion);
    return NextResponse.json({ message: 'Score created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error inserting top score:', error);
    return NextResponse.json({ error: 'Failed to insert top score' }, { status: 500 });
  }
};
