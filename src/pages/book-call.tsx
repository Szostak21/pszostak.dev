import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Globe, Video } from "lucide-react";
import { siteConfig } from "@/data/config";
import Navbar from "@/components/Navbar";

export default function BookCall() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Book a Call | {siteConfig.name}</title>
        <meta name="description" content="Schedule a meeting with me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8 group"
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Let&apos;s Schedule a Call
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Choose a time that works best for you. I&apos;m looking forward to connecting!
            </p>
          </motion.div>

          {/* Meeting details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Meeting Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Duration</h3>
                  <p className="text-[var(--muted)] text-sm">30 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Video size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Platform</h3>
                  <p className="text-[var(--muted)] text-sm">Google Meet (link provided after booking)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Globe size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Timezone</h3>
                  <p className="text-[var(--muted)] text-sm">Central European Time (CET)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={24} className="text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Availability</h3>
                  <p className="text-[var(--muted)] text-sm">Monday - Friday, 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-3xl p-8 min-h-[500px] flex items-center justify-center"
          >
            <div className="text-center">
              <Calendar size={64} className="text-[var(--accent)] mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Google Calendar Integration</h3>
              <p className="text-[var(--muted)] max-w-md mx-auto">
                Calendar booking system will be integrated here. You&apos;ll be able to select available time slots and schedule meetings directly.
              </p>
              <div className="mt-8 inline-block px-6 py-3 rounded-full glass border border-[var(--accent)]/20">
                <span className="text-[var(--accent)] font-semibold">Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
