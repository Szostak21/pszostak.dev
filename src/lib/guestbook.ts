import { getRedisClient } from "./redis";

export interface GuestbookEntry {
  id: string;
  message: string;
  userName: string;
  userImage: string;
  userId: string;
  createdAt: string;
}

const GUESTBOOK_KEY = "guestbook:entries";

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const redis = getRedisClient();
  
  try {
    const entries = await redis.lrange(GUESTBOOK_KEY, 0, -1);
    return entries.map((entry) => JSON.parse(entry) as GuestbookEntry);
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return [];
  }
}

export async function addGuestbookEntry(
  entry: Omit<GuestbookEntry, "id" | "createdAt">
): Promise<GuestbookEntry | null> {
  const redis = getRedisClient();
  
  const newEntry: GuestbookEntry = {
    ...entry,
    id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    // Add to the beginning of the list (newest first)
    await redis.lpush(GUESTBOOK_KEY, JSON.stringify(newEntry));
    return newEntry;
  } catch (error) {
    console.error("Error adding guestbook entry:", error);
    return null;
  }
}

export async function deleteGuestbookEntry(
  entryId: string,
  userId: string
): Promise<boolean> {
  const redis = getRedisClient();
  
  try {
    const entries = await redis.lrange(GUESTBOOK_KEY, 0, -1);
    
    for (const entryStr of entries) {
      const entry = JSON.parse(entryStr) as GuestbookEntry;
      if (entry.id === entryId && entry.userId === userId) {
        await redis.lrem(GUESTBOOK_KEY, 1, entryStr);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    return false;
  }
}
