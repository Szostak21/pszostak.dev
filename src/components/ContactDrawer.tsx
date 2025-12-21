"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { useRouter } from "next/router";
import { X, Calendar, Mail, Copy, Check, ChevronLeft, Clock, Globe } from "lucide-react";
import { siteConfig, socials, Social } from "@/data/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Step = "menu" | "booking";

export function ContactDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("menu");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenChange = (val: boolean) => {
    onOpenChange(val);
    if (!val) setTimeout(() => setStep("menu"), 300);
  };

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} shouldScaleBackground={false}>
      <Drawer.Portal>
        {/* Overlay z blurem */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300" />
        
        <Drawer.Content
          className={cn(
            "fixed z-50 outline-none flex flex-col overflow-hidden shadow-2xl transition-all duration-300 border",
            // --- Mobile ---
            "bottom-0 inset-x-0 rounded-t-[32px] rounded-b-none h-fit max-h-[96vh] border-t pb-[env(safe-area-inset-bottom)]",
            // --- Desktop ---
            "sm:bottom-0 sm:mx-auto sm:max-w-lg sm:border-x"
          )}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--card-border)'
          }}
        >
          {/* Handle */}
          <div className="mx-auto w-10 h-1 flex-shrink-0 rounded-full my-4" style={{ backgroundColor: 'var(--card-border)' }} />

          <div className="px-6 sm:px-10 pb-8 pt-2 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              
              {/* KROK 1: MENU GŁÓWNE */}
              {step === "menu" && (
                <motion.div
                  key="menu"
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -15, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <Drawer.Title className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Get in touch</Drawer.Title>
                      <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Let&apos;s build something great together.</p>
                    </div>
                    <button onClick={() => onOpenChange(false)} className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'var(--card)', opacity: 0.8 }}>
                      <X size={18} style={{ color: 'var(--muted)' }} />
                    </button>
                  </div>

                  {/* Grid 2-kolumnowy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {/* Przycisk Kalendarza */}
                    <button
                      onClick={() => {
                        // Close drawer then navigate to booking page
                        onOpenChange(false);
                        router.push('/book-call');
                      }}
                      className="flex flex-col gap-4 p-5 rounded-2xl border transition-all group text-left"
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--card-border)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--card)', opacity: 0.8 }}>
                        <Calendar size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Book a call</h4>
                        <p className="text-[11px] uppercase tracking-widest font-bold" style={{ color: 'var(--muted)' }}>30 min call</p>
                      </div>
                    </button>

                    {/* Przycisk Email - otwiera natywnie klienta poczty */}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex flex-col gap-4 p-5 rounded-2xl border transition-all group text-left"
                      style={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--card-border)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--card)', opacity: 0.8 }}>
                        <Mail size={24} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Email me</h4>
                        <p className="text-[11px] uppercase tracking-widest font-bold" style={{ color: 'var(--muted)' }}>Open Gmail</p>
                      </div>
                    </a>
                  </div>

                  {/* Stopka z kopiowaniem */}
                  <Footer copyEmail={copyEmail} copied={copied} socials={socials} />
                </motion.div>
              )}

              {/* KROK 2: KALENDARZ */}
              {step === "booking" && (
                <motion.div
                  key="booking"
                  initial={{ x: 15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 15, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <header className="flex items-center gap-4 mb-8">
                    <button onClick={() => setStep("menu")} className="p-2 -ml-2 rounded-full transition-colors" style={{ backgroundColor: 'var(--card)', opacity: 0.8 }}>
                      <ChevronLeft size={20} style={{ color: 'var(--muted)' }} />
                    </button>
                    <Drawer.Title className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Select Date & Time</Drawer.Title>
                  </header>

                  <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="p-5 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--card-border)' }}>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>30 Min Meeting</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs font-medium" style={{ color: 'var(--muted)' }}>
                          <span className="flex items-center gap-1.5"><Clock size={14} /> 30 min</span>
                          <span className="flex items-center gap-1.5"><Globe size={14} /> Warsaw, PL</span>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder siatki kalendarza */}
                    <div className="grid grid-cols-7 gap-1">
                      {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] text-center font-bold py-2" style={{ color: 'var(--muted)' }}>{d}</div>)}
                      {Array.from({ length: 30 }, (_, i) => (
                        <button key={i} className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-colors" style={{ color: 'var(--foreground)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface FooterProps {
  copyEmail: () => void;
  copied: boolean;
  socials: Social[];
}

function Footer({ copyEmail, copied, socials }: FooterProps) {
  return (
    <div className="flex flex-col gap-6 pt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
      <div className="flex items-center justify-between px-1">
        <button onClick={copyEmail} className="flex items-center gap-3 group transition-all">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--card)', opacity: 0.8 }}>
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} style={{ color: 'var(--muted)' }} />}
          </div>
          <span className={cn("text-xs font-semibold tracking-tight transition-colors", copied ? "text-green-500" : "")} style={copied ? {} : { color: 'var(--muted)' }}>
            {copied ? "Address copied!" : "Copy gmail address"}
          </span>
        </button>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="transition-all transform hover:scale-110" style={{ color: 'var(--muted)' }}>
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}