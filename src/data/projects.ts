export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "A full-stack web application built with modern technologies. Features include real-time updates, authentication, and responsive design.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/Szostak21/project-one",
    demo: "https://project-one.vercel.app",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    description: "Mobile-first e-commerce platform with payment integration and inventory management system.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/Szostak21/project-two",
    featured: true,
  },
  {
    id: "project-3",
    title: "Project Three",
    description: "AI-powered tool that helps developers write better code through intelligent suggestions and analysis.",
    tags: ["Python", "FastAPI", "OpenAI", "Docker"],
    github: "https://github.com/Szostak21/project-three",
    featured: true,
  },
  {
    id: "project-4",
    title: "Project Four",
    description: "Real-time collaboration platform for remote teams with video conferencing and document editing.",
    tags: ["Next.js", "WebRTC", "Socket.io", "Redis"],
    github: "https://github.com/Szostak21/project-four",
    featured: false,
  },
];
