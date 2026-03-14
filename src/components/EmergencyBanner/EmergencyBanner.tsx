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
  /** Animate the mirrored hazard bands */
  animateStripes?: boolean;
  /** Optional className override */
  className?: string;
}

const severityConfig = {
  emergency: {
    bg: "bg-eva-red",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#000000",
    stripeColor2: "#FF0000",
    indicatorColor: "bg-black",
    flicker: true,
    titleColor: "#000000",
  },
  warning: {
    bg: "bg-eva-orange",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-orange",
    borderColor: "#FF9900",
    stripeColor1: "#000000",
    stripeColor2: "#FF9900",
    indicatorColor: "bg-black",
    flicker: true,
    titleColor: "#000000",
  },
  info: {
    bg: "bg-eva-cyan",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-cyan",
    borderColor: "#00FFFF",
    stripeColor1: "#003333",
    stripeColor2: "#00FFFF",
    indicatorColor: "bg-black",
    flicker: false,
    titleColor: "#000000",
  },
  success: {
    bg: "bg-eva-green",
    subtextColor: "text-black/80",
    glow: "eva-text-shadow-green",
    borderColor: "#00FF00",
    stripeColor1: "#003300",
    stripeColor2: "#00FF00",
    indicatorColor: "bg-black",
    flicker: false,
    titleColor: "#000000",
  },
  critical: {
    bg: "bg-eva-red",
    subtextColor: "text-white/80",
    glow: "eva-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#FF0000",
    stripeColor2: "#330000",
    indicatorColor: "bg-white",
    flicker: true,
    titleColor: "#FFFFFF",
  },
  contrast: {
    bg: "bg-eva-black",
    subtextColor: "text-eva-white/70",
    glow: "",
    borderColor: "#FFFFFF",
    stripeColor1: "#FFFFFF",
    stripeColor2: "#000000",
    indicatorColor: "bg-eva-white",
    flicker: true,
    titleColor: "#E3DDD4",
  },
  disabled: {
    bg: "bg-eva-mid-gray",
    subtextColor: "text-eva-dark-gray/80",
    glow: "",
    borderColor: "#555555",
    stripeColor1: "#444444",
    stripeColor2: "#666666",
    indicatorColor: "bg-eva-dark-gray",
    flicker: false,
    titleColor: "#111111",
  },
};

export const EmergencyBanner = forwardRef<HTMLDivElement, EmergencyBannerProps>(function EmergencyBanner({
  text = "EMERGENCY",
  subtext,
  visible = true,
  severity = "emergency",
  fullScreen = false,
  children,
  animateStripes = true,
  className = "",
  ...rest
}, ref) {
  const config = severityConfig[severity];

  const stripePanels = {
    topLeft: {
      backgroundImage: `repeating-linear-gradient(
        135deg,
        ${config.stripeColor1} 0 18px,
        ${config.stripeColor2} 18px 36px
      )`,
      backgroundPosition: "0 0",
    },
    topRight: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        ${config.stripeColor1} 0 18px,
        ${config.stripeColor2} 18px 36px
      )`,
      backgroundPosition: "0 0",
    },
    bottomLeft: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        ${config.stripeColor1} 0 18px,
        ${config.stripeColor2} 18px 36px
      )`,
      backgroundPosition: "0 0",
    },
    bottomRight: {
      backgroundImage: `repeating-linear-gradient(
        135deg,
        ${config.stripeColor1} 0 18px,
        ${config.stripeColor2} 18px 36px
      )`,
      backgroundPosition: "0 0",
    },
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
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 ${config.bg} opacity-95`} />
            <div
              className="absolute inset-0 opacity-16"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent 0 3px,
                  rgba(0,0,0,0.42) 3px 6px
                )`,
              }}
            />
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="relative h-5 overflow-hidden md:h-7">
              <div
                className={`eva-banner-stripe absolute inset-y-0 left-0 ${animateStripes ? "eva-banner-stripe-forward" : ""}`}
                style={{
                  ...stripePanels.topLeft,
                  width: "50%",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)",
                }}
              />
              <div
                className={`eva-banner-stripe absolute inset-y-0 right-0 ${animateStripes ? "eva-banner-stripe-reverse" : ""}`}
                style={{
                  ...stripePanels.topRight,
                  width: "50%",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 18px 100%)",
                }}
              />
            </div>

            <div
              className="relative border-y-[3px] px-4 pb-5 pt-4 md:px-8 md:pb-6 md:pt-5"
              style={{ borderColor: "rgba(0,0,0,0.52)" }}
            >
              <div className="absolute inset-y-0 left-2 w-px bg-black/45 md:left-3" />
              <div className="absolute inset-y-0 right-2 w-px bg-black/45 md:right-3" />
              <div className="absolute left-4 right-4 top-2 h-[2px] bg-black/42 md:left-8 md:right-8" />
              <div className="absolute left-4 right-4 bottom-2 h-[2px] bg-black/42 md:left-8 md:right-8" />

              <motion.h1
                animate={
                  config.flicker
                    ? { opacity: [0.96, 0.7, 1, 0.82, 1] }
                    : {}
                }
                transition={
                  config.flicker
                    ? { duration: 1.35, repeat: Infinity, ease: "linear" }
                    : {}
                }
                className={`
                  text-center text-[clamp(5rem,18vw,12rem)]
                  font-black uppercase leading-[0.9] tracking-[0.02em]
                  select-none
                `}
                style={{
                  fontFamily: "var(--font-eva-display)",
                  color: config.titleColor,
                  textShadow:
                    severity === "emergency" || severity === "warning"
                      ? "0 0 1px rgba(0,0,0,0.22)"
                      : undefined,
                }}
              >
                {text}
              </motion.h1>

              {subtext && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className={`mx-auto mt-2.5 max-w-[72ch] px-3 text-center text-[8px] leading-[1.36] md:mt-3 md:text-[11px] md:leading-[1.42] uppercase tracking-[0.18em] md:tracking-[0.24em] ${config.subtextColor}`}
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {subtext}
                </motion.p>
              )}

              {children && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="relative z-10 mt-3 flex justify-center"
                >
                  {children}
                </motion.div>
              )}
            </div>

            <div className="relative h-5 overflow-hidden md:h-7">
              <div
                className={`eva-banner-stripe absolute inset-y-0 left-0 ${animateStripes ? "eva-banner-stripe-forward" : ""}`}
                style={{
                  ...stripePanels.bottomLeft,
                  width: "50%",
                  clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 100%, 0 100%)",
                }}
              />
              <div
                className={`eva-banner-stripe absolute inset-y-0 right-0 ${animateStripes ? "eva-banner-stripe-reverse" : ""}`}
                style={{
                  ...stripePanels.bottomRight,
                  width: "50%",
                  clipPath: "polygon(18px 0, 100% 0, 100% 100%, 0 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
