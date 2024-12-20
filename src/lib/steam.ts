import { updateCache } from './cache';
import { GAME_TITLES } from '@/data/media';

export interface ProcessedGame {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  playtime: number;
  tags: string[];
  link: string;
  rating?: {
    summary: string;
    total: number;
    positive: number;
    percentage: number;
  };
}

const DEFAULT_GAME: ProcessedGame = {
  id: '',
  title: 'Unknown Game',
  category: 'Games',
  image: '/placeholder-game.jpg',
  description: 'No description available',
  playtime: 0,
  tags: [],
  link: '',
};

// 根据好评率返回评价描述
const getReviewSummary = (percentage: number): string => {
  if (percentage >= 95) return "Overwhelmingly Positive";
  if (percentage >= 80) return "Very Positive";
  if (percentage >= 70) return "Mostly Positive";
  if (percentage >= 40) return "Mixed";
  if (percentage >= 20) return "Mostly Negative";
  return "Very Negative";
};

async function fetchPlaytime(steamId: string): Promise<number> {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    const userId = process.env.STEAM_ID;

    if (!apiKey || !userId) {
      console.error('Steam credentials not configured');
      return 0;
    }

    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${userId}&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();
    const games = data.response.games || [];
    const game = games.find((g: any) => g.appid.toString() === steamId);
    
    // Convert minutes to hours and round to 1 decimal place
    return game ? Math.round((game.playtime_forever / 60) * 10) / 10 : 0;
  } catch (error) {
    console.error(`Error fetching playtime for game ${steamId}:`, error);
    return 0;
  }
}

async function fetchGameDetails(steamId: string): Promise<ProcessedGame | null> {
  try {
    // 并行获取所有需要的数据
    const [detailsResponse, reviewsResponse, playtime] = await Promise.all([
      fetch(`https://store.steampowered.com/api/appdetails?appids=${steamId}`),
      fetch(`https://store.steampowered.com/appreviews/${steamId}?json=1&language=all&purchase_type=all&num_per_page=0`),
      fetchPlaytime(steamId)
    ]);

    if (!detailsResponse.ok || !reviewsResponse.ok) {
      throw new Error(`Steam API error: ${detailsResponse.status} ${reviewsResponse.status}`);
    }

    const [detailsData, reviewsData] = await Promise.all([
      detailsResponse.json(),
      reviewsResponse.json()
    ]);

    const gameData = detailsData[steamId].data;
    if (!gameData) {
      return null;
    }

    // 处理评价信息
    const total = reviewsData?.query_summary?.total_reviews || 0;
    const positive = reviewsData?.query_summary?.total_positive || 0;
    const percentage = total > 0 ? Math.round((positive / total) * 100) : 0;

    return {
      id: steamId,
      title: gameData.name,
      category: 'Games',
      image: gameData.header_image,
      description: gameData.short_description,
      playtime,  // 使用获取到的游戏时长
      tags: gameData.genres?.map((genre: any) => genre.description) || [],
      link: `https://store.steampowered.com/app/${steamId}`,
      rating: {
        summary: total > 0 ? getReviewSummary(percentage) : 'No Reviews',
        total,
        positive,
        percentage
      }
    };
  } catch (error) {
    console.error(`Error fetching game ${steamId}:`, error);
    return null;
  }
}

export const getRecentGames = async (): Promise<ProcessedGame[]> => {
  try {
    const processedGames = await Promise.all(
      GAME_TITLES.map(async (game) => {
        const result = await fetchGameDetails(game.steamId);

        if (!result) {
          return {
            ...DEFAULT_GAME,
            id: game.id,
            title: game.title,
          };
        }

        return result;
      })
    );

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateCache(processedGames);
    return processedGames;
  } catch (error) {
    console.error('❌ Error fetching Steam data:', error);
    return GAME_TITLES.map(game => ({
      ...DEFAULT_GAME,
      id: game.id,
      title: game.title,
    }));
  }
};