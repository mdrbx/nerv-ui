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
    bg: "bg-nerv-red",
    subtextColor: "text-black/80",
    glow: "nerv-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#000000",
    stripeColor2: "#FF0000",
    indicatorColor: "bg-black",
    flicker: true,
    titleColor: "#000000",
  },
  warning: {
    bg: "bg-nerv-orange",
    subtextColor: "text-black/80",
    glow: "nerv-text-shadow-orange",
    borderColor: "#FF9900",
    stripeColor1: "#000000",
    stripeColor2: "#FF9900",
    indicatorColor: "bg-black",
    flicker: true,
    titleColor: "#000000",
  },
  info: {
    bg: "bg-nerv-cyan",
    subtextColor: "text-black/80",
    glow: "nerv-text-shadow-cyan",
    borderColor: "#00FFFF",
    stripeColor1: "#003333",
    stripeColor2: "#00FFFF",
    indicatorColor: "bg-black",
    flicker: false,
    titleColor: "#000000",
  },
  success: {
    bg: "bg-nerv-green",
    subtextColor: "text-black/80",
    glow: "nerv-text-shadow-green",
    borderColor: "#00FF00",
    stripeColor1: "#003300",
    stripeColor2: "#00FF00",
    indicatorColor: "bg-black",
    flicker: false,
    titleColor: "#000000",
  },
  critical: {
    bg: "bg-nerv-red",
    subtextColor: "text-white/80",
    glow: "nerv-text-shadow-red",
    borderColor: "#FF0000",
    stripeColor1: "#FF0000",
    stripeColor2: "#330000",
    indicatorColor: "bg-white",
    flicker: true,
    titleColor: "#FFFFFF",
  },
  contrast: {
    bg: "bg-nerv-black",
    subtextColor: "text-nerv-white/70",
    glow: "",
    borderColor: "#FFFFFF",
    stripeColor1: "#FFFFFF",
    stripeColor2: "#000000",
    indicatorColor: "bg-nerv-white",
    flicker: true,
    titleColor: "#E3DDD4",
  },
  disabled: {
    bg: "bg-nerv-mid-gray",
    subtextColor: "text-nerv-dark-gray/80",
    glow: "",
    borderColor: "#555555",
    stripeColor1: "#444444",
    stripeColor2: "#666666",
    indicatorColor: "bg-nerv-dark-gray",
    flicker: false,
    titleColor: "#111111",
  },
};

export const EmergencyBanner = forwardRef<HTMLDivElement, EmergencyBannerProps>(function EmergencyBanner({
  text = "EMERGENCY",
  subtext = "",
  visible = true,
  severity = "emergency",
  fullScreen = false,
  children = null,
  animateStripes = true,
  className = "",
  ...rest
}, ref) {
  const config = severityConfig[severity];

  const stripeFirstSize = 14;
  const stripeSecondSize = 25;

  const stripePanels = {
    topLeft: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        ${config.stripeColor1} 0 ${stripeFirstSize}px,
        ${config.stripeColor2} ${stripeFirstSize}px ${stripeSecondSize}px
      )`,
      backgroundPosition: "0 0",
    },
    topRight: {
      backgroundImage: `repeating-linear-gradient(
        135deg,
        ${config.stripeColor1} 0 ${stripeFirstSize}px,
        ${config.stripeColor2} ${stripeFirstSize}px ${stripeSecondSize}px
      )`,
      backgroundPosition: "0 0",
    },
    bottomLeft: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        ${config.stripeColor1} 0 ${stripeFirstSize}px,
        ${config.stripeColor2} ${stripeFirstSize}px ${stripeSecondSize}px
      )`,
      backgroundPosition: "0 0",
    },
    bottomRight: {
      backgroundImage: `repeating-linear-gradient(
        135deg,
        ${config.stripeColor1} 0 ${stripeFirstSize}px,
        ${config.stripeColor2} ${stripeFirstSize}px ${stripeSecondSize}px
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

          <div className="relative w-full overflow-hidden [container-type:inline-size]">
            <div className="relative h-5 overflow-hidden md:h-7">
              <div
                className={`nerv-banner-stripe absolute inset-y-0 left-0 ${animateStripes ? "nerv-banner-stripe-forward" : ""}`}
                style={{
                  ...stripePanels.topLeft,
                  width: "50%",
                }}
              />
              <div
                className={`nerv-banner-stripe absolute inset-y-0 right-0 ${animateStripes ? "nerv-banner-stripe-reverse" : ""}`}
                style={{
                  ...stripePanels.topRight,
                  width: "50%",
                }}
              />
            </div>

            <div
              className="relative  px-4 pb-5 pt-4 md:px-8 md:pb-6 md:pt-5"
              style={{ borderColor: "rgba(0,0,0,0.52)" }}
            >
              <div className="absolute left-0 right-0 top-0.5 h-1 bg-black md:left-0 md:right-0" />
              <div className="absolute left-0 right-0 bottom-0.5 h-1 bg-black md:left-0 md:right-0" />
                
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
                  text-center text-[clamp(2rem,12cqw,12rem)]
                  font-black uppercase leading-[0.9] tracking-[0.02em]
                  select-none
                `}
                style={{
                  fontFamily: "var(--font-nerv-display)",
                  color: config.titleColor,
                  textShadow:
                    severity === "emergency" || severity === "warning"
                      ? "0 0 1px rgba(0,0,0,0.22)"
                      : undefined,
                }}
              >
                {text}
              </motion.h1>

              
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className={`mx-auto mt-2.5 max-w-[72ch] px-3 text-center text-[clamp(8px,2.4cqw,11px)] leading-[1.36] md:mt-3 md:leading-[1.42] uppercase tracking-[clamp(0.18em,0.5cqw,0.24em)] ${config.subtextColor}`}
                  style={{ fontFamily: "var(--font-nerv-display)" }}
                >
                  {subtext}
                </motion.p>
              

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
                className={`nerv-banner-stripe absolute inset-y-0 left-0 ${animateStripes ? "nerv-banner-stripe-forward" : ""}`}
                style={{
                  ...stripePanels.bottomLeft,
                  width: "50%",
                }}
              />
              <div
                className={`nerv-banner-stripe absolute inset-y-0 right-0 ${animateStripes ? "nerv-banner-stripe-reverse" : ""}`}
                style={{
                  ...stripePanels.bottomRight,
                  width: "50%",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
