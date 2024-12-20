import { ProcessedGame } from './steam';
import { ProcessedMovie } from './tmdb';
import { ProcessedBook } from './books';
import fs from 'fs';
import path from 'path';

const GAMES_CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'cache','games-cache.json');
const MOVIES_CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'cache', 'movies-cache.json');
const BOOKS_CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'cache', 'books-cache.json');
export const CACHE_EXPIRY = 3600000; // 1小时

interface CacheData<T> {
  data: T[];
  lastUpdate: number;
}

// 确保缓存目录存在
const ensureCacheDirectory = () => {
  const dir = path.dirname(GAMES_CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 获取缓存的游戏数据
export const getCachedGames = (): CacheData<ProcessedGame> => {
  try {
    ensureCacheDirectory();
    if (fs.existsSync(GAMES_CACHE_FILE)) {
      const data = fs.readFileSync(GAMES_CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Error reading games cache:', error);
  }
  return { data: [], lastUpdate: 0 };
};

// 获取缓存的电影数据
export const getCachedMovies = (): CacheData<ProcessedMovie> => {
  try {
    ensureCacheDirectory();
    if (fs.existsSync(MOVIES_CACHE_FILE)) {
      const data = fs.readFileSync(MOVIES_CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Error reading movies cache:', error);
  }
  return { data: [], lastUpdate: 0 };
};

// 获取缓存的图书数据
export const getCachedBooks = (): CacheData<ProcessedBook> => {
  try {
    ensureCacheDirectory();
    if (fs.existsSync(BOOKS_CACHE_FILE)) {
      const data = fs.readFileSync(BOOKS_CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Error reading books cache:', error);
  }
  return { data: [], lastUpdate: 0 };
};

// 更新游戏缓存
export const updateCache = (games: ProcessedGame[]) => {
  try {
    ensureCacheDirectory();
    const cacheData: CacheData<ProcessedGame> = {
      data: games,
      lastUpdate: Date.now()
    };
    fs.writeFileSync(GAMES_CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('❌ Error updating games cache:', error);
  }
};

// 更新电影缓存
export const updateMoviesCache = (movies: ProcessedMovie[]) => {
  try {
    ensureCacheDirectory();
    const cacheData: CacheData<ProcessedMovie> = {
      data: movies,
      lastUpdate: Date.now()
    };
    fs.writeFileSync(MOVIES_CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('❌ Error updating movies cache:', error);
  }
};

// 更新图书缓存
export const updateBooksCache = (books: ProcessedBook[]) => {
  try {
    ensureCacheDirectory();
    const cacheData: CacheData<ProcessedBook> = {
      data: books,
      lastUpdate: Date.now()
    };
    fs.writeFileSync(BOOKS_CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('❌ Error updating books cache:', error);
  }
};