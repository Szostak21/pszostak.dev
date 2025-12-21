"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { X, Calendar, Mail, Copy, Check, ChevronLeft, Clock, Globe } from "lucide-react";
import { siteConfig, socials, Social } from "@/data/config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Step = "menu" | "booking";

export function ContactDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
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
            "fixed z-50 outline-none flex flex-col overflow-hidden bg-neutral-900 border-white/10 shadow-2xl transition-all duration-300",
            // --- Mobile ---
            "bottom-0 inset-x-0 rounded-t-[32px] rounded-b-none h-fit max-h-[96vh] border-t pb-[env(safe-area-inset-bottom)]",
            // --- Desktop ---
            "sm:bottom-0 sm:mx-auto sm:max-w-lg sm:border-x"
          )}
        >
          {/* Handle */}
          <div className="mx-auto w-10 h-1 flex-shrink-0 rounded-full bg-white/10 my-4" />

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
                      <Drawer.Title className="text-2xl font-bold text-white tracking-tight">Get in touch</Drawer.Title>
                      <p className="text-sm text-white/40 font-medium">Let&apos;s build something great together.</p>
                    </div>
                    <button onClick={() => onOpenChange(false)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                      <X size={18} className="text-white/70" />
                    </button>
                  </div>

                  {/* Grid 2-kolumnowy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {/* Przycisk Kalendarza */}
                    <a
                      href="/book-call"
                      className="flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.07] transition-all group text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Calendar className="text-white/70 group-hover:text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">Book a call</h4>
                        <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Schedule time</p>
                      </div>
                    </a>

                    {/* Przycisk Email - otwiera natywnie klienta poczty */}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.07] transition-all group text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Mail className="text-white/70 group-hover:text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">Email me</h4>
                        <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Open Gmail/Mail</p>
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
                    <button onClick={() => setStep("menu")} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
                      <ChevronLeft size={20} className="text-white/70" />
                    </button>
                    <Drawer.Title className="text-xl font-bold text-white">Select Date & Time</Drawer.Title>
                  </header>

                  <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">30 Min Meeting</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-white/40 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={14} /> 30 min</span>
                          <span className="flex items-center gap-1.5"><Globe size={14} /> Warsaw, PL</span>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder siatki kalendarza */}
                    <div className="grid grid-cols-7 gap-1">
                      {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] text-center font-bold text-white/20 py-2">{d}</div>)}
                      {Array.from({ length: 30 }, (_, i) => (
                        <button key={i} className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium hover:bg-white/10 text-white/80 transition-colors">
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
    <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
      <div className="flex items-center justify-between px-1">
        <button onClick={copyEmail} className="flex items-center gap-3 group transition-all">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-white/30 group-hover:text-white/60" />}
          </div>
          <span className={cn("text-xs font-semibold tracking-tight transition-colors", copied ? "text-green-500" : "text-white/40 group-hover:text-white/70")}>
            {copied ? "Address copied!" : "Copy gmail address"}
          </span>
        </button>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-all transform hover:scale-110">
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}