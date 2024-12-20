import axios from 'axios';

const TMDB_API_KEY = '301158b133010f27f1b66882ff95a5ed'; // 请替换为你的 TMDB API 密钥
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface MediaInfo {
  id: string;
  title: string;
  category: "Movies" | "TV Shows";
  image: string;
  description: string;
  rating: string;
  tags: string[];
  year: number;
}

export async function searchMedia(query: string): Promise<MediaInfo | null> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query: encodedQuery
      }
    });

    console.log(response.data);

    const results = response.data.results;
    if (results && results.length > 0) {
      const media = results[0];
      return {
        id: media.id.toString(),
        title: media.title || media.name,
        category: media.media_type === 'movie' ? 'Movies' : 'TV Shows',
        image: `https://image.tmdb.org/t/p/w300${media.poster_path}`,
        description: media.overview,
        rating: media.vote_average.toString(),
        tags: [], // TMDB API 不直接提供标签信息
        year: new Date(media.release_date || media.first_air_date).getFullYear()
      };
    }
  } catch (error) {
    console.error('Error fetching media from TMDB:', error);
  }

  return null;
} 