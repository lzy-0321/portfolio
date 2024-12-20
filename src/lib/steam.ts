import { headers } from 'next/headers';
import { updateCache } from './cache';

export interface ProcessedGame {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  playtime: number;
  tags: string[];
}

const getSteamCredentials = () => {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;
  
  if (!apiKey || !steamId) {
    throw new Error('Steam credentials not configured');
  }
  
  return {
    getRecentGamesUrl: () => 
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`,
    getGameDetailsUrl: (appId: number) => 
      `http://store.steampowered.com/api/appdetails?appids=${appId}`,
    getGameHeaderImage: (appId: number) => 
      `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
  };
};

interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
}

export const getRecentGames = async (): Promise<ProcessedGame[]> => {
  if (typeof window !== 'undefined') {
    throw new Error('getRecentGames should only be called from server-side');
  }

  try {
    const steam = getSteamCredentials();
    
    const headersList = headers();
    
    const response = await fetch(steam.getRecentGamesUrl(), {
      cache: 'no-store',
      headers: {
        'User-Agent': headersList.get('user-agent') || 'Server',
      },
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Steam API error:', text);
      throw new Error(`Failed to fetch Steam data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.response || !data.response.games) {
      console.error('No games found in response:', data);
      return [];
    }

    const games: SteamGame[] = data.response.games;

    // 按照最近两周游玩时间排序并获取前10个
    const topGames = games
      .sort((a, b) => b.playtime_2weeks - a.playtime_2weeks)
      .slice(0, 10);

    // 获取每个游戏的详细信息
    const processedGames = await Promise.all(
      topGames.map(async (game) => {
        try {
          const detailsUrl = steam.getGameDetailsUrl(game.appid);
          
          const detailsResponse = await fetch(detailsUrl);
          const details = await detailsResponse.json();
          
          if (!details[game.appid].success) {
            console.error('Failed to fetch details for game:', game.appid);
            return {
              id: game.appid.toString(),
              title: game.name,
              category: "Games",
              image: steam.getGameHeaderImage(game.appid),
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
            image: steam.getGameHeaderImage(game.appid),
            description: gameDetails?.short_description || "No description available",
            playtime: Math.round(game.playtime_2weeks / 60),
            tags: gameDetails?.genres?.map((genre: any) => genre.description) || []
          };
        } catch (error) {
          console.error('Error processing game:', game.appid, error);
          return null;
        }
      })
    );

    const filteredGames = processedGames.filter((game): game is ProcessedGame => game !== null);
    
    // console.log('📦 Steam games fetched:', {
    //   gamesCount: filteredGames.length,
    //   games: filteredGames.map(g => ({
    //     title: g.title,
    //     playtime: g.playtime
    //   }))
    // });
    
    // 更新缓存
    updateCache(filteredGames);
    // console.log('💾 Cache updated with new games data');
    
    return filteredGames;
  } catch (error) {
    console.error('❌ Error fetching Steam data:', error);
    return [];
  }
};