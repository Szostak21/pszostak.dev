"use client";

import { motion } from "framer-motion";
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
      <header className="mb-6">
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
            isLarge ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          )}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          isLarge ? "min-h-[600px]" : "min-h-[480px]"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br",
            project.bgColor || "from-neutral-800 to-neutral-900"
          )} 
        />

        <div className="relative z-20 px-8 pt-8 pb-6 md:px-12 md:pt-10 md:pb-8">
          <p className={cn(
            "text-white/90 leading-relaxed font-medium text-balance max-w-2xl drop-shadow-sm",
            isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
          )}>
            {project.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-end">
          {isMobile ? (
            <div className="relative w-full max-w-md h-[300px] md:h-[380px]">
              {screenshots[1] && (
                <motion.div 
                  className="absolute left-4 md:left-8 -bottom-28 w-[38%] z-10 origin-bottom"
                  whileHover={{ x: -20, rotate: -5 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-[9/19] rounded-t-3xl border-x-4 border-t-4 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                    <img 
                      src={screenshots[1]} 
                      alt={`${project.title} screen 2`} 
                      className="w-full h-full object-cover object-top opacity-60" 
                    />
                  </div>
                </motion.div>
              )}
              {screenshots[2] && (
                <motion.div 
                  className="absolute right-4 md:right-8 -bottom-28 w-[38%] z-10 origin-bottom"
                  whileHover={{ x: 20, rotate: 5 }} 
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-[9/19] rounded-t-3xl border-x-4 border-t-4 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                    <img 
                      src={screenshots[2]} 
                      alt={`${project.title} screen 3`} 
                      className="w-full h-full object-cover object-top opacity-60" 
                    />
                  </div>
                </motion.div>
              )}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -bottom-28 w-[45%] z-20 origin-bottom"
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative aspect-[9/19] rounded-t-3xl border-x-[6px] border-t-[6px] border-neutral-900 bg-neutral-900 overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-5 bg-black rounded-b-xl z-30" />
                  <img 
                    src={screenshots[0]} 
                    alt={`${project.title} main screen`} 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="w-[88%] md:w-[82%] origin-bottom"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative aspect-[16/12] rounded-t-xl bg-neutral-900 border-x border-t border-white/10 overflow-hidden shadow-2xl flex flex-col">
                <div className="h-7 bg-neutral-800/90 flex items-center gap-1.5 px-4 border-b border-white/5 z-20 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="relative flex-1 w-full bg-neutral-900">
                  {screenshots[0] ? (
                    <img 
                      src={screenshots[0]} 
                      alt={`${project.title} screenshot`} 
                      className="absolute inset-0 w-full h-full object-cover object-top" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl font-bold">
                      Preview
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <footer className="flex flex-wrap gap-2 mt-6">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-4 py-2 text-xs font-bold rounded-full uppercase tracking-wider bg-[var(--card)] border border-[var(--card-border)] text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </footer>
    </motion.article>
  );
}