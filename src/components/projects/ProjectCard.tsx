"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "large" | "standard";
}

export function ProjectCard({ project, index, variant = "standard" }: ProjectCardProps) {
  const isLarge = variant === "large";
  const isMobile = project.deviceType === "mobile";
  const screenshots = project.screenshots || [];
  const projectLabel = project.deviceType === "mobile" ? "Mobile App" : "Desktop App";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group flex flex-col",
        isLarge ? "md:col-span-2" : ""
      )}
    >
      <header className="mb-3 md:mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-mono tracking-wider uppercase text-[var(--muted)]">
            0{index + 1}
          </span>
          <span className="w-8 h-px bg-[var(--card-border)]" />
          <span className="text-sm font-mono tracking-wider uppercase text-[var(--muted)]">
            {projectLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h3 className={cn(
            "font-bold tracking-tight text-[var(--foreground)]",
            isLarge ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"
          )}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all"
                aria-label="View source code"
              >
                <Github size={20} />
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all"
                aria-label="View live demo"
              >
                <ArrowUpRight size={20} />
              </a>
            )}
          </div>
        </div>
      </header>

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "border border-white/5",
          // --- ZMIANA 1: Zmniejszona minimalna wysokość na mobile ---
          isLarge ? "min-h-[450px] md:min-h-150" : "min-h-[380px] md:min-h-120"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 -z-10 bg-linear-to-br",
            project.bgColor || "from-neutral-800 to-neutral-900"
          )} 
        />

        <div className="relative z-20 px-6 pt-6 pb-2 md:px-12 md:pt-10 md:pb-8">
          <p className={cn(
            "text-white/90 leading-relaxed font-medium text-balance max-w-2xl drop-shadow-sm",
            isLarge ? "text-lg md:text-2xl" : "text-base md:text-xl"
          )}>
            {project.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-end">
          {isMobile ? (
            // --- ZMIANA 2: Zmniejszona wysokość kontenera na screeny mobilne na telefonie (h-60 zamiast h-75) ---
            <div className="relative w-full max-w-md h-60 md:h-95">
              {screenshots[1] && (
                <motion.div 
                  className="absolute left-4 md:left-8 -bottom-24 md:-bottom-28 w-[38%] z-10 origin-bottom"
                  whileHover={{ x: -20, rotate: -5 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-9/19 rounded-t-2xl md:rounded-t-3xl border-x-2 md:border-x-4 border-t-2 md:border-t-4 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                    <Image
                      src={screenshots[1]}
                      alt={`${project.title} screen 2`}
                      fill
                      className="object-cover object-top opacity-60"
                      sizes="(max-width: 768px) 100vw, 38vw"
                      priority={index === 1}
                    />
                  </div>
                </motion.div>
              )}
              {screenshots[2] && (
                <motion.div 
                  className="absolute right-4 md:right-8 -bottom-24 md:-bottom-28 w-[38%] z-10 origin-bottom"
                  whileHover={{ x: 20, rotate: 5 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-9/19 rounded-t-2xl md:rounded-t-3xl border-x-2 md:border-x-4 border-t-2 md:border-t-4 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                    <Image
                      src={screenshots[2]}
                      alt={`${project.title} screen 3`}
                      fill
                      className="object-cover object-top opacity-60"
                      sizes="(max-width: 768px) 100vw, 38vw"
                      priority={index === 2}
                    />
                  </div>
                </motion.div>
              )}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -bottom-24 md:-bottom-28 w-[45%] z-20 origin-bottom"
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative aspect-9/19 rounded-t-2xl md:rounded-t-3xl border-x-[4px] md:border-x-[6px] border-t-[4px] md:border-t-[6px] border-neutral-900 bg-neutral-900 overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-3 md:h-5 bg-black rounded-b-lg md:rounded-b-xl z-30" />
                  <Image
                    src={screenshots[0]}
                    alt={`${project.title} main screen`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority={index === 0}
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="w-[92%] md:w-[82%] origin-bottom"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative aspect-16/12 rounded-t-lg md:rounded-t-xl bg-neutral-900 border-x border-t border-white/10 overflow-hidden shadow-2xl flex flex-col">
                <div className="h-5 md:h-7 bg-neutral-800/90 flex items-center gap-1 md:gap-1.5 px-3 md:px-4 border-b border-white/5 z-20 shrink-0">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="relative flex-1 w-full bg-neutral-900">
                  {screenshots[0] ? (
                    <Image
                      src={screenshots[0]}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 82vw"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xl md:text-2xl font-bold">
                      Preview
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <footer className="flex flex-wrap gap-2 mt-4 md:mt-6">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider bg-[var(--card)] border border-[var(--card-border)] text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </footer>
    </motion.article>
  );
}