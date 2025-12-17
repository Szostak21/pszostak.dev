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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3"
      style={{ padding: "16px 24px" }}
    >
      <div className="flex gap-1.5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <span className="text-base font-medium" style={{ color: 'var(--muted)' }}>AI is thinking...</span>
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
      className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-4xl",
          isUser
            ? "rounded-br-md shadow-lg"
            : "rounded-bl-md backdrop-blur-sm"
        )}
        style={{ 
          padding: "16px 24px",
          background: isUser ? 'var(--accent)' : 'var(--card)',
          color: isUser ? 'white' : 'var(--foreground)',
          border: isUser ? 'none' : '1px solid var(--card-border)'
        }}
      >
        <p className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: "0.95rem" }}>
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}

export function ChatHistory({ messages, isLoading, className }: ChatHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-col gap-3 overflow-y-auto scrollbar-hide",
        className
      )}
      style={{ padding: "16px 8px" }}
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
          <p className="text-sm text-center" style={{ color: 'var(--muted)', opacity: 0.5 }}>
            Start a conversation by asking a question below
          </p>
        </motion.div>
      )}
    </div>
  );
}
