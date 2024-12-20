import { headers } from 'next/headers';
import { updateMoviesCache } from './cache';
import { MOVIE_TITLES } from '@/data/media';

export interface ProcessedMovie {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year?: string;
  rating?: number;
  link: string;
}

const getTMDBCredentials = () => {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB credentials not configured');
  }

  return {
    searchUrl: (query: string) =>
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
    getImageUrl: (path: string) =>
      `https://image.tmdb.org/t/p/w500${path}`
  };
};

export const getMoviesData = async (): Promise<ProcessedMovie[]> => {
  if (typeof window !== 'undefined') {
    throw new Error('getMoviesData should only be called from server-side');
  }

  try {
    const tmdb = getTMDBCredentials();
    const headersList = headers();

    const processedMovies = await Promise.all(
      MOVIE_TITLES.map(async (title) => {
        try {
          const response = await fetch(tmdb.searchUrl(title), {
            cache: 'no-store',
            headers: {
              'User-Agent': headersList.get('user-agent') || 'Server',
            },
          });

          if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
          }

          const data = await response.json();
          const result = data.results[0]; // 获取第一个匹配结果

          if (!result) {
            console.error('No results found for:', title);
            return null;
          }

          return {
            id: result.id.toString(),
            title: result.name || result.title,
            category: result.media_type === 'tv' ? 'TV Shows' : 'Movies',
            image: tmdb.getImageUrl(result.poster_path),
            description: result.overview,
            tags: [result.media_type === 'tv' ? 'TV Series' : 'Movie'],
            year: new Date(result.first_air_date || result.release_date).getFullYear().toString(),
            rating: result.vote_average,
            link: `https://www.themoviedb.org/${result.media_type}/${result.id}`
          };
        } catch (error) {
          console.error('Error processing title:', title, error);
          return null;
        }
      })
    );

    const filteredMovies = processedMovies.filter((movie): movie is NonNullable<typeof movie> => movie !== null);

    // 更新缓存
    updateMoviesCache(filteredMovies);

    return filteredMovies;
  } catch (error) {
    console.error('❌ Error fetching TMDB data:', error);
    return [];
  }
};
