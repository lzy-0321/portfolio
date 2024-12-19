import { getRecentGames } from '@/lib/steam';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 每小时重新验证一次

export async function GET() {
  try {
    const games = await getRecentGames();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
} 