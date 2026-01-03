"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // NAPRAWA BŁĘDU: "Calling setState synchronously within an effect"
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  // Konfiguracja kolorów tła i kropek
  const bgColor = isDark ? "#0a0a0f" : "#ffffff";
  const dotColor = isDark ? "#ffffff" : "#000000";
  
  // Kolor latarki (glow pod myszką)
  const glowColor = isDark 
    ? "radial-gradient(circle at center, rgba(124, 58, 237, 0.15), transparent 50%)" 
    : "radial-gradient(circle at center, rgba(0, 0, 0, 0.03), transparent 40%)";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 h-full w-full transition-colors duration-500 ease-in-out pointer-events-none"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {/* ==================================================================================
         WARSTWA 0: MIX TRZECH KOLORÓW (AURORA)
         Używamy 3 osobnych radial-gradient oddzielonych przecinkami.
         ================================================================================== */}
      
      {/* Gradient dla LIGHT MODE (Pastelowy mix: Fiolet, Róż, Błękit) */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isDark ? 0 : 1, // Ukryj w nocy
          background: `
            radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.15), transparent 50%), 
            radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.15), transparent 50%), 
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15), transparent 50%)
          `
          /* 1. Góra-Lewo: Fiolet
             2. Góra-Prawo: Róż
             3. Dół-Lewo: Błękit
          */
        }}
      />

      {/* Gradient dla DARK MODE (Głęboki kosmos: Ciemny Fiolet, Indigo, Granat) */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isDark ? 1 : 0, // Pokaż w nocy
          background: `
            radial-gradient(circle at 0% 0%, rgba(76, 29, 149, 0.20), transparent 60%), 
            radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.15), transparent 50%), 
            radial-gradient(circle at 50% 100%, rgba(79, 70, 229, 0.15), transparent 60%)
          `
          /* 1. Góra-Lewo: Bardzo ciemny fiolet
             2. Góra-Prawo: Żywy fiolet (akcent)
             3. Dół-Środek: Indigo (poświata od dołu)
          */
        }}
      />
      {/* ================================================================================== */}


      {/* WARSTWA 1: BAZOWA SIATKA */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: isDark ? 0.05 : 0.08,
        }}
      />

      {/* WARSTWA 2: KOLOROWY GLOW (Latarka pod myszką) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: glowColor,
          maskImage: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
          WebkitMaskImage: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
        }}
      />

      {/* WARSTWA 3: INTERAKTYWNE KROPKI */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: isDark ? 0.4 : 0.3,
          maskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
          WebkitMaskImage: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), black, transparent)",
        }}
      />

      {/* WARSTWA 4: WINIETA */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
           background: isDark 
            ? 'radial-gradient(circle at center, transparent 40%, #0a0a0f 100%)' 
            : 'radial-gradient(circle at center, transparent 40%, #ffffff 100%)',
           opacity: 0.6
        }}
      />
    </div>
  );
}