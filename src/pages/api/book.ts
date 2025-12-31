import type { NextApiRequest, NextApiResponse } from "next";
import { reserveSlot, isSlotAvailable } from "@/lib/kv";
import { parseDateKey, isSlotInPast, formatDateDisplay } from "@/lib/date-utils";
import { sendClientConfirmation, sendOwnerNotification } from "@/lib/mail";

type BookingRequest = {
  name: string;
  email: string;
  date: string;
  time: string;
};

type BookingResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  slotTaken?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, date, time } = req.body as BookingRequest;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(time)) {
    return res.status(400).json({ error: "Invalid time format" });
  }

  const targetDate = parseDateKey(date);
  if (isSlotInPast(targetDate, time)) {
    return res.status(400).json({ error: "Cannot book a slot in the past" });
  }

  try {
    const available = await isSlotAvailable(date, time);
    if (!available) {
      return res.status(409).json({ 
        error: "This time slot has already been booked",
        slotTaken: true 
      });
    }

    const booking = await reserveSlot(date, time, name.trim(), email.trim());
    if (!booking) {
      return res.status(409).json({ 
        error: "This time slot was just booked by someone else. Please select another time.",
        slotTaken: true 
      });
    }

    const displayDate = formatDateDisplay(targetDate);

    // Fire and forget: send emails, but don't block or log unless error
    Promise.all([
      sendOwnerNotification({ name, email, date: displayDate, time })
        .catch(() => {}),
      sendClientConfirmation({ name, email, date: displayDate, time })
        .catch(() => {}),
    ]);

    return res.status(200).json({ success: true, message: "Booking confirmed successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to process booking. Please try again." });
  }
}
