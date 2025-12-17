"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-32 px-4 sm:px-0 relative overflow-hidden" style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--accent)/5 rounded-full blur-3xl" />
      </div>

      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-base font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            My Skills
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            The <span className="gradient-text">Tech Stack</span> I Use
          </h2>
          <p className="mt-8 text-xl sm:text-2xl leading-relaxed font-light text-center" style={{ color: 'var(--muted)', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
            I work with modern technologies to build fast, scalable, and user-friendly applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group glass rounded-3xl flex flex-col items-center gap-6 cursor-default transition-colors"
              style={{ 
                padding: "24px"
              }}
              onMouseEnter={(e) => {
                const theme = document.documentElement.getAttribute('data-theme') || 'dark';
                e.currentTarget.style.background = theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                const theme = document.documentElement.getAttribute('data-theme') || 'dark';
                e.currentTarget.style.background = theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.03)';
              }}
            >
              <skill.icon
                size={56}
                style={{
                  color:
                    skill.color && skill.color.toLowerCase() !== "#ffffff"
                      ? skill.color
                      : "var(--foreground)",
                }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-lg font-bold text-center" style={{ color: 'var(--foreground)' }}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {[
                " RESPONSIVE ",
                " ACCESSIBLE ",
                " SCALABLE ",
                " PERFORMANT ",
                " MODERN ",
                " CLEAN CODE ",
                " USER-FOCUSED ",
                " RESPONSIVE ",
                " ACCESSIBLE ",
                " SCALABLE ",
                " PERFORMANT ",
                " MODERN ",
                " USER-FOCUSED ",
              ].map((word, index) => (
                <span
                  key={index}
                  className="mx-8 text-4xl md:text-6xl font-bold select-none"
                  style={{ color: 'var(--card-border)' }}
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
