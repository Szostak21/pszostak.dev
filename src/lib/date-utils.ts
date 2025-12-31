import { 
  weeklySchedule, 
  TIMEZONE, 
  BOOKING_BUFFER_MINUTES,
  MAX_BOOKING_DAYS_AHEAD,
  MIN_BOOKING_DAYS_AHEAD,
  type TimeSlot 
} from "@/config/availability";

export function getNowInTimezone(): Date {
  const now = new Date();
  const warsawTime = now.toLocaleString("en-US", { timeZone: TIMEZONE });
  return new Date(warsawTime);
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isDateBookable(date: Date): boolean {
  const now = getNowInTimezone();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffDays >= MIN_BOOKING_DAYS_AHEAD && diffDays <= MAX_BOOKING_DAYS_AHEAD;
}

export function getAvailableSlotsForDate(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const dayConfig = weeklySchedule[dayOfWeek];
  
  if (!dayConfig || !dayConfig.enabled) return [];
  if (!isDateBookable(date)) return [];
  
  const now = getNowInTimezone();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const isToday = today.getTime() === targetDate.getTime();
  
  if (!isToday) return dayConfig.slots;
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const cutoffMinutes = currentMinutes + BOOKING_BUFFER_MINUTES;
  
  return dayConfig.slots.filter((slot) => {
    const [hours, minutes] = slot.time.split(":").map(Number);
    const slotMinutes = hours * 60 + minutes;
    return slotMinutes > cutoffMinutes;
  });
}

export function formatTime12h(time: string): string {
  const [hoursStr, mins] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const suffix = hours >= 12 ? "PM" : "AM";
  const h12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${h12}:${mins} ${suffix}`;
}

export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TIMEZONE,
  });
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { 
    weekday: "long",
    timeZone: TIMEZONE 
  });
}

export function isSlotInPast(date: Date, time: string): boolean {
  const now = getNowInTimezone();
  const [hours, minutes] = time.split(":").map(Number);
  
  const slotDateTime = new Date(date);
  slotDateTime.setHours(hours, minutes, 0, 0);
  
  const bufferMs = BOOKING_BUFFER_MINUTES * 60 * 1000;
  return slotDateTime.getTime() < now.getTime() + bufferMs;
}
