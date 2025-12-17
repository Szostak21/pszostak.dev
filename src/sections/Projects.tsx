"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-32 px-4 sm:px-0" style={{ scrollMarginTop: '120px', paddingTop: '0rem', paddingBottom: '8rem' }}>
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-base font-bold text-accent uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-8 text-xl sm:text-2xl leading-relaxed font-light text-center">
            A selection of projects I&apos;ve worked on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-[2.5rem] card-hover flex flex-col h-full"
              style={{ padding: "32px" }}
            >
              {/* Project image placeholder */}
              <div className="aspect-video rounded-2xl bg-linear-to-br from-(--gradient-start)/20 to-(--gradient-end)/20 overflow-hidden relative" style={{ marginBottom: "24px" }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <span className="text-6xl font-bold opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Project info */}
              <h3 className="text-3xl font-bold group-hover:text-accent transition-colors tracking-tight" style={{ marginBottom: "16px" }}>
                {project.title}
              </h3>
              <p className="text-muted text-lg sm:text-xl line-clamp-3 leading-relaxed font-light grow" style={{ marginBottom: "24px" }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-3" style={{ marginBottom: "24px" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-bold bg-accent/10 text-accent rounded-full border border-accent/20"
                    style={{ padding: "8px 16px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 mt-auto border-t border-white/5" style={{ paddingTop: "16px" }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-lg text-muted hover:text-foreground transition-colors font-medium group/link"
                  >
                    <Github size={22} className="group-hover/link:scale-110 transition-transform" />
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-lg text-muted hover:text-foreground transition-colors font-medium group/link"
                  >
                    <ExternalLink size={22} className="group-hover/link:scale-110 transition-transform" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Szostak21?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold text-lg transition-colors"
          >
            View all projects on GitHub
            <ExternalLink size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
