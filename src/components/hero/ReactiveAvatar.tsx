"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type AvatarState = "idle" | "thinking" | "speaking";

interface ReactiveAvatarProps {
  state: AvatarState;
  className?: string;
}

const glowVariants: Variants = {
  idle: { opacity: 0.1, scale: 0.8 },
  thinking: {
    opacity: [0.15, 0.3, 0.15],
    scale: [1, 1.05, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
  },
  speaking: {
    opacity: [0.2, 0.4, 0.2],
    scale: [1, 1.1, 1],
    transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
  },
};

export function ReactiveAvatar({ state, className }: ReactiveAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [hasTriggeredAction, setHasTriggeredAction] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => setIsMounted(true));
    const checkIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
      || (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
    window.requestAnimationFrame(() => setIsIOS(checkIOS));
  }, []);

  useLayoutEffect(() => {
    if (!isMounted || isIOS) return;
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [isMounted, isIOS]);

  useEffect(() => {
    if (!isMounted || isIOS) return;
    const video = videoRef.current;
    if (!video || !isLoaded || !hasPlayedIntro) return;

    if (state !== "idle" && !hasTriggeredAction) {
      window.requestAnimationFrame(() => setHasTriggeredAction(true));
      video.currentTime = 2.35;
      video.play().catch(() => {});
    } else if (state === "idle") {
      window.requestAnimationFrame(() => setHasTriggeredAction(false));
    }
  }, [state, isLoaded, hasPlayedIntro, hasTriggeredAction, isMounted, isIOS]);

  useEffect(() => {
    if (!isMounted || isIOS) return;
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;

      if (!hasPlayedIntro) {
        if (time >= 2.35) {
          video.currentTime = 2.35;
          video.pause();
          setHasPlayedIntro(true);
        }
        return;
      }

      if (time > 2.35) {
        if (time >= 5.20) {
          video.currentTime = 2.35;
          video.pause();
        }
      } else if (state === "idle") {
        if (Math.abs(time - 2.35) > 0.05) {
          video.currentTime = 2.35;
          video.pause();
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [state, hasPlayedIntro, isMounted, isIOS]);

  if (!isMounted) {
    return (
      <div className={cn("relative flex items-center justify-center z-0", className)}>
        <div className="relative w-36 h-36 sm:w-52 sm:h-52" />
      </div>
    );
  }

  return (
    <div className={cn("relative flex items-center justify-center z-0", className)}>
      <motion.div
        className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-violet-600/10 blur-[35px] -z-10"
        variants={glowVariants}
        animate={state}
      />

      <div className="relative w-36 h-36 sm:w-52 sm:h-52 flex items-center justify-center">
        {isIOS ? (
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={208}
            height={208}
            className="w-full h-full object-contain pointer-events-none"
            priority
          />
        ) : (
          <>
            {!isLoaded && <div className="absolute inset-0 bg-transparent" />}
            <video
              ref={videoRef}
              muted
              playsInline
              autoPlay
              preload="auto"
              controls={false}
              onLoadedData={() => setIsLoaded(true)}
              className={cn(
                "w-full h-full object-contain pointer-events-none transition-opacity duration-500",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <source src="/avatar.mp4" type='video/mp4; codecs="hvc1"' />
              <source src="/avatar.webm" type="video/webm" />
            </video>
          </>
        )}
      </div>
    </div>
  );
}