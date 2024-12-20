export function rateLimit({ 
  interval,
  uniqueTokenPerInterval = 500 
}: {
  interval: number;
  uniqueTokenPerInterval?: number;
}) {
  const tokens = new Map();
  
  return {
    check: async (limit: number, token: string) => {
      const now = Date.now();
      const tokenCount = tokens.get(token) || [0];
      const [count, timestamp = now] = tokenCount;
      
      if (now - timestamp > interval) {
        tokens.set(token, [1, now]);
        return;
      }
      
      if (count >= limit) {
        throw new Error('Rate limit exceeded');
      }
      
      tokens.set(token, [count + 1, timestamp]);
      return;
    }
  };
} 