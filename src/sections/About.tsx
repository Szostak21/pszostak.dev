"use client";

import { motion } from "framer-motion";
import { siteConfig, socials } from "@/data/config";
import { GraduationCap, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-32 px-4 sm:px-0" style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}>
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl glass overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-(--gradient-start)/30 to-(--gradient-end)/30 flex items-center justify-center">
                <span className="text-8xl font-bold gradient-text">
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-base font-bold text-accent uppercase tracking-widest">
              About Me
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Know <span className="gradient-text">Who I Am</span>
            </h2>

            <div className="mt-10 space-y-6 text-muted text-xl sm:text-2xl leading-relaxed font-light">
              <p>
                I&apos;m a passionate Full Stack Developer with a love for creating
                elegant solutions to complex problems. With expertise in modern
                web technologies, I specialize in building responsive,
                user-friendly applications that make a difference.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="glass rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-colors" style={{ padding: "24px" }}>
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <GraduationCap size={32} className="text-accent" />
                </div>
                <div>
                  <p className="font-bold text-lg">Computer Science</p>
                  <p className="text-base text-muted">Education</p>
                </div>
              </div>
              <div className="glass rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-colors" style={{ padding: "24px" }}>
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Heart size={32} className="text-accent" />
                </div>
                <div>
                  <p className="font-bold text-lg">Open Source</p>
                  <p className="text-base text-muted">Contributor</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
