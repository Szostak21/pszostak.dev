"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail, Send } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 px-4 sm:px-0 relative overflow-hidden" style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-(--accent)/5 to-transparent" />
      </div>

      <div className="section flex justify-center">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-base font-bold text-accent uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Let&apos;s <span className="gradient-text">Work Together</span>
            </h2>
            <p className="mt-8 text-xl sm:text-2xl text-muted max-w-3xl mx-auto leading-relaxed font-light" style={{ textAlign: 'center' }}>
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s bring your ideas to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="glass rounded-[2.5rem] card-hover flex flex-col h-full" style={{ padding: "40px" }}>
              <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center" style={{ marginBottom: "32px" }}>
                <Calendar size={40} className="text-accent" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ marginBottom: "16px" }}>Book a Call</h3>
              <p className="text-muted text-lg sm:text-xl leading-relaxed font-light grow" style={{ marginBottom: "32px" }}>
                Schedule a 30-minute call to discuss your project, ask questions,
                or just say hi. I&apos;m always happy to chat!
              </p>
              <a
                href={siteConfig.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ padding: "16px 32px", background: 'var(--accent)', color: 'white', boxShadow: '0 10px 30px -10px var(--accent-hover)', zIndex: 1 }}
                aria-label="Schedule a call"
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Schedule Now</span>
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                  style={{ position: 'relative', zIndex: 1 }}
                />
              </a>
            </div>

            <div className="glass rounded-[2.5rem] card-hover flex flex-col h-full" style={{ padding: "40px" }}>
              <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center" style={{ marginBottom: "32px" }}>
                <Mail size={40} className="text-accent" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ marginBottom: "16px" }}>Send an Email</h3>
              <p className="text-muted text-lg sm:text-xl leading-relaxed font-light grow" style={{ marginBottom: "32px" }}>
                Prefer email? Drop me a line and I&apos;ll get back to you within
                24-48 hours. Looking forward to hearing from you!
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center justify-center gap-3 glass hover:bg-white/10 text-foreground rounded-full font-bold text-lg transition-all hover:-translate-y-1"
                style={{ padding: "16px 32px" }}
              >
                <Send size={24} />
                {siteConfig.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-muted">
              Currently{" "}
              <span className="text-green-400 font-semibold">
                {siteConfig.available ? "available" : "unavailable"}
              </span>{" "}
              for freelance work
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
