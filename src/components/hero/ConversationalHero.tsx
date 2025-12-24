"use client";

import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ReactiveAvatar, AvatarState } from "./ReactiveAvatar";
import { ChatHistory, type ChatMessage } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { portfolioContext } from "@/data/portfolio-context";
import { cn } from "@/lib/utils";

export function ConversationalHero() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  const getAvatarState = (): AvatarState => {
    if (status === "streaming") return "speaking";
    if (status === "submitted") return "thinking";
    return "idle";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    await sendMessage({ text: userMessage });
  };

  const handleSuggestedClick = async (question: string) => {
    if (isLoading) return;
    setInput("");
    await sendMessage({ text: question });
  };

  const formattedMessages: ChatMessage[] = messages.map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: msg.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || "",
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ scrollMarginTop: '120px', paddingTop: '6rem', paddingBottom: '8rem' }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-violet-950/20 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl mx-auto"
      >
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <ReactiveAvatar state={getAvatarState()} />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-1 tracking-tight"
            style={{ fontSize: '200%', color: 'var(--foreground)' }}
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
              {portfolioContext.name}
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "bg-white/2 backdrop-blur-xl rounded-3xl",
            "border border-white/10",
            "shadow-2xl shadow-black/20",
            "overflow-hidden"
          )}
        >
          <ChatHistory
            messages={formattedMessages}
            isLoading={isLoading && formattedMessages[formattedMessages.length - 1]?.role === "user"}
            className="h-72 sm:h-70"
          />

          <div className="h-px" style={{ backgroundColor: 'var(--border-color)' }} />

          <div style={{ padding: "16px" }}>
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              suggestedQuestions={portfolioContext.suggestedQuestions}
              onSuggestedClick={handleSuggestedClick}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-white/30"
          >
            <span className="text-xs">Scroll to explore</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}