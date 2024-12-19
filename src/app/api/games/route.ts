import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

async function fetchGames() {
  if (!STEAM_API_KEY || !STEAM_ID) {
    throw new Error('Steam credentials not configured');
  }

  try {
    const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
    console.log('Steam API URL:', steamApiUrl);

    const response = await fetch(steamApiUrl, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Steam API Error Response:', errorText);
      throw new Error(`Steam API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Full Steam API response:', JSON.stringify(data, null, 2));
    
    if (!data.response) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }

    if (!data.response.games || !data.response.games.length) {
      console.log('No recent games found for user');
      return [];
    }

    const games = data.response.games;
    console.log(`Found ${games.length} recent games`);

    // 按照最近两周游玩时间排序并获取前10个
    const topGames = games
      .sort((a: any, b: any) => b.playtime_2weeks - a.playtime_2weeks)
      .slice(0, 10);

    // 获取游戏详情
    const gamesWithDetails = await Promise.all(
      topGames.map(async (game: any) => {
        try {
          const detailsUrl = `https://store.steampowered.com/api/appdetails?appids=${game.appid}`;
          console.log(`Fetching details for game ${game.name} (${game.appid})`);
          
          const detailsResponse = await fetch(detailsUrl, {
            next: { revalidate: 86400 }
          });
          
          if (!detailsResponse.ok) {
            console.error(`Failed to fetch details for game ${game.appid}: ${detailsResponse.status}`);
            return {
              id: game.appid.toString(),
              title: game.name,
              category: "Games",
              image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
              description: "Game information unavailable",
              playtime: Math.round(game.playtime_2weeks / 60),
              tags: []
            };
          }

          const details = await detailsResponse.json();
          
          if (!details[game.appid]?.success) {
            console.log(`No details available for game ${game.appid}`);
            return {
              id: game.appid.toString(),
              title: game.name,
              category: "Games",
              image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
              description: "Game information unavailable",
              playtime: Math.round(game.playtime_2weeks / 60),
              tags: []
            };
          }

          const gameDetails = details[game.appid].data;

          return {
            id: game.appid.toString(),
            title: game.name,
            category: "Games",
            image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
            description: gameDetails?.short_description || "No description available",
            playtime: Math.round(game.playtime_2weeks / 60),
            tags: gameDetails?.genres?.map((genre: any) => genre.description) || []
          };
        } catch (error) {
          console.error(`Error processing game ${game.appid}:`, error);
          return null;
        }
      })
    );

    const filteredGames = gamesWithDetails.filter(Boolean);
    console.log(`Successfully processed ${filteredGames.length} games`);
    return filteredGames;
  } catch (error) {
    console.error('Error in fetchGames:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // 移除请求验证，因为这是服务器端渲染的请求
    const games = await fetchGames();
    
    // 设置缓存头
    const response = NextResponse.json(games);
    response.headers.set('Cache-Control', 'public, s-maxage=604800'); // 7天缓存
    
    return response;
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 