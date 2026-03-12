"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface EvaTitleScreenProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "className"> {
  /** Main title text (e.g. "EPISODE:01") */
  title: string;
  /** Optional secondary text (e.g. "ANGEL ATTACK") */
  subtitle?: string;
  /** Text layout mode */
  align?: "center" | "split" | "random";
  /** Optional className */
  className?: string;
}

export const EvaTitleScreen = forwardRef<HTMLDivElement, EvaTitleScreenProps>(
  function EvaTitleScreen(
    {
      title,
      subtitle,
      align = "center",
      className = "",
      ...rest
    },
    ref
  ) {
    // "random" mode: generate deterministic offsets from title characters
    const randomOffsets = title.split("").map((ch, i) => ({
      x: ((ch.charCodeAt(0) * 7 + i * 31) % 60) - 30,
      y: ((ch.charCodeAt(0) * 13 + i * 17) % 40) - 20,
    }));

    // --- SPLIT layout ---
    if (align === "split") {
      return (
        <div
          ref={ref}
          className={`relative w-full min-h-screen bg-bg-base flex flex-col justify-between overflow-hidden select-none ${className}`}
          {...rest}
        >
          {/* Title -- top left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 md:p-16"
          >
            <h1
              className="text-white text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-black uppercase"
              style={{
                fontFamily: "var(--font-eva-title)",
                lineHeight: "0.85",
                letterSpacing: "-0.04em",
              }}
            >
              {title}
            </h1>
          </motion.div>

          {/* Subtitle -- bottom right */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="self-end p-8 md:p-16"
            >
              <h2
                className="text-white text-5xl sm:text-7xl md:text-[8rem] lg:text-[12rem] font-black uppercase text-right"
                style={{
                  fontFamily: "var(--font-eva-title)",
                  lineHeight: "0.85",
                  letterSpacing: "-0.04em",
                }}
              >
                {subtitle}
              </h2>
            </motion.div>
          )}
        </div>
      );
    }

    // --- RANDOM layout ---
    if (align === "random") {
      return (
        <div
          ref={ref}
          className={`relative w-full min-h-screen bg-bg-base flex items-center justify-center overflow-hidden select-none ${className}`}
          {...rest}
        >
          <div className="relative">
            {/* Title characters scattered */}
            <div className="flex flex-wrap justify-center">
              {title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: randomOffsets[i].x,
                    y: randomOffsets[i].y,
                  }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="text-white text-6xl sm:text-8xl md:text-[10rem] font-black uppercase inline-block"
                  style={{
                    fontFamily: "var(--font-eva-title)",
                    lineHeight: "0.85",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle below */}
            {subtitle && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: title.length * 0.05 + 0.3, duration: 0.5 }}
                className="text-white text-2xl md:text-5xl font-black uppercase text-center mt-8"
                style={{
                  fontFamily: "var(--font-eva-title)",
                  lineHeight: "0.85",
                  letterSpacing: "-0.02em",
                }}
              >
                {subtitle}
              </motion.h2>
            )}
          </div>
        </div>
      );
    }

    // --- CENTER layout (default) ---
    return (
      <div
        ref={ref}
        className={`relative w-full min-h-screen bg-bg-base flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
        {...rest}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-white text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-black uppercase text-center px-4"
          style={{
            fontFamily: "var(--font-eva-title)",
            lineHeight: "0.85",
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white text-3xl md:text-6xl lg:text-8xl font-black uppercase text-center mt-2 px-4"
            style={{
              fontFamily: "var(--font-eva-title)",
              lineHeight: "0.85",
              letterSpacing: "-0.02em",
            }}
          >
            {subtitle}
          </motion.h2>
        )}
      </div>
    );
  }
);
