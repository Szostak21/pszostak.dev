export interface TimeSlot {
  time: string;
  duration: number;
}

export interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

export type WeeklySchedule = {
  [key: number]: DayAvailability;
};

function generateSlots(ranges: [number, number, number, number][]): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (const [startH, startM, endH, endM] of ranges) {
    let currentH = startH;
    let currentM = startM;
    const endMinutes = endH * 60 + endM;
    
    while (currentH * 60 + currentM < endMinutes) {
      slots.push({
        time: `${String(currentH).padStart(2, "0")}:${String(currentM).padStart(2, "0")}`,
        duration: 30,
      });
      currentM += 30;
      if (currentM >= 60) {
        currentM = 0;
        currentH += 1;
      }
    }
  }
  return slots;
}

const mondaySlots = generateSlots([[10, 0, 12, 0], [15, 0, 20, 0]]);
const tuesdaySlots = generateSlots([[10, 0, 14, 0], [17, 0, 20, 0]]);
const wednesdaySlots = generateSlots([[11, 0, 15, 0], [19, 0, 20, 0]]);
const thursdaySlots = generateSlots([[12, 0, 20, 0]]);
const fridaySlots = generateSlots([[10, 0, 20, 0]]);
const saturdaySlots = generateSlots([[10, 0, 20, 0]]);

export const weeklySchedule: WeeklySchedule = {
  0: { enabled: false, slots: [] },
  1: { enabled: true, slots: mondaySlots },
  2: { enabled: true, slots: tuesdaySlots },
  3: { enabled: true, slots: wednesdaySlots },
  4: { enabled: true, slots: thursdaySlots },
  5: { enabled: true, slots: fridaySlots },
  6: { enabled: true, slots: saturdaySlots },
};

export const TIMEZONE = "Europe/Warsaw";
export const BOOKING_BUFFER_MINUTES = 60;
export const MAX_BOOKING_DAYS_AHEAD = 60;
export const MIN_BOOKING_DAYS_AHEAD = 0;
