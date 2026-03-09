"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface EvaStatusStampProps {
  /** The status text to display (e.g. "REFUSED", "APPROVED", "LOST") */
  text: string;
  /** Whether the stamp is visible */
  visible?: boolean;
  /** Color theme */
  color?: "red" | "green" | "orange" | "cyan" | "magenta";
  /** Rotation angle in degrees */
  rotation?: number;
  /** Whether the text repeats in a grid pattern */
  repeat?: boolean;
  /** Number of rows when repeat is true */
  repeatRows?: number;
  /** Number of columns when repeat is true */
  repeatCols?: number;
  /** Optional subtitle below the main text */
  subtitle?: string;
  /** Whether to show a border frame */
  bordered?: boolean;
  /** Full-screen overlay mode */
  fullScreen?: boolean;
  className?: string;
}

const colorMap = {
  red: {
    text: "#FF0000",
    glow: "rgba(255, 0, 0, 0.3)",
    border: "#FF0000",
    bg: "rgba(255, 0, 0, 0.05)",
  },
  green: {
    text: "#00FF00",
    glow: "rgba(0, 255, 0, 0.3)",
    border: "#00FF00",
    bg: "rgba(0, 255, 0, 0.05)",
  },
  orange: {
    text: "#FF9900",
    glow: "rgba(255, 153, 0, 0.3)",
    border: "#FF9900",
    bg: "rgba(255, 153, 0, 0.05)",
  },
  cyan: {
    text: "#00FFFF",
    glow: "rgba(0, 255, 255, 0.3)",
    border: "#00FFFF",
    bg: "rgba(0, 255, 255, 0.05)",
  },
  magenta: {
    text: "#FF00FF",
    glow: "rgba(255, 0, 255, 0.3)",
    border: "#FF00FF",
    bg: "rgba(255, 0, 255, 0.05)",
  },
};

export function EvaStatusStamp({
  text,
  visible = true,
  color = "red",
  rotation = -12,
  repeat = false,
  repeatRows = 3,
  repeatCols = 2,
  subtitle,
  bordered = false,
  fullScreen = false,
  className = "",
}: EvaStatusStampProps) {
  const colors = colorMap[color];

  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-eva-black/90"
    : "relative flex items-center justify-center";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${containerClass} ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ minHeight: fullScreen ? undefined : "200px" }}
        >
          {repeat ? (
            /* ── Repeating grid pattern ── */
            <motion.div
              className="flex flex-col items-center justify-center gap-2"
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {Array.from({ length: repeatRows }).map((_, row) => (
                <div key={row} className="flex gap-8">
                  {Array.from({ length: repeatCols }).map((_, col) => (
                    <span
                      key={col}
                      className="font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{
                        fontFamily: "var(--font-eva-display)",
                        fontSize: "clamp(2rem, 6vw, 5rem)",
                        color: colors.text,
                        textShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`,
                        opacity: 0.9 - row * 0.1,
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          ) : (
            /* ── Single centered stamp ── */
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ scale: 2, opacity: 0, rotate: rotation - 5 }}
              animate={{ scale: 1, opacity: 1, rotate: rotation }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {bordered ? (
                <div
                  className="px-8 py-4"
                  style={{
                    border: `3px solid ${colors.border}`,
                    backgroundColor: colors.bg,
                    boxShadow: `0 0 20px ${colors.glow}, inset 0 0 20px ${colors.bg}`,
                  }}
                >
                  <span
                    className="font-bold uppercase tracking-[0.15em] whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-eva-display)",
                      fontSize: "clamp(2rem, 8vw, 6rem)",
                      color: colors.text,
                      textShadow: `0 0 10px ${colors.glow}`,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ) : (
                <span
                  className="font-bold uppercase tracking-[0.15em] whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-eva-display)",
                    fontSize: "clamp(3rem, 12vw, 10rem)",
                    color: colors.text,
                    textShadow: `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}`,
                  }}
                >
                  {text}
                </span>
              )}

              {subtitle && (
                <motion.span
                  className="mt-2 font-mono text-sm uppercase tracking-[0.3em]"
                  style={{ color: colors.text, opacity: 0.6 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {subtitle}
                </motion.span>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
