"use client";

import { motion } from "framer-motion";
import { BookOpen, Trophy, Link2 } from "lucide-react";

const otherItems = [
  {
    title: "Guestbook",
    description: "Leave your mark and see what others have to say",
    icon: BookOpen,
    href: "/guestbook",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Achievements",
    description: "Milestones, certifications, and accomplishments",
    icon: Trophy,
    href: "/achievements",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "My Links",
    description: "Find me across the web and social platforms",
    icon: Link2,
    href: "/links",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function Other() {
  return (
    <section
      id="other"
      className="pt-0 pb-24 sm:pb-32 md:pb-40 relative overflow-hidden"
      style={{
        scrollMarginTop: "120px",
      }}
    >
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            More to{' '}
            <span className="gradient-text bg-linear-to-br from-(--gradient-start) to-(--gradient-end)">
              Explore
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-(--muted) max-w-2xl mx-auto">
            Check out these additional resources and connect with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {otherItems.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              className="group relative p-8 rounded-3xl glass hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              {/* Gradient background on hover */}
              <div 
                className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div 
                  className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} p-0.5 transition-transform duration-300`}
                >
                  <div className="w-full h-full rounded-2xl bg-(--background) flex items-center justify-center">
                    <item.icon size={32} style={{ color: 'var(--foreground)' }} />
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-2xl font-bold mb-2 transition-colors bg-linear-to-br ${item.color} bg-clip-text text-transparent`}>
                    {item.title}
                  </h3>
                  <p className="text-(--muted) text-sm">
                    {item.description}
                  </p>
                </div>

                <div className={`mt-2 text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 bg-linear-to-br ${item.color} bg-clip-text text-transparent`}>
                  Explore →
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
