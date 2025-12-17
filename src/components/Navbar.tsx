"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      let currentSection = sections[0];
      const offset = 140;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
      const hash = currentSection === 'home' ? '#home' : `#${currentSection}`;
      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-6"
      )}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <div className="flex items-center gap-1 glass-strong rounded-full shadow-xl shadow-black/10" style={{ padding: "16px 32px" }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-semibold rounded-full transition-all duration-300"
                )}
                style={{ 
                  padding: "10px 24px",
                  color: activeSection === item.href.slice(1) ? 'var(--foreground)' : 'var(--muted)'
                }}
                onClick={item.href === "#home"
                  ? (e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      window.history.pushState(null, '', '/#home');
                    }
                  : undefined}
              >
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'var(--accent)',
                      opacity: 0.1,
                      border: '1px solid var(--accent)'
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>
          <div className="w-14 h-14"></div>
        </div>
      </nav>
    </header>
  );
}