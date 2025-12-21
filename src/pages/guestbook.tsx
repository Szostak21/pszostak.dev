import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { siteConfig } from "@/data/config";
import Navbar from "@/components/Navbar";

export default function Guestbook() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Guestbook | {siteConfig.name}</title>
        <meta name="description" content="Leave your mark in my guestbook" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 mb-6">
              <div className="w-full h-full rounded-2xl bg-[var(--background)] flex items-center justify-center">
                <BookOpen size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Guestbook
            </h1>
            <p className="text-lg sm:text-xl text-(--muted) max-w-2xl mx-auto">
              Sign the guestbook and leave your thoughts, feedback, or just say hi!
            </p>
          </motion.div>

          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <BookOpen size={64} className="text-(--accent) mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-(--muted) max-w-md mx-auto">
              The guestbook feature is under development. Soon you&apos;ll be able to leave messages and see what others have shared.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
