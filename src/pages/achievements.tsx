import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Achievements() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Achievements | {siteConfig.name}</title>
        <meta name="description" content="My achievements, certifications, and milestones" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-(--muted) hover:text-(--foreground) transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-0.5 mb-6">
              <div className="w-full h-full rounded-2xl bg-[var(--background)] flex items-center justify-center">
                <Trophy size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Achievements
            </h1>
            <p className="text-lg sm:text-xl text-(--muted) max-w-2xl mx-auto">
              Milestones, certifications, and accomplishments throughout my journey
            </p>
          </motion.div>

          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <Trophy size={64} className="text-(--accent) mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-(--muted) max-w-md mx-auto">
              This section will showcase my achievements, certifications, awards, and professional milestones.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
