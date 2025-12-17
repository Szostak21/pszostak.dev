export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  screenshots?: string[];
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  orientation: "landscape" | "portrait";
  aspectRatio: "4:3" | "16:9";
  deviceType: "desktop" | "mobile";
  gradient?: string;
  bgColor?: string;
}

export const projects: Project[] = [
  {
    id: "cube-solver",
    title: "Cube Solver",
    description: "Desktop application using computer vision to scan and solve Rubik's Cubes in real-time.",
    longDescription: "An intelligent application that leverages OpenCV for color recognition and implements efficient clustering algorithms to solve Rubik's Cubes. Features real-time camera capture and step-by-step solution visualization.",
    tags: ["C++", "OpenCV", "Computer Vision", "Algorithms"],
    github: "https://github.com/Szostak21/cube-solver",
    featured: true,
    orientation: "landscape",
    aspectRatio: "4:3",
    deviceType: "desktop",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-linear-to-br from-blue-500/90 to-cyan-500/90",
    screenshots: ["/projects/cube_solver.png"],
  },
  {
    id: "guess-who",
    title: "Guess Who?",
    description: "Mobile adaptation of the classic board game with camera integration for custom boards.",
    longDescription: "A Flutter-based mobile game featuring online multiplayer, pass-and-play mode, and innovative camera integration allowing players to create personalized game boards with their own photos.",
    tags: ["Flutter", "WebSockets", "Mobile", "Real-time"],
    github: "https://github.com/Szostak21/guess-who",
    featured: true,
    orientation: "portrait",
    aspectRatio: "16:9",
    deviceType: "mobile",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-linear-to-br from-purple-500/90 to-pink-500/90",
    screenshots: [
      "/projects/guess-who-1.png",
      "/projects/guess-who-2.png",
      "/projects/guess-who-3.png"
    ],
  },
  {
    id: "self-improvement-tree",
    title: "Self-Improvement Tree",
    description: "Mobile SaaS app that gamifies personal development through habit tracking.",
    longDescription: "A comprehensive habit-tracking application with cloud synchronization, payment integration via Stripe, and a gamification system that turns daily habits into an engaging progression tree. Features email confirmations and secure account management.",
    tags: ["SaaS", "Stripe", "Mobile", "Cloud", "Gamification"],
    github: "https://github.com/Szostak21/self-improvement-tree",
    featured: true,
    orientation: "portrait",
    aspectRatio: "16:9",
    deviceType: "mobile",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-linear-to-br from-green-500/90 to-emerald-500/90",
    screenshots: [
      "/projects/tree-1.png",
      "/projects/tree-2.png",
      "/projects/tree-3.png"
    ],
  },
  {
    id: "nebula",
    title: "Nebula",
    description: "Arcade runner game with procedural terrain generation and dynamic gameplay.",
    longDescription: "A Python-based arcade game built with Kivy, featuring custom procedural generation algorithms that create unique terrain in real-time. Includes multiple game modes and immersive visual effects.",
    tags: ["Python", "Kivy", "Game Dev", "Procedural Generation"],
    github: "https://github.com/Szostak21/nebula",
    featured: true,
    orientation: "landscape",
    aspectRatio: "4:3",
    deviceType: "desktop",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-linear-to-br from-violet-500/90 to-purple-500/90",
    screenshots: ["/projects/nebula-1.png"],
  },
];
