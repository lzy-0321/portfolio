import { ProcessedGame } from './steam';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'games-cache.json');
export const CACHE_EXPIRY = 3600000; // 1小时

interface CacheData {
  games: ProcessedGame[];
  lastUpdate: number;
}

// 确保缓存目录存在
const ensureCacheDirectory = () => {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 获取缓存的游戏数据
export const getCachedGames = (): CacheData => {
  try {
    ensureCacheDirectory();
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      const cached = JSON.parse(data);
    //   console.log('📖 Retrieved from cache:', {
    //     gamesCount: cached.games.length,
    //     lastUpdate: new Date(cached.lastUpdate).toLocaleString()
    //   });
      return cached;
    }
  } catch (error) {
    console.error('❌ Error reading cache:', error);
  }
  return { games: [], lastUpdate: 0 };
};

// 更新缓存
export const updateCache = (games: ProcessedGame[]) => {
  try {
    ensureCacheDirectory();
    const cacheData: CacheData = {
      games,
      lastUpdate: Date.now()
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    // console.log('✅ Cache updated successfully');
  } catch (error) {
    console.error('❌ Error updating cache:', error);
  }
};