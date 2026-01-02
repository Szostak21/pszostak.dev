"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { 
  Clock, Globe, Video, CheckSquare, 
  ChevronLeft, ChevronRight, User, Loader2, AlertCircle, CalendarX
} from "lucide-react";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import { MAX_BOOKING_DAYS_AHEAD } from "@/config/availability";
import { formatTime12h, formatDateKey, getNowInTimezone } from "@/lib/date-utils";
import type { AvailableSlotsResponse } from "@/pages/api/slots";

export default function BookCall() {
  // Mounted state to prevent hydration errors
  const [mounted, setMounted] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("24");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  
  // Available slots for selected date
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  
  // Calendar state - initialized after mount to prevent hydration mismatch
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  // Initialize calendar to current month after mount
  useEffect(() => {
    const now = getNowInTimezone();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setMounted(true);
  }, []);

  // Fetch available slots when date changes
  const fetchAvailableSlots = useCallback(async (date: Date) => {
    setIsFetchingSlots(true);
    setSlotsError(null);
    setAvailableSlots([]);
    
    const dateKey = formatDateKey(date);
    
    try {
      const response = await fetch(`/api/slots?date=${dateKey}`);
      const data: AvailableSlotsResponse = await response.json();
      
      if (data.error) {
        setSlotsError(data.error);
        return;
      }
      
      setIsWeekend(data.isWeekend);
      setAvailableSlots(data.slots);
      
      // If previously selected time is no longer available, clear it
      if (selectedTime && !data.slots.includes(selectedTime)) {
        setSelectedTime(null);
      }
    } catch (error) {
      setSlotsError("Failed to load available times. Please try again.");
      console.error("Error fetching slots:", error);
    } finally {
      setIsFetchingSlots(false);
    }
  }, [selectedTime]);

  // Fetch slots when selected date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    } else {
      setAvailableSlots([]);
      setSlotsError(null);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const formatDateString = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if a day is selectable (not in the past, not too far in future)
  const isDaySelectable = (day: number): boolean => {
    if (!mounted) return false;
    
    const now = getNowInTimezone();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(currentYear, currentMonth, day);
    const diffDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= MAX_BOOKING_DAYS_AHEAD;
  };

  // Check if a day is Sunday (the only day off)
  const isDaySunday = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0; // Only Sunday is off
  };

  const handleBooking = async () => {
    // Validation
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const dateKey = formatDateKey(selectedDate);
      
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: dateKey,
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle slot taken scenario
        if (data.slotTaken) {
          toast.error("Slot no longer available", {
            description: "This time was just booked. Refreshing available slots...",
          });
          // Refresh available slots
          await fetchAvailableSlots(selectedDate);
          setSelectedTime(null);
          return;
        }
        throw new Error(data.error || "Failed to book");
      }

      toast.success("Booking confirmed!", {
        description: `Your call is scheduled for ${formatDateString()} at ${selectedTime}`,
      });

      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setName("");
      setEmail("");
      setAvailableSlots([]);
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Book a Call | {siteConfig.name}</title>
        </Head>
        <main className="min-h-screen pb-16 px-4 flex items-center justify-center" style={{ paddingTop: '120px', backgroundColor: 'var(--background)' }}>
          <div className="flex items-center gap-3" style={{ color: 'var(--muted)' }}>
            <Loader2 className="animate-spin" size={20} />
            <span className="text-sm">Loading calendar...</span>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'toast-theme',
        }}
      />
      <Head>
        <title>Book a Call | {siteConfig.name}</title>
      </Head>

      <main className="min-h-screen pb-16 px-4" style={{ paddingTop: '120px', backgroundColor: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto">
          
          {/* Return Home Link removed - intentional for streamlined header */}

          {/* Header Section - White Glow Style */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
<h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
              Let&apos;s bring your <span className="gradient-text">ideas</span> to life
            </h1>
            <p className="text-xs sm:text-sm max-w-none sm:max-w-2xl mx-auto font-medium tracking-wide" style={{ color: 'var(--muted)' }}>
              Select a date and time below to schedule our call.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl border rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl glass-strong"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* 1. LEFT COLUMN: Session Details */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:border-r" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card)' }}>
                <div className="flex flex-col gap-8 lg:gap-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--card-border)', opacity: 0.8 }}>
                       <User size={14} style={{ color: 'var(--muted)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold tracking-tight uppercase leading-tight" style={{ color: 'var(--foreground)' }}>
                        Paweł Szostak
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 sm:space-y-6">
                    <DetailItem icon={<CheckSquare size={16}/>} text="Confirmation required" />
                    <DetailItem icon={<Clock size={16}/>} text="30 min session" />
                    <DetailItem icon={<Video size={16}/>} text="Google Meet" />
                    <DetailItem icon={<Globe size={16}/>} text="Warsaw, Poland" />
                  </div>
                </div>
              </div>

              {/* 2. CENTER COLUMN: Calendar Grid */}
              <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--card-border)' }}>
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>
                    {monthNames[currentMonth]} <span style={{ color: 'var(--muted)' }}>{currentYear}</span>
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 transition-colors"
                      style={{ color: 'var(--muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                    >
                      <ChevronLeft size={18}/>
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 transition-colors"
                      style={{ color: 'var(--muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                    >
                      <ChevronRight size={18}/>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={`${day}-${idx}`} className="text-[9px] font-bold pb-4 sm:pb-6 tracking-widest" style={{ color: 'var(--muted)', opacity: 0.5 }}>{day}</div>
                  ))}
                  {/* Empty cells for days before the 1st */}
                  {[...Array(getFirstDayOfMonth(currentMonth, currentYear))].map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => i + 1).map(day => {
                    const isSelected = selectedDate && 
                      selectedDate.getDate() === day && 
                      selectedDate.getMonth() === currentMonth && 
                      selectedDate.getFullYear() === currentYear;
                    const isSelectable = isDaySelectable(day);
                    const isSunday = isDaySunday(day);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => isSelectable && handleDateSelect(day)}
                        disabled={!isSelectable}
                        className={cn(
                          "aspect-square flex items-center justify-center rounded-xl sm:rounded-2xl text-xs font-semibold transition-all outline-none",
                          isSelected && "scale-105 shadow-lg"
                        )}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                          color: isSelected 
                            ? 'white' 
                            : !isSelectable 
                              ? 'var(--muted)' 
                              : isSunday 
                                ? 'var(--muted)' 
                                : 'var(--foreground)',
                          opacity: !isSelectable ? 0.3 : isSunday ? 0.5 : 1,
                          cursor: isSelectable ? 'pointer' : 'default'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelectable) return;
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--card-border)';
                            e.currentTarget.style.color = 'var(--foreground)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelectable) return;
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = isSunday ? 'var(--muted)' : 'var(--foreground)';
                          }
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. RIGHT COLUMN: Time Slots */}
              <div className="lg:col-span-4 p-6 sm:p-8" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>
                    {selectedDate ? 'Available Slots' : 'Select a Date'}
                  </h3>
                  {selectedDate && availableSlots.length > 0 && (
                    <div className="flex p-0.5 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--card-border)', opacity: 0.8 }}>
                      <button onClick={() => setTimeFormat("24")} className={cn("px-2 py-0.5 text-[8px] font-bold rounded")} style={{ backgroundColor: timeFormat === "24" ? 'var(--accent)' : 'transparent', color: timeFormat === "24" ? 'white' : 'var(--muted)', opacity: timeFormat === "24" ? 0.3 : 1 }}>24H</button>
                      <button onClick={() => setTimeFormat("12")} className={cn("px-2 py-0.5 text-[8px] font-bold rounded")} style={{ backgroundColor: timeFormat === "12" ? 'var(--accent)' : 'transparent', color: timeFormat === "12" ? 'white' : 'var(--muted)', opacity: timeFormat === "12" ? 0.3 : 1 }}>12H</button>
                    </div>
                  )}
                </div>

                {/* Loading state */}
                {isFetchingSlots && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="animate-spin" size={24} style={{ color: 'var(--accent)' }} />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Loading available times...</span>
                  </div>
                )}

                {/* Error state */}
                {slotsError && !isFetchingSlots && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <AlertCircle size={24} style={{ color: 'var(--muted)' }} />
                    <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>{slotsError}</span>
                    <button 
                      onClick={() => selectedDate && fetchAvailableSlots(selectedDate)}
                      className="text-xs px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--card-border)', color: 'var(--foreground)' }}
                    >
                      Try again
                    </button>
                  </div>
                )}

                {/* No date selected state */}
                {!selectedDate && !isFetchingSlots && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <CalendarX size={24} style={{ color: 'var(--muted)', opacity: 0.5 }} />
                    <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                      Select a date from the calendar to see available times
                    </span>
                  </div>
                )}

                {/* Sunday selected state */}
                {selectedDate && isWeekend && !isFetchingSlots && !slotsError && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <CalendarX size={24} style={{ color: 'var(--muted)', opacity: 0.5 }} />
                    <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                      No availability on Sundays.<br />Please select another day (Mon-Sat).
                    </span>
                  </div>
                )}

                {/* No slots available state */}
                {selectedDate && !isWeekend && availableSlots.length === 0 && !isFetchingSlots && !slotsError && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <CalendarX size={24} style={{ color: 'var(--muted)', opacity: 0.5 }} />
                    <span className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                      No available slots for this date.<br />Please try another day.
                    </span>
                  </div>
                )}

                {/* Available slots */}
                {selectedDate && availableSlots.length > 0 && !isFetchingSlots && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5 max-h-[280px] lg:max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                    {availableSlots.map(time => {
                      // Convert to 12h format if needed
                      const displayTime = timeFormat === "12" ? formatTime12h(time) : time;
                      
                      return (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border transition-all text-xs font-bold outline-none shadow-sm"
                          )}
                          style={{
                            backgroundColor: selectedTime === time ? 'var(--accent)' : 'var(--card)',
                            borderColor: selectedTime === time ? 'var(--accent)' : 'var(--card-border)',
                            color: selectedTime === time ? 'white' : 'var(--muted)'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--accent)';
                              e.currentTarget.style.color = 'var(--foreground)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--card-border)';
                              e.currentTarget.style.color = 'var(--muted)';
                            }
                          }}
                        >
                          {displayTime}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 4. BOTTOM SECTION: Form */}
            <div className="p-6 sm:p-8 lg:p-12 border-t" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card)' }}>
              <div className="max-w-2xl space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] ml-1" style={{ color: 'var(--muted)' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith" 
                      className="w-full border rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-xs outline-none transition-all" 
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--foreground)'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] ml-1" style={{ color: 'var(--muted)' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.smith@example.com" 
                      className="w-full border rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-xs outline-none transition-all" 
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--foreground)'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                    />
                  </div>
                </div>
                <button 
                  onClick={handleBooking}
                  disabled={isLoading}
                  className={cn(
                    "w-full sm:w-fit px-10 sm:px-14 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-widest transition-all transform active:scale-[0.98] shadow-lg"
                  )}
                  style={{
                    backgroundColor: isLoading ? 'var(--muted)' : 'var(--accent)',
                    color: 'white',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 10px; }
        .toast-theme { background: var(--card) !important; border: 1px solid var(--card-border) !important; color: var(--foreground) !important; }
      `}</style>
    </>
  );
}

function DetailItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-4 text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>
      <span className="shrink-0" style={{ color: 'var(--muted)', opacity: 0.5 }}>{icon}</span>
      <span className="tracking-tight">{text}</span>
    </div>
  );
}