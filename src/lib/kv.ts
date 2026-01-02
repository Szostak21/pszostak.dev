import { getRedisClient } from "./redis";

export const KV_KEYS = {
  slot: (date: string, time: string) => `booking:${date}:${time}`,
  lock: (date: string, time: string) => `lock:${date}:${time}`,
  dateIndex: (date: string) => `bookings:${date}`,
} as const;

export interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  bookedAt: string;
  status: "confirmed" | "pending" | "cancelled";
}

export const LOCK_TTL_SECONDS = 10;
export const BOOKING_TTL_SECONDS = 0;

export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const redis = getRedisClient();
  const key = KV_KEYS.slot(date, time);
  const result = await redis.get(key);
  return result === null;
}

export async function getOccupiedSlots(date: string): Promise<string[]> {
  const redis = getRedisClient();
  const indexKey = KV_KEYS.dateIndex(date);
  const result = await redis.smembers(indexKey);
  return result || [];
}

async function acquireLock(date: string, time: string): Promise<boolean> {
  const redis = getRedisClient();
  const lockKey = KV_KEYS.lock(date, time);
  const result = await redis.set(lockKey, "LOCKED", "EX", LOCK_TTL_SECONDS, "NX");
  return result === "OK";
}

async function releaseLock(date: string, time: string): Promise<void> {
  const redis = getRedisClient();
  const lockKey = KV_KEYS.lock(date, time);
  await redis.del(lockKey);
}

export async function reserveSlot(
  date: string,
  time: string,
  name: string,
  email: string
): Promise<BookingData | null> {
  const redis = getRedisClient();
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    
    const lockAcquired = await acquireLock(date, time);
    if (!lockAcquired) {
      await new Promise((resolve) => setTimeout(resolve, 100 * attempt));
      continue;
    }

    try {
      const slotKey = KV_KEYS.slot(date, time);
      const existing = await redis.get(slotKey);
      
      if (existing !== null) return null;

      const booking: BookingData = {
        name,
        email,
        date,
        time,
        bookedAt: new Date().toISOString(),
        status: "confirmed",
      };

      const bookingJson = JSON.stringify(booking);
      
      if (BOOKING_TTL_SECONDS > 0) {
        await redis.set(slotKey, bookingJson, "EX", BOOKING_TTL_SECONDS);
      } else {
        await redis.set(slotKey, bookingJson);
      }

      const indexKey = KV_KEYS.dateIndex(date);
      await redis.sadd(indexKey, time);

      return booking;
    } finally {
      await releaseLock(date, time);
    }
  }

  return null;
}

export async function getBooking(date: string, time: string): Promise<BookingData | null> {
  const redis = getRedisClient();
  const key = KV_KEYS.slot(date, time);
  const result = await redis.get(key);
  
  if (!result) return null;
  
  try {
    return JSON.parse(result) as BookingData;
  } catch {
    return null;
  }
}

export async function cancelBooking(date: string, time: string): Promise<boolean> {
  const redis = getRedisClient();
  const slotKey = KV_KEYS.slot(date, time);
  const indexKey = KV_KEYS.dateIndex(date);
  
  await redis.del(slotKey);
  await redis.srem(indexKey, time);
  
  return true;
}
