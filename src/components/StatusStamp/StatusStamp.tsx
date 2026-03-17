"use client";

import { forwardRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CameraOverlayPlate } from "../_internal/CameraOverlayPlate";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface StatusStampProps extends MotionSafeHTMLAttributes {
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
  /** Whether to show a double border frame (implies bordered) */
  doubleBordered?: boolean;
  /** Full-screen overlay mode */
  fullScreen?: boolean;
  /** Whether the stamp should pulse on and off */
  blink?: boolean;
  className?: string;
}

const colorMap = {
  red: {
    text: "#FF2B1D",
    glow: "rgba(255, 43, 29, 0.18)",
    border: "#FF2B1D",
    bg: "rgba(255, 43, 29, 0.07)",
  },
  green: {
    text: "#00FF00",
    glow: "rgba(0, 255, 0, 0.16)",
    border: "#00FF00",
    bg: "rgba(0, 255, 0, 0.07)",
  },
  orange: {
    text: "#FF9900",
    glow: "rgba(255, 153, 0, 0.16)",
    border: "#FF9900",
    bg: "rgba(255, 153, 0, 0.07)",
  },
  cyan: {
    text: "#00F6FF",
    glow: "rgba(0, 246, 255, 0.16)",
    border: "#00F6FF",
    bg: "rgba(0, 246, 255, 0.07)",
  },
  magenta: {
    text: "#FF00FF",
    glow: "rgba(255, 0, 255, 0.18)",
    border: "#FF00FF",
    bg: "rgba(255, 0, 255, 0.07)",
  },
};

export const StatusStamp = forwardRef<HTMLDivElement, StatusStampProps>(function StatusStamp({
  text,
  visible = true,
  color = "red",
  rotation = -12,
  repeat = false,
  repeatRows = 3,
  repeatCols = 2,
  subtitle,
  bordered = false,
  doubleBordered = false,
  fullScreen = false,
  blink = false,
  className = "",
  ...rest
}, ref) {
  const colors = colorMap[color];
  const effectiveBordered = bordered || doubleBordered;
  const overlayVars = {
    "--overlay-main": colors.border,
    "--overlay-main-soft": colors.border,
    "--overlay-glow": colors.glow,
    "--overlay-surface": colors.bg,
  } as CSSProperties;

  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-nerv-black/90"
    : "relative flex items-center justify-center";
  const stampEase = [0.22, 1, 0.36, 1] as const;
  const singleStampTransition = blink
    ? {
        scale: { duration: 0.25, ease: stampEase },
        rotate: { duration: 0.25, ease: stampEase },
        opacity: {
          duration: 1.15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop" as const,
          ease: "easeInOut",
        },
      }
    : { duration: 0.25, ease: stampEase };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          {...rest}
          className={`${containerClass} ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
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
                      className="font-bold uppercase tracking-[0.16em] whitespace-nowrap"
                      style={{
                        fontFamily: "var(--font-nerv-display)",
                        fontSize: "clamp(1.4rem, 4.6vw, 3.4rem)",
                        color: colors.text,
                        textShadow: `0 0 8px ${colors.glow}`,
                        opacity: 0.88 - row * 0.1,
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
              animate={{
                scale: 1,
                rotate: rotation,
                opacity: blink ? [1, 0.38, 1] : 1,
              }}
              transition={singleStampTransition}
              data-blink={blink ? "true" : "false"}
            >
              {effectiveBordered ? (
                <div className="relative" style={overlayVars}>
                  {doubleBordered && (
                    <div
                      className="pointer-events-none absolute -inset-1.5 rounded-[0.85rem] border border-current opacity-80"
                      style={{
                        color: colors.border,
                        boxShadow: `0 0 0 1px ${colors.glow}`,
                      }}
                    />
                  )}
                  <CameraOverlayPlate color={color}>
                    <div className="camera-overlay-meta text-center">
                      {subtitle ? "status register" : "status"}
                    </div>
                    <div
                      className="camera-overlay-title text-center"
                      style={{
                        fontSize: "clamp(1.5rem, 5vw, 4rem)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {text}
                    </div>
                    {subtitle && <div className="camera-overlay-detail text-center">{subtitle}</div>}
                  </CameraOverlayPlate>
                </div>
              ) : (
                <span
                  className="font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-nerv-display)",
                    fontSize: "clamp(2rem, 8vw, 6rem)",
                    color: colors.text,
                    textShadow: `0 0 14px ${colors.glow}`,
                  }}
                >
                  {text}
                </span>
              )}

              {subtitle && !effectiveBordered && (
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
});
