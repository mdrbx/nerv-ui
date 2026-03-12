"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export interface CountdownTimerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** Duration in seconds (e.g. 300 for 5 minutes) */
  initialSeconds: number;
  /** Callback when the timer reaches 0 */
  onExpire?: () => void;
  /** Optional className */
  className?: string;
}

/** Format milliseconds into MM:SS:ms display */
function formatTime(totalMs: number): string {
  const clamped = Math.max(0, totalMs);
  const minutes = Math.floor(clamped / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);
  const ms = Math.floor((clamped % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
}

/** Color class by remaining time */
function getTimerColor(remainingMs: number): string {
  if (remainingMs <= 10000) return "text-eva-red";
  if (remainingMs <= 60000) return "text-eva-orange";
  return "text-eva-lcd-green";
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  function CountdownTimer(
    {
      initialSeconds,
      onExpire,
      className = "",
      ...rest
    },
    ref
  ) {
    const totalMs = initialSeconds * 1000;
    const [remaining, setRemaining] = useState(totalMs);
    const onExpireRef = useRef(onExpire);
    onExpireRef.current = onExpire;
    const firedRef = useRef(false);

    useEffect(() => {
      if (remaining <= 0) return;

      const interval = setInterval(() => {
        setRemaining((prev) => {
          const next = prev - 50;
          if (next <= 0) {
            if (!firedRef.current) {
              firedRef.current = true;
              onExpireRef.current?.();
            }
            return 0;
          }
          return next;
        });
      }, 50);

      return () => clearInterval(interval);
    }, [remaining]);

    // Reset when initialSeconds changes
    useEffect(() => {
      setRemaining(initialSeconds * 1000);
      firedRef.current = false;
    }, [initialSeconds]);

    const color = getTimerColor(remaining);
    const isUrgent = remaining <= 10000 && remaining > 0;
    const isCritical = remaining <= 60000 && remaining > 10000;
    const percentage = totalMs > 0 ? (remaining / totalMs) * 100 : 0;

    return (
      <div ref={ref} className={`bg-eva-black border border-eva-mid-gray ${className}`} {...rest}>
        {/* Header -- INTERNAL BATTERY */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-eva-mid-gray bg-eva-dark-gray">
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            INTERNAL BATTERY
          </span>
          <span className={`text-[10px] font-mono ${color}`}>
            {percentage.toFixed(1)}%
          </span>
        </div>

        {/* Timer display -- MM:SS:ms */}
        <div className="flex items-center justify-center py-6 px-4">
          <motion.div
            className={`text-5xl md:text-6xl font-bold tabular-nums ${color}`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
            animate={
              isUrgent
                ? { opacity: [1, 0.2, 1] }
                : isCritical
                  ? { opacity: [1, 0.6, 1] }
                  : {}
            }
            transition={
              isUrgent
                ? { duration: 0.25, repeat: Infinity }
                : isCritical
                  ? { duration: 0.8, repeat: Infinity }
                  : {}
            }
          >
            {formatTime(remaining)}
          </motion.div>
        </div>

        {/* Battery bar */}
        <div className="px-3 pb-3">
          <div className="h-3 bg-eva-dark-gray border border-eva-mid-gray flex gap-[1px] p-[1px]">
            {Array.from({ length: 20 }, (_, i) => {
              const blockPct = ((i + 1) / 20) * 100;
              const filled = percentage >= blockPct;
              const blockColor =
                blockPct > 75
                  ? "bg-eva-lcd-green"
                  : blockPct > 25
                    ? "bg-eva-orange"
                    : "bg-eva-red";

              return (
                <div
                  key={i}
                  className={`flex-1 ${filled ? blockColor : "bg-eva-black/50"}`}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
          <span>{remaining > 0 ? "ACTIVE" : "EXPIRED"}</span>
          <span>ELAPSED: {formatTime(totalMs - remaining)}</span>
        </div>
      </div>
    );
  }
);
