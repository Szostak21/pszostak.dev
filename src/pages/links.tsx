import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Link2, ExternalLink } from "lucide-react";
import { siteConfig, socials } from "@/data/config";

export default function Links() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>My Links | {siteConfig.name}</title>
        <meta name="description" content="Find me across the web" />
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 p-0.5 mb-6">
              <div className="w-full h-full rounded-2xl bg-[var(--background)] flex items-center justify-center">
                <Link2 size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              My Links
            </h1>
            <p className="text-lg sm:text-xl text-(--muted) max-w-2xl mx-auto">
              Find me across the web and social platforms
            </p>
          </motion.div>

          {/* Current Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className="glass rounded-2xl p-6 flex items-center justify-between group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-(--accent)/10 flex items-center justify-center">
                    <social.icon size={24} className="text-(--accent)" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{social.name}</h3>
                    <p className="text-(--muted) text-sm">{social.url.replace('https://', '').replace('mailto:', '')}</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-(--muted) group-hover:text-(--accent) transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Placeholder for more */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-3xl p-8 text-center"
          >
            <Link2 size={48} className="text-(--accent) mx-auto mb-3 opacity-50" />
            <h3 className="text-xl font-bold mb-2">More Links Coming Soon</h3>
            <p className="text-(--muted) text-sm max-w-md mx-auto">
              Additional platforms and resources will be added here
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
