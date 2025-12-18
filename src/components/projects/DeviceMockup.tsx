"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface DeviceMockupProps {
  type: "desktop" | "mobile";
  imageSrc?: string;
  imageAlt: string;
  aspectRatio: "4:3" | "16:9";
  gradient?: string;
  className?: string;
}

export function DeviceMockup({
  type,
  imageSrc,
  imageAlt,
  aspectRatio,
  gradient = "from-neutral-700 to-neutral-900",
  className,
}: DeviceMockupProps) {
  const aspectClass = aspectRatio === "4:3" ? "aspect-[4/3]" : "aspect-[9/16]";

  if (type === "mobile") {
    return (
      <div className={cn("relative mx-auto", className)}>
        <div className="relative w-full max-w-70 mx-auto">
          <div
            className={cn(
              "relative rounded-[2.5rem] border-8 overflow-hidden",
              "shadow-2xl shadow-black/40"
            )}
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card)",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 rounded-b-2xl z-10"
              style={{ background: "var(--card)" }}
            />

            <div className={cn("relative w-full", aspectClass)}>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority
                />
              ) : (
                <div
                  className={cn(
                    "w-full h-full bg-linear-to-br",
                    gradient,
                    "flex items-center justify-center"
                  )}
                >
                  <span className="text-white/30 text-6xl font-bold">
                    {imageAlt.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            className="absolute right-0 top-1/4 w-1 h-12 rounded-l-sm"
            style={{ background: "var(--card-border)" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <div
          className="relative rounded-lg border-12 overflow-hidden shadow-2xl shadow-black/40"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card)",
          }}
        >
          <div className={cn("relative w-full", aspectClass)}>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full bg-linear-to-br",
                  gradient,
                  "flex items-center justify-center"
                )}
              >
                <span className="text-white/30 text-8xl font-bold">
                  {imageAlt.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className="w-24 h-2 rounded-t-lg mt-2"
            style={{ background: "var(--card-border)" }}
          />
        </div>
        <div className="flex justify-center">
          <div
            className="w-32 h-3 rounded-lg"
            style={{ background: "var(--card-border)" }}
          />
        </div>
      </div>
    </div>
  );
}
