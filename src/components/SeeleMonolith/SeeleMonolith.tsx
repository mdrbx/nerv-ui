"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface SeeleMonolithProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "id"> {
  /** Monolith identifier number (e.g. "01") */
  id: string;
  /** Whether the monolith is currently speaking */
  isSpeaking?: boolean;
  /** Optional className */
  className?: string;
}

/** A single animated equalizer bar */
function EqualizerBar({ delay }: { delay: number }) {
  return (
    <motion.div
      className="w-[3px] bg-eva-orange"
      animate={{
        height: ["4px", "16px", "6px", "14px", "4px"],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export const SeeleMonolith = forwardRef<HTMLDivElement, SeeleMonolithProps>(
  function SeeleMonolith(
    {
      id,
      isSpeaking = false,
      className = "",
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={`
          relative flex flex-col items-center justify-center
          bg-bg-base min-h-[160px] min-w-[100px]
          ${className}
        `}
        style={{
          boxShadow: "inset 0 0 12px rgba(51, 51, 51, 0.5), 0 0 1px rgba(51, 51, 51, 0.3)",
          border: "1px solid rgba(51, 51, 51, 0.35)",
        }}
        {...rest}
      >
        {/* SEELE ID -- top */}
        <span
          className="absolute top-3 text-[10px] uppercase tracking-[0.25em] font-bold text-eva-mid-gray/50 font-mono"
        >
          SEELE {id}
        </span>

        {/* SOUND ONLY -- center, condensed sans-serif, orange/red */}
        <span
          className="text-sm font-bold uppercase tracking-[0.15em] text-eva-orange"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          SOUND ONLY
        </span>

        {/* Equalizer bars -- below SOUND ONLY when speaking */}
        {isSpeaking && (
          <div className="flex items-end gap-[2px] mt-3 h-[18px]">
            <EqualizerBar delay={0} />
            <EqualizerBar delay={0.08} />
            <EqualizerBar delay={0.16} />
            <EqualizerBar delay={0.1} />
          </div>
        )}

        {/* SEELE ID -- bottom */}
        <span
          className="absolute bottom-3 text-[9px] font-mono text-eva-mid-gray/30 tracking-wider"
        >
          {id}
        </span>
      </div>
    );
  }
);
