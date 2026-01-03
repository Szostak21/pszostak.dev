import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { siteConfig, socials } from "@/data/config";

export default function Links() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>My Links | {siteConfig.name}</title>
        <meta name="description" content="Find me across the web" />
      </Head>

      <main className="min-h-screen pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
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
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3 sm:mb-4">
              Connect With Me
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
              <span className="text-(--foreground)">My</span>{" "}
              <span className="text-blue-500">Links</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-(--muted) max-w-2xl mx-auto px-4">
              Find me across the web and social platforms
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
                className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex items-center justify-between group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 p-0.5">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-(--background) flex items-center justify-center">
                      <social.icon size={24} className="text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-(--foreground) group-hover:text-blue-500 transition-colors">
                      {social.name}
                    </h3>
                    <p className="text-(--muted) text-xs sm:text-sm">
                      {social.url.replace('https://', '').replace('mailto:', '')}
                    </p>
                  </div>
                </div>
                <ExternalLink 
                  size={20} 
                  className="text-(--muted) group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
