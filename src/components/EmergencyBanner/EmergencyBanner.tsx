"use client";

import { type ReactNode, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface EmergencyBannerProps extends MotionSafeHTMLAttributes {
  /** The alert text to display (e.g. "EMERGENCY", "WARNING", "REFUSED") */
  text?: string;
  /** Additional subtext below the main alert */
  subtext?: string;
  /** Whether the banner is visible */
  visible?: boolean;
  /** Visual severity */
  severity?:
    | "emergency"
    | "warning"
    | "info"
    | "success"
    | "critical"
    | "contrast"
    | "disabled";
  /** Render as full-screen overlay or inline container */
  fullScreen?: boolean;
  /** Optional children rendered below the subtext (e.g. links, buttons) */
  children?: ReactNode;
  /** Optional className override */
  className?: string;
}

const severityConfig = {
  emergency: {
    bg: "bg-eva-red",
    text: "text-eva-black",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#000000",
    stripeColor2: "#FF0000",
    indicatorColor: "bg-black",
    flicker: true,
  },
  warning: {
    bg: "bg-eva-orange",
    text: "text-eva-black",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-orange",
    borderColor: "#FF9900",
    stripeColor1: "#000000",
    stripeColor2: "#FF9900",
    indicatorColor: "bg-black",
    flicker: true,
  },
  info: {
    bg: "bg-eva-cyan",
    text: "text-eva-black",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-cyan",
    borderColor: "#00FFFF",
    stripeColor1: "#003333",
    stripeColor2: "#00FFFF",
    indicatorColor: "bg-black",
    flicker: false,
  },
  success: {
    bg: "bg-eva-green",
    text: "text-eva-black",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-green",
    borderColor: "#00FF00",
    stripeColor1: "#003300",
    stripeColor2: "#00FF00",
    indicatorColor: "bg-black",
    flicker: false,
  },
  critical: {
    bg: "bg-eva-red",
    text: "text-white",
    subtextColor: "text-white/80",
    glow: "eva-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#FF0000",
    stripeColor2: "#330000",
    indicatorColor: "bg-white",
    flicker: true,
  },
  contrast: {
    bg: "bg-eva-black",
    text: "text-eva-white",
    subtextColor: "text-eva-white/70",
    glow: "",
    borderColor: "#FFFFFF",
    stripeColor1: "#FFFFFF",
    stripeColor2: "#000000",
    indicatorColor: "bg-eva-white",
    flicker: true,
  },
  disabled: {
    bg: "bg-eva-mid-gray",
    text: "text-eva-dark-gray",
    subtextColor: "text-eva-dark-gray/80",
    glow: "",
    borderColor: "#555555",
    stripeColor1: "#444444",
    stripeColor2: "#666666",
    indicatorColor: "bg-eva-dark-gray",
    flicker: false,
  },
};

export const EmergencyBanner = forwardRef<HTMLDivElement, EmergencyBannerProps>(function EmergencyBanner({
  text = "EMERGENCY",
  subtext,
  visible = true,
  severity = "emergency",
  fullScreen = false,
  children,
  className = "",
  ...rest
}, ref) {
  const config = severityConfig[severity];

  const stripeStyle = {
    background: `repeating-linear-gradient(
      -45deg,
      ${config.stripeColor1},
      ${config.stripeColor1} 8px,
      ${config.stripeColor2} 8px,
      ${config.stripeColor2} 16px
    )`,
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          {...rest}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`
            ${fullScreen ? "fixed inset-0 z-50 flex items-center justify-center" : "relative w-full"}
            ${className}
          `}
          role="alert"
          aria-live="assertive"
        >
          {/* Background fill */}
          <div className={`absolute inset-0 ${config.bg} opacity-90`} />

          {/* Animated scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(0,0,0,0.4) 3px,
                rgba(0,0,0,0.4) 6px
              )`,
            }}
          />

          {/* Top hazard stripe */}
          <div className="relative h-4" style={stripeStyle} />

          {/* Content area */}
          <div className="relative px-6 py-8 flex flex-col items-center justify-center min-h-[120px]">
            {/* Decorative corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-black opacity-60" />
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-black opacity-60" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-black opacity-60" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-black opacity-60" />

            {/* Main flickering text */}
            <motion.h1
              animate={
                config.flicker
                  ? { opacity: [1, 0.3, 1, 0.5, 1, 1, 0.2, 1] }
                  : {}
              }
              transition={
                config.flicker
                  ? { duration: 1.5, repeat: Infinity, ease: "linear" }
                  : {}
              }
              className={`
                font-[var(--font-eva-display)] text-5xl md:text-7xl lg:text-8xl
                font-bold uppercase tracking-[0.2em]
                ${config.text} select-none
              `}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {text}
            </motion.h1>

            {/* Subtext */}
            {subtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-3 text-lg md:text-xl uppercase tracking-[0.3em] ${config.subtextColor} font-mono`}
              >
                {subtext}
              </motion.p>
            )}

            {/* Children slot (e.g. links, buttons) */}
            {children && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 relative z-10"
              >
                {children}
              </motion.div>
            )}

            {/* Blinking side indicators */}
            <motion.div
              className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1"
              animate={config.flicker ? { opacity: [1, 0, 1] } : {}}
              transition={
                config.flicker
                  ? { duration: 0.8, repeat: Infinity }
                  : {}
              }
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-2 h-2 ${config.indicatorColor}`} />
              ))}
            </motion.div>
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1"
              animate={config.flicker ? { opacity: [1, 0, 1] } : {}}
              transition={
                config.flicker
                  ? { duration: 0.8, repeat: Infinity }
                  : {}
              }
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-2 h-2 ${config.indicatorColor}`} />
              ))}
            </motion.div>
          </div>

          {/* Bottom hazard stripe */}
          <div className="relative h-4" style={stripeStyle} />
        </motion.div>
      )}
    </AnimatePresence>
  );
});
