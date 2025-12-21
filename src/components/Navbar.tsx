"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { ContactDrawer } from "./ContactDrawer";
import { Calendar } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", section: "home" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Other", href: "/#other", section: "other" },
];

export default function Navbar() {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine active section based on current page
  const isHomePage = router.pathname === '/';
  const [activeSection, setActiveSection] = useState(isHomePage ? "home" : "");

  useEffect(() => {
    // Only track scroll on home page
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      const sections = navItems.map((item) => item.section);
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
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    // Only handle scroll for in-page sections on home page
    if (item.href.startsWith('/#') && isHomePage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const sectionId = item.section;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    // Home link scrolls to top on home page
    if (item.href === '/' && isHomePage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // When clicking a section link from other pages, navigate to home WITHOUT hash
    if (item.href.startsWith('/#') && !isHomePage) {
      e.preventDefault();
      setMobileMenuOpen(false);
      router.push('/');
      return;
    }
    // For other cases, allow default navigation
    setMobileMenuOpen(false);
  };

  const handleBookCallClick = () => {
    // Open the contact drawer so user can choose between booking or emailing
    setContactOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-6"
        )}
      >
        <nav className="max-w-350 mx-auto px-6 md:px-8 lg:px-12">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <ThemeToggle />
            <div className="flex items-center gap-1 glass-strong rounded-full shadow-xl shadow-black/10 h-14" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "relative text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer flex items-center"
                  )}
                    style={{ 
                      padding: "10px 24px",
                      color: isHomePage && activeSection === item.section ? 'var(--foreground)' : 'var(--muted)'
                    }}
                >
                    {isHomePage && activeSection === item.section && (
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
            {/* Book a Call Button - Desktop */}
            <button
              onClick={handleBookCallClick}
              className={cn(
                "glass-strong rounded-full shadow-xl shadow-black/10 flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:scale-105 h-14",
                contactOpen && "ring-2 ring-(--accent) ring-opacity-50"
              )}
              style={{ 
                paddingLeft: "24px",
                paddingRight: "24px",
                color: 'var(--foreground)'
              }}
            >
              <Calendar size={16} />
              <span>Book a Call</span>
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass-strong rounded-full shadow-xl shadow-black/10 p-4"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span 
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-all duration-300",
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  )}
                  style={{ background: 'var(--foreground)' }}
                />
                <span 
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-all duration-300",
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  )}
                  style={{ background: 'var(--foreground)' }}
                />
                <span 
                  className={cn(
                    "block h-0.5 w-5 rounded-full transition-all duration-300",
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  )}
                  style={{ background: 'var(--foreground)' }}
                />
              </div>
            </button>
            {/* Book a Call Button - Mobile (visible in header) */}
            <button
              onClick={handleBookCallClick}
              className={cn(
                "glass-strong rounded-full shadow-xl shadow-black/10 flex items-center gap-2 text-sm font-semibold transition-all duration-300",
                contactOpen && "ring-2 ring-(--accent) ring-opacity-50"
              )}
              style={{ 
                padding: "14px 16px",
                color: 'var(--foreground)'
              }}
            >
              <Calendar size={16} />
              <span className="sr-only sm:not-sr-only">Book a Call</span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <motion.div
            initial={false}
            animate={{ 
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass-strong rounded-2xl shadow-xl shadow-black/10 mt-4 p-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer text-center"
                    )}
                      style={{ 
                        padding: "12px 24px",
                        color: isHomePage && activeSection === item.section ? 'var(--foreground)' : 'var(--muted)',
                        background: isHomePage && activeSection === item.section ? 'var(--accent)' : 'transparent',
                        opacity: isHomePage && activeSection === item.section ? 1 : 0.8
                      }}
                  >
                    {item.label}
                  </a>
                ))}
                {/* Book a Call in Mobile Menu */}
                <button
                  onClick={handleBookCallClick}
                  className="flex items-center justify-center gap-2 text-sm font-semibold rounded-full transition-all duration-300 mt-2"
                  style={{ 
                    padding: "12px 24px",
                    color: 'var(--foreground)',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <Calendar size={16} />
                  <span>Book a Call</span>
                </button>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>

      <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}