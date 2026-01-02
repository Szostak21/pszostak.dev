"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden" 
      style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[var(--accent)]/5 rounded-full blur-3xl" />
      </div>

      <div className="section px-4 sm:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-sm sm:text-base font-bold text-[var(--accent)] uppercase tracking-widest">
            My Skills
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            The <span className="gradient-text">Tech Stack</span> I Use
          </h2>
          <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-[var(--muted)] leading-relaxed font-light max-w-3xl mx-auto">
            I work with modern technologies to build fast, scalable, and user-friendly applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass rounded-xl sm:rounded-3xl p-3 sm:p-6 flex flex-col items-center gap-2 sm:gap-6 cursor-default hover:border-[var(--accent)]/30 hover:bg-white/[0.08] group transition-all"
            >
              <skill.icon
                className="w-6 h-6 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-colors"
                style={{
                  color:
                    skill.color && skill.color.toLowerCase() !== "#ffffff"
                      ? skill.color
                      : "var(--foreground)",
                }}
              />
              <span className="text-[10px] sm:text-lg font-bold text-center text-[var(--foreground)] tracking-tight sm:tracking-normal">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16 w-full overflow-hidden relative py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex w-max">
            <div className="flex animate-marquee whitespace-nowrap">
              {[
                " RESPONSIVE ",
                " ACCESSIBLE ",
                " SCALABLE ",
                " PERFORMANT ",
                " MODERN ",
              ].map((word, index) => (
                <span
                  key={index}
                  className="mx-4 sm:mx-8 text-2xl sm:text-4xl md:text-6xl font-bold text-[var(--card-border)] select-none"
                >
                  {word}
                </span>
              ))}
            </div>
            {/* Druga kopia dla płynnego zapętlenia */}
            <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
              {[
                " RESPONSIVE ",
                " ACCESSIBLE ",
                " SCALABLE ",
                " PERFORMANT ",
                " MODERN ",
              ].map((word, index) => (
                <span
                  key={index}
                  className="mx-4 sm:mx-8 text-2xl sm:text-4xl md:text-6xl font-bold text-[var(--card-border)] select-none"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}