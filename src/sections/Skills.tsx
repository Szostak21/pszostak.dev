"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="py-16 sm:py-20 md:py-32 px-4 sm:px-0 relative overflow-hidden" 
      style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[var(--accent)]/5 rounded-full blur-3xl" />
      </div>

      <div className="section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-base font-bold text-[var(--accent)] uppercase tracking-widest">
            My Skills
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            The <span className="gradient-text">Tech Stack</span> I Use
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-[var(--muted)] leading-relaxed font-light max-w-3xl mx-auto">
            I work with modern technologies to build fast, scalable, and user-friendly applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
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
              transition={{ duration: 0.15 }}
              className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-6 cursor-default hover:border-[var(--accent)]/30 hover:bg-white/[0.08] dark:hover:bg-white/[0.08] group"
            >
              {/* Icon */}
              <skill.icon
                size={48}
                className="sm:w-14 sm:h-14"
                style={{
                  color:
                    skill.color && skill.color.toLowerCase() !== "#ffffff"
                      ? skill.color
                      : "var(--foreground)",
                }}
              />
              
              {/* Skill name */}
              <span className="text-sm sm:text-lg font-bold text-center text-[var(--foreground)]">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Animated marquee */}
        <div className="mt-12 sm:mt-16 overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex">
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