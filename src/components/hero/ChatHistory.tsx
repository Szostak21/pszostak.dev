"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  className?: string;
}

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 }, // Zmniejszony offset y
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-center gap-2"
      // Zmniejszony padding (16px 24px -> 8px 16px)
      style={{ padding: "8px 16px" }}
    >
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full" // Mniejsze kropki
            style={{ background: 'var(--accent)' }}
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>AI is thinking...</span>
    </motion.div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      // Zmniejszony margines dolny (mb-4 -> mb-2)
      className={cn("flex w-full mb-2", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[90%] rounded-2xl", // Zmniejszony radius i zwiększona szerokość max
          isUser
            ? "rounded-br-none shadow-md"
            : "rounded-bl-none backdrop-blur-sm"
        )}
        style={{ 
          // Zmniejszony padding wewnątrz wiadomości (16px 24px -> 10px 16px)
          padding: "10px 16px",
          background: isUser ? 'var(--accent)' : 'var(--card)',
          color: isUser ? 'white' : 'var(--foreground)',
          border: isUser ? 'none' : '1px solid var(--card-border)'
        }}
      >
        <p className="leading-snug whitespace-pre-wrap" style={{ fontSize: "0.9rem" }}>
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}

export function ChatHistory({ messages, isLoading, className }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        // Zmniejszony gap między wiadomościami (gap-3 -> gap-1)
        "flex flex-col gap-1 overflow-y-auto scrollbar-hide",
        className
      )}
      // Zmniejszony padding kontenera (16px 8px -> 12px 8px)
      style={{ padding: "12px 8px" }}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator key="typing" />}
      </AnimatePresence>

      {/* Empty state */}
      {messages.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <p className="text-xs text-center" style={{ color: 'var(--muted)', opacity: 0.5 }}>
            Ask me anything about Paweł...
          </p>
        </motion.div>
      )}
    </div>
  );
}