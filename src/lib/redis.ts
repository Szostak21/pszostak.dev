import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (redis) return redis;

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is not set");
  }

  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      return Math.min(times * 50, 2000);
    },
    reconnectOnError(err) {
      return err.message.includes("READONLY");
    },
  });

  redis.on("error", (error) => {
    console.error("Redis connection error:", error);
  });

  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  return redis;
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
