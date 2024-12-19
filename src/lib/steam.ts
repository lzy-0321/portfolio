import { cache } from 'react';

interface ProcessedGame {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  playtime: number;
  tags: string[];
}

interface CachedGames {
  games: ProcessedGame[];
  timestamp: number;
}

const CACHE_KEY = 'steam-games';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const storage = {
  get: async (key: string) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: async (key: string, value: any) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 忽略存储错误
    }
  }
};

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
}

export const getRecentGames = cache(async (): Promise<ProcessedGame[]> => {
  if (!STEAM_API_KEY || !STEAM_ID) {
    console.error('Steam credentials not found:', { STEAM_API_KEY, STEAM_ID });
    return [];
  }

  try {
    const recentGamesUrl = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
    
    const response = await fetch(recentGamesUrl);
    
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
          const detailsUrl = `http://store.steampowered.com/api/appdetails?appids=${game.appid}`;
          
          const detailsResponse = await fetch(detailsUrl);
          const details = await detailsResponse.json();
          
          if (!details[game.appid].success) {
            console.error('Failed to fetch details for game:', game.appid);
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
          console.error('Error processing game:', game.appid, error);
          return null;
        }
      })
    );

    return processedGames.filter((game): game is ProcessedGame => game !== null);
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return [];
  }
});