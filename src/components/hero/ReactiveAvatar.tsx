"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type AvatarState = "idle" | "thinking" | "speaking";

interface ReactiveAvatarProps {
  state: AvatarState;
  className?: string;
}

const pulseVariants: Variants = {
  idle: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  thinking: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  speaking: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const glowVariants: Variants = {
  idle: {
    opacity: 0.3,
    scale: 1,
  },
  thinking: {
    opacity: [0.4, 0.7, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  speaking: {
    opacity: [0.5, 0.9, 0.5],
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants: Variants = {
  idle: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
  thinking: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
  speaking: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

export function ReactiveAvatar({ state, className }: ReactiveAvatarProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-linear-to-r from-violet-500/30 to-purple-500/30 blur-xl"
        variants={glowVariants}
        animate={state}
      />

      <motion.div
        className="absolute w-28 h-28"
        variants={orbVariants}
        animate={state}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-400"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 120}deg) translateX(56px)`,
            }}
            animate={{
              opacity: state === "idle" ? 0.4 : state === "thinking" ? 0.7 : 1,
              scale: state === "speaking" ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: state === "speaking" ? Infinity : 0,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className={cn(
          "relative w-24 h-24 rounded-full flex items-center justify-center",
          "bg-linear-to-br from-violet-600 to-purple-700",
          "shadow-lg shadow-violet-500/25"
        )}
        variants={pulseVariants}
        animate={state}
      >
        <div className="absolute inset-1 rounded-full bg-linear-to-br from-white/20 to-transparent" />

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-3xl"
            >
              👋
            </motion.div>
          )}
          {state === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-1"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
          {state === "speaking" && (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-0.5 items-end"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-white rounded-full"
                  animate={{
                    height: [8, 20, 8],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.span
        className="absolute -bottom-8 text-xs text-white/50 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={state}
      >
        {state === "idle" && ""}
        {state === "thinking" && ""}
        {state === "speaking" && ""}
      </motion.span>
    </div>
  );
}
