import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Send, Trash2, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { siteConfig } from "@/data/config";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { GuestbookEntry } from "@/lib/guestbook";

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)} y ago`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2 },
  },
};

interface GuestbookCardProps {
  entry: GuestbookEntry;
  index: number;
  currentUserId?: string;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function GuestbookCard({ entry, index, currentUserId, onDelete, isDeleting }: GuestbookCardProps) {
  const isOwner = currentUserId === entry.userId;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="group relative"
    >
      <div className="guestbook-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/10">
        {/* Message */}
        <p className="text-base sm:text-lg leading-relaxed mb-4 text-(--foreground)">
          &ldquo;{entry.message}&rdquo;
        </p>

        {/* User info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {entry.userImage ? (
              <Image
                src={entry.userImage}
                alt={entry.userName}
                width={36}
                height={36}
                className="rounded-full ring-2 ring-violet-500/30"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                {entry.userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-semibold text-(--foreground)">{entry.userName}</span>
              <span className="text-sm text-(--muted)">
                {formatDate(entry.createdAt)} • {formatTimeAgo(entry.createdAt)}
              </span>
            </div>
          </div>

          {/* Delete button for owner */}
          {isOwner && (
            <button
              onClick={() => onDelete(entry.id)}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-500/10 text-red-500 disabled:opacity-50"
              aria-label="Delete message"
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Guestbook() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      if (data.entries) {
        setEntries(data.entries);
      }
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await res.json();
      if (data.entry) {
        setEntries((prev) => [data.entry, ...prev]);
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to submit message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    setDeletingId(entryId);
    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId }),
      });

      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== entryId));
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Head>
        <title>{`Guestbook | ${siteConfig.name}`}</title>
        <meta name="description" content="Leave your mark on the community wall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background texture - noise pattern */}
        <div className="guestbook-noise absolute inset-0 opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/")}
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
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold tracking-widest text-violet-500 uppercase mb-4">
              The Community Wall
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="text-(--foreground)">Leave Your</span>{" "}
              <span className="text-violet-500">Mark</span>
            </h1>
            <p className="text-lg sm:text-xl text-(--muted) max-w-2xl mx-auto">
              Share your thoughts, feedback, or just say hi!
            </p>
          </motion.div>

          {/* Sign in / Input section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="guestbook-input-card rounded-3xl p-6 sm:p-8">
              

              {status === "loading" ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-violet-500" size={32} />
                </div>
              ) : session ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    {session.user?.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-violet-500/50"
                      />
                    )}
                    <div>
                      <p className="font-medium text-(--foreground)">{session.user?.name}</p>
                      <button
                        onClick={() => signOut()}
                        className="text-sm text-(--muted) hover:text-violet-500 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message..."
                      maxLength={500}
                      className="flex-1 bg-(--card) border border-(--card-border) rounded-xl px-4 py-3 text-(--foreground) placeholder:text-(--muted) focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim() || isSubmitting}
                      className="px-6 py-3 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={18} />
                          <span className="hidden sm:inline">Send</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-(--muted) mb-6">
                    Sign in to pin your message to this board forever.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => signIn("github")}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-(--card) hover:bg-(--card-border) border border-(--card-border) rounded-xl font-medium transition-all hover:scale-105 w-full sm:w-auto justify-center"
                    >
                      <Github size={20} />
                      Sign in with GitHub
                    </button>
                    <button
                      onClick={() => signIn("google")}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-(--card) hover:bg-(--card-border) border border-(--card-border) rounded-xl font-medium transition-all hover:scale-105 w-full sm:w-auto justify-center"
                    >
                      <FcGoogle size={20} />
                      Sign in with Google
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Entries */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin text-violet-500" size={40} />
              </div>
            ) : entries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="guestbook-card rounded-3xl p-12 text-center"
              >
                <h3 className="text-2xl font-bold mb-2">Be the first!</h3>
                <p className="text-(--muted) max-w-md mx-auto">
                  No messages yet. Sign in and leave the first message on the wall!
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => (
                  <GuestbookCard
                    key={entry.id}
                    entry={entry}
                    index={index}
                    currentUserId={(session?.user as { id?: string })?.id}
                    onDelete={handleDelete}
                    isDeleting={deletingId === entry.id}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
