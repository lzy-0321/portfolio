import { getRecentGames } from '@/lib/steam';
import { updateCache } from '@/lib/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 验证密钥
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const games = await getRecentGames();
    updateCache(games);

    return NextResponse.json({
      success: true,
      gamesCount: games.length,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error updating games data:', error);
    return NextResponse.json(
      { error: 'Failed to update games data' },
      { status: 500 }
    );
  }
} 