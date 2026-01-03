"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center">
        <Moon size={20} className="text-[var(--muted)]" />
      </div>
    );
  }

  return <ThemeToggleClient />;
}

function ThemeToggleClient() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-14 h-14 rounded-full glass-strong flex items-center justify-center",
        "transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      )}
      aria-label="Toggle theme"
      style={{
        boxShadow: 'var(--shadow-elevation-low)' 
      }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon size={20} className="text-white" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun size={20} className="text-amber-500" />
      </motion.div>
    </button>
  );
}