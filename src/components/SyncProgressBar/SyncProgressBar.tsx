"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface SyncProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** Current value (0-100) */
  value: number;
  /** Label text */
  label?: string;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Number of blocks in the bar */
  blocks?: number;
  /** Height of each block */
  blockHeight?: number;
  /** Optional className */
  className?: string;
}

function getColorForValue(value: number): {
  filled: string;
  glow: string;
  text: string;
  blink: boolean;
} {
  if (value >= 95) {
    return { filled: "bg-eva-red", glow: "shadow-[0_0_6px_rgba(255,0,0,0.5)]", text: "text-eva-red", blink: true };
  }
  if (value >= 80) {
    return { filled: "bg-eva-orange", glow: "shadow-[0_0_6px_rgba(255,153,0,0.3)]", text: "text-eva-orange", blink: false };
  }
  if (value >= 50) {
    return { filled: "bg-eva-green", glow: "shadow-[0_0_6px_rgba(0,255,0,0.3)]", text: "text-eva-green", blink: false };
  }
  return { filled: "bg-eva-cyan", glow: "shadow-[0_0_6px_rgba(0,255,255,0.3)]", text: "text-eva-cyan", blink: false };
}

export const SyncProgressBar = forwardRef<HTMLDivElement, SyncProgressBarProps>(
  function SyncProgressBar(
    {
      value,
      label,
      showPercentage = true,
      blocks = 20,
      blockHeight = 16,
      className = "",
      ...rest
    },
    ref
  ) {
    const clamped = Math.max(0, Math.min(100, value));
    const filledBlocks = Math.round((clamped / 100) * blocks);
    const { filled, glow, text, blink } = getColorForValue(clamped);

    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className}`} {...rest}>
        {/* Header row */}
        <div className="flex items-center justify-between">
          {label && (
            <span
              className={`text-xs uppercase tracking-[0.2em] font-bold ${text}`}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span
              className={`text-xs font-mono font-bold ${text}`}
              style={{ fontFamily: "var(--font-eva-mono)" }}
              animate={blink ? { opacity: [1, 0.3, 1] } : {}}
              transition={blink ? { duration: 0.5, repeat: Infinity } : {}}
            >
              {clamped.toFixed(1)}%
            </motion.span>
          )}
        </div>

        {/* Progress blocks */}
        <div
          className="flex gap-[2px] bg-eva-dark-gray border border-eva-mid-gray p-1"
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: blocks }, (_, i) => {
            const isFilled = i < filledBlocks;
            return (
              <motion.div
                key={i}
                className={`
                  flex-1
                  ${isFilled ? `${filled} ${glow}` : "bg-eva-black/50 border border-eva-mid-gray/30"}
                `}
                style={{ height: blockHeight }}
                initial={false}
                animate={
                  isFilled && blink && i >= filledBlocks - 2
                    ? { opacity: [1, 0.4, 1] }
                    : { opacity: isFilled ? 1 : 0.3 }
                }
                transition={
                  isFilled && blink && i >= filledBlocks - 2
                    ? { duration: 0.5, repeat: Infinity, delay: i * 0.05 }
                    : { duration: 0.2 }
                }
              />
            );
          })}
        </div>

        {/* Bottom markers */}
        <div className="flex justify-between text-[9px] font-mono text-eva-mid-gray px-1">
          <span>000</span>
          <span>025</span>
          <span>050</span>
          <span>075</span>
          <span>100</span>
        </div>
      </div>
    );
  }
);
