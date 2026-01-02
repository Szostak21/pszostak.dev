import type { NextApiRequest, NextApiResponse } from "next";
import { getOccupiedSlots } from "@/lib/kv";
import { 
  getAvailableSlotsForDate, 
  parseDateKey, 
  isDateBookable
} from "@/lib/date-utils";

export interface AvailableSlotsResponse {
  date: string;
  slots: string[];
  isWeekend: boolean;
  isBookable: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AvailableSlotsResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      date: "",
      slots: [],
      isWeekend: false,
      isBookable: false,
      error: "Method not allowed",
    });
  }

  const { date } = req.query;

  if (!date || typeof date !== "string") {
    return res.status(400).json({
      date: "",
      slots: [],
      isWeekend: false,
      isBookable: false,
      error: "Date parameter is required (YYYY-MM-DD format)",
    });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      date,
      slots: [],
      isWeekend: false,
      isBookable: false,
      error: "Invalid date format. Use YYYY-MM-DD",
    });
  }

  try {
    const targetDate = parseDateKey(date);
    const dayOfWeek = targetDate.getDay();
    const isSunday = dayOfWeek === 0;

    if (!isDateBookable(targetDate)) {
      return res.status(200).json({
        date,
        slots: [],
        isWeekend: isSunday,
        isBookable: false,
      });
    }

    const staticSlots = getAvailableSlotsForDate(targetDate);
    
    if (staticSlots.length === 0) {
      return res.status(200).json({
        date,
        slots: [],
        isWeekend: isSunday,
        isBookable: !isSunday,
      });
    }

    let occupiedSlots: string[] = [];
    try {
      occupiedSlots = await getOccupiedSlots(date);
    } catch (kvError) {
      console.error("KV error fetching occupied slots:", kvError);
    }

    const availableSlots = staticSlots
      .map((slot) => slot.time)
      .filter((time) => !occupiedSlots.includes(time));

    res.setHeader("Cache-Control", "public, s-maxage=5, stale-while-revalidate=10");

    return res.status(200).json({
      date,
      slots: availableSlots,
      isWeekend: isSunday,
      isBookable: true,
    });
  } catch (error) {
    console.error("Error getting available slots:", error);
    return res.status(500).json({
      date,
      slots: [],
      isWeekend: false,
      isBookable: false,
      error: "Failed to get available slots",
    });
  }
}
