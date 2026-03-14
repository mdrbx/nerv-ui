"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface TitleScreenProps
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

export const TitleScreen = forwardRef<HTMLDivElement, TitleScreenProps>(
  function TitleScreen(
    {
      title,
      subtitle,
      align = "center",
      className = "",
      ...rest
    },
    ref
  ) {
    const randomOffsets = title.split("").map((ch, index) => ({
      x: ((ch.charCodeAt(0) * 5 + index * 17) % 20) - 10,
      y: ((ch.charCodeAt(0) * 7 + index * 11) % 18) - 9,
      rotate: ((ch.charCodeAt(0) * 3 + index * 5) % 8) - 4,
    }));

    const dominantTitle = subtitle ? subtitle : title;
    const supportTitle = subtitle ? title : undefined;
    const serifStyle = {
      fontFamily: "var(--font-eva-title)",
      fontStyle: "italic" as const,
      lineHeight: "0.9",
    };
    const railClass = "absolute h-px bg-white/10";
    const titleColor = "#E7E0D2";
    const metaStyle = {
      fontFamily: "var(--font-eva-mono)",
      letterSpacing: "0.3em",
      textTransform: "uppercase" as const,
    };

    if (align === "split") {
      return (
        <div
          ref={ref}
          className={`relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-bg-base px-6 py-6 select-none md:px-10 md:py-10 ${className}`}
          {...rest}
        >
          <div className={`${railClass} left-6 right-6 top-6 md:left-10 md:right-10 md:top-10`} />
          <div className={`${railClass} left-6 right-6 bottom-6 md:left-10 md:right-10 md:bottom-10`} />
          <div className="absolute left-6 top-6 bottom-6 w-px bg-white/6 md:left-10 md:top-10 md:bottom-10" />
          <div className="absolute right-6 top-6 bottom-6 w-px bg-white/6 md:right-10 md:top-10 md:bottom-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[70%]"
          >
            <div
              className="mb-4 text-[9px] text-white/34 md:text-[10px]"
              style={metaStyle}
            >
              episode register
            </div>
            <h1
              className="text-[clamp(3rem,10vw,7.5rem)] font-black uppercase tracking-[0.06em]"
              style={{ ...serifStyle, color: titleColor }}
            >
              {title}
            </h1>
            <div className="mt-4 h-px w-28 bg-white/18" />
          </motion.div>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="self-end max-w-[72%] text-right"
            >
              <h2
                className="text-[clamp(2.6rem,8vw,6.9rem)] font-black uppercase tracking-[0.08em]"
                style={{ ...serifStyle, color: titleColor }}
              >
                {subtitle}
              </h2>
              <div
                className="mt-3 text-[9px] text-white/32 md:text-[10px]"
                style={metaStyle}
              >
                title card split
              </div>
            </motion.div>
          )}
        </div>
      );
    }

    if (align === "random") {
      return (
        <div
          ref={ref}
          className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg-base px-6 py-6 select-none ${className}`}
          {...rest}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_56%)]" />
          <div className="absolute left-6 right-6 top-6 h-px bg-white/10" />
          <div className="absolute left-6 right-6 bottom-6 h-px bg-white/10" />

          <div className="relative text-center">
            <div className="flex flex-wrap justify-center">
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: randomOffsets[index].x,
                    y: randomOffsets[index].y,
                    rotate: randomOffsets[index].rotate,
                  }}
                  transition={{ duration: 0.42, delay: index * 0.035 }}
                  className="inline-block text-[clamp(3.2rem,11vw,7rem)] font-black uppercase tracking-[0.07em]"
                  style={{ ...serifStyle, color: titleColor }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {subtitle && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.62 }}
                transition={{ delay: title.length * 0.035 + 0.2, duration: 0.4 }}
                className="mt-6 text-center text-[9px] text-white/42 md:text-[10px]"
                style={metaStyle}
              >
                {subtitle}
              </motion.h2>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-base px-6 py-10 select-none ${className}`}
        {...rest}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_58%)]" />
        <div className="absolute left-8 right-8 top-8 h-px bg-white/10" />
        <div className="absolute left-8 right-8 bottom-8 h-px bg-white/10" />
        <div
          className="absolute left-8 top-8 text-[9px] text-white/34"
          style={metaStyle}
        >
          title card
        </div>
        {supportTitle && (
          <div
            className="mb-4 text-center text-[9px] text-white/42 md:text-[10px]"
            style={metaStyle}
          >
            {supportTitle}
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-4 text-center text-[clamp(4rem,12vw,8.8rem)] font-black uppercase tracking-[0.06em]"
          style={{ ...serifStyle, color: titleColor }}
        >
          {dominantTitle}
        </motion.h1>
        <div className="mt-4 h-px w-32 bg-white/16" />

        {subtitle && !supportTitle && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.62 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-4 px-4 text-center text-[9px] text-white/42 md:text-[10px]"
            style={metaStyle}
          >
            {subtitle}
          </motion.h2>
        )}
      </div>
    );
  }
);
