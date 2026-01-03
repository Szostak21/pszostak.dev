import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Mountain, Medal, Dumbbell, Trophy } from "lucide-react";
import { siteConfig } from "@/data/config";
import Image from "next/image";

interface Achievement {
  id: string;
  title: string;
  description: string;
  file: string; 
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  isHero?: boolean;
}

const achievements: Achievement[] = [
  {
    id: "google",
    title: "Google AI Program",
    description: "Completed Google's 5-week intensive AI training program. Mastered foundational concepts in AI & how to integrate it into business.",
    file: "/achievements/google.jpg",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    isHero: true,
  },
  {
    id: "cassini",
    title: "Cassini Hackathon",
    description: "Secured 3rd place in space technology hackathon. Developed an innovative solution for tourists safety in mountains.",
    file: "/achievements/cassini.jpg",
    icon: Trophy,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "marathon",
    title: "Half-Marathon Finisher", 
    description: "21.1 km of mental battle. Completed my first half-marathon, requiring months of dedication and training.",
    file: "/achievements/marathon.jpg",
    icon: Medal,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "freeride",
    title: "Alpine Freeride",
    description: "Conquered a freeride descent on snowboard from one of the highest glaciers in Austria.",
    file: "/achievements/freeride.jpg",
    icon: Mountain,
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "hspu",
    title: "Weighted Handstand Push-Up",
    description: "Mastered the weighted handstand push-up. Perfect balance between raw strength and precise control.",
    file: "/achievements/hspu.jpg",
    icon: Dumbbell,
    color: "from-rose-500 to-red-600",
  },
];

export default function Achievements() {
  const router = useRouter();
  const heroItem = achievements.find(a => a.isHero);
  const gridItems = achievements.filter(a => !a.isHero);

  return (
    <>
      <Head>
        <title>Achievements | {siteConfig.name}</title>
      </Head>

      <main className="min-h-screen pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-6 sm:mb-8 group"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-amber-500 uppercase mb-3 sm:mb-4">
              Milestones & Victories
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
              <span className="text-(--foreground)">My</span>{" "}
              <span className="text-amber-500">Achievements</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-(--muted) max-w-2xl mx-auto px-4">
              From code to peaks, every achievement tells a story of dedication.
            </p>
          </motion.div>

          {heroItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 sm:mb-10 md:mb-12 w-full"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-(--card) border border-(--card-border) shadow-2xl flex flex-col md:flex-row group cursor-default">
                <div className="relative w-full md:w-3/5 aspect-[1.41/1] bg-white border-b md:border-b-0 md:border-r border-(--card-border) overflow-hidden">
                    <Image 
                        src={heroItem.file} 
                        alt={heroItem.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        style={{ transformOrigin: 'center center' }}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 60vw"
                    />
                </div>

                <div className="p-5 sm:p-6 md:p-8 md:w-2/5 flex flex-col justify-center bg-(--card)">
                    <div className="mb-3 sm:mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-(--foreground)">{heroItem.title}</h2>
                    </div>
                    <p className="text-(--muted) text-sm sm:text-base leading-relaxed">
                        {heroItem.description}
                    </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
             {gridItems.map((item, index) => (
                <AchievementCard key={item.id} item={item} index={index + 1} />
             ))}
          </div>

        </div>
      </main>
    </>
  );
}

function AchievementCard({ item, index }: { item: Achievement, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-4 group cursor-default"
        >
            <div className="relative w-full aspect-[1/1.41] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-(--card-border) bg-(--card) shadow-lg">
                <Image
                    src={item.file}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="px-0.5 sm:px-1">
                <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-(--foreground) group-hover:text-amber-500 transition-colors">
                        {item.title}
                    </h3>
                    <div className={`p-1.5 rounded-lg bg-linear-to-br ${item.color} opacity-90 shrink-0`}>
                        <item.icon size={14} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                </div>
                <p className="text-xs sm:text-sm text-(--muted) leading-relaxed">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}