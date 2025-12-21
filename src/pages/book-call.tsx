"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, Globe, Video, CheckSquare, 
  ChevronLeft, ChevronRight, User, Loader2
} from "lucide-react";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";

export default function BookCall() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("24");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const formatDateString = () => {
    if (!selectedDate) return "";
    return `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`;
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
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: formatDateString(),
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book");
      }

      toast.success("Booking request sent!", {
        description: "Check your email for confirmation details.",
      });

      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setName("");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", 
    "13:00", "13:30", "14:00", "14:30", "15:00"
  ];

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
      <Head>
        <title>Book a Call | {siteConfig.name}</title>
      </Head>

      <main className="min-h-screen pb-16 px-4 bg-[#030303]" style={{ paddingTop: '120px' }}>
        <div className="max-w-6xl mx-auto">
          
          {/* Return Home Link removed - intentional for streamlined header */}

          {/* Header Section - White Glow Style */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Let&apos;s bring your <span className="gradient-text">ideas</span> to life
            </h1>
            <p className="text-xs sm:text-sm text-white/30 max-w-none sm:max-w-2xl mx-auto font-medium tracking-wide">
              Select a date and time below to schedule our call.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* 1. LEFT COLUMN: Session Details */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:border-r border-white/5 bg-white/[0.01]">
                <div className="flex flex-col gap-8 lg:gap-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                       <User size={14} className="text-white/30" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white tracking-tight uppercase leading-tight">
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
              <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                    {monthNames[currentMonth]} <span className="text-white/20">{currentYear}</span>
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-2 text-white/20 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={18}/>
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-2 text-white/20 hover:text-white transition-colors"
                    >
                      <ChevronRight size={18}/>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={`${day}-${idx}`} className="text-[9px] font-bold text-white/10 pb-4 sm:pb-6 tracking-widest">{day}</div>
                  ))}
                  {/* Empty cells for days before the 1st */}
                  {[...Array(getFirstDayOfMonth(currentMonth, currentYear))].map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => i + 1).map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-xl sm:rounded-2xl text-xs font-semibold transition-all outline-none",
                        selectedDate === day 
                          ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-105" 
                          : "text-white/40 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. RIGHT COLUMN: Time Slots */}
              <div className="lg:col-span-4 p-6 sm:p-8 bg-white/[0.01]">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Available Slots</h3>
                  <div className="flex p-0.5 bg-white/5 rounded-lg border border-white/10">
                    <button onClick={() => setTimeFormat("24")} className={cn("px-2 py-0.5 text-[8px] font-bold rounded", timeFormat === "24" ? "bg-white/10 text-white" : "text-white/20")}>24H</button>
                    <button onClick={() => setTimeFormat("12")} className={cn("px-2 py-0.5 text-[8px] font-bold rounded", timeFormat === "12" ? "bg-white/10 text-white" : "text-white/20")}>12H</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5 max-h-[280px] lg:max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                  {timeSlots.map(time => {
                    // Convert to 12h format if needed
                    let displayTime = time;
                    if (timeFormat === "12") {
                      const [hours, mins] = time.split(":");
                      const h = parseInt(hours);
                      const suffix = h >= 12 ? "PM" : "AM";
                      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                      displayTime = `${h12}:${mins} ${suffix}`;
                    }
                    return (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border transition-all text-xs font-bold outline-none",
                          selectedTime === time 
                            ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                            : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                        )}
                      >
                        {displayTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. BOTTOM SECTION: Form */}
            <div className="p-6 sm:p-8 lg:p-12 border-t border-white/5 bg-white/[0.01]">
              <div className="max-w-2xl space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith" 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-xs outline-none focus:border-white/20 transition-all placeholder:text-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.smith@example.com" 
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-xs outline-none focus:border-white/20 transition-all placeholder:text-white/10" 
                    />
                  </div>
                </div>
                <button 
                  onClick={handleBooking}
                  disabled={isLoading}
                  className={cn(
                    "w-full sm:w-fit px-10 sm:px-14 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-widest transition-all transform active:scale-[0.98]",
                    isLoading 
                      ? "bg-white/50 text-black/50 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  )}
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
        body { background-color: #030303; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
      `}</style>
    </>
  );
}

function DetailItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-4 text-[11px] font-semibold text-white/30">
      <span className="text-white/10 shrink-0">{icon}</span>
      <span className="tracking-tight">{text}</span>
    </div>
  );
}