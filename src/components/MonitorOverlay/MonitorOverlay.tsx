"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface MonitorOverlayProps extends MotionSafeHTMLAttributes {
  /** Color theme for guides and rails */
  color?: "orange" | "green" | "cyan" | "red";
  /** Overall overlay opacity */
  opacity?: number;
  /** Background density */
  density?: "sparse" | "normal" | "dense";
  /** Overlay treatment */
  variant?: "monitor" | "alert";
  /** Optional upper-left readout */
  label?: string;
  /** Optional lower-right readout */
  secondaryLabel?: string;
  /** Animate the scan sweep */
  animated?: boolean;
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    text: "#ff9900",
    scan: "rgba(255, 153, 0, 0.08)",
    guide: "rgba(255, 153, 0, 0.16)",
    frame: "rgba(255, 153, 0, 0.26)",
    inner: "rgba(255, 153, 0, 0.08)",
    glow: "rgba(255, 153, 0, 0.18)",
    sweep: "rgba(255, 153, 0, 0.22)",
  },
  green: {
    text: "#00ff00",
    scan: "rgba(0, 255, 0, 0.08)",
    guide: "rgba(0, 255, 0, 0.15)",
    frame: "rgba(0, 255, 0, 0.24)",
    inner: "rgba(0, 255, 0, 0.08)",
    glow: "rgba(0, 255, 0, 0.16)",
    sweep: "rgba(0, 255, 0, 0.22)",
  },
  cyan: {
    text: "#00f6ff",
    scan: "rgba(0, 246, 255, 0.08)",
    guide: "rgba(0, 246, 255, 0.15)",
    frame: "rgba(0, 246, 255, 0.24)",
    inner: "rgba(0, 246, 255, 0.08)",
    glow: "rgba(0, 246, 255, 0.16)",
    sweep: "rgba(0, 246, 255, 0.22)",
  },
  red: {
    text: "#ff2b1d",
    scan: "rgba(255, 43, 29, 0.09)",
    guide: "rgba(255, 43, 29, 0.18)",
    frame: "rgba(255, 43, 29, 0.28)",
    inner: "rgba(255, 43, 29, 0.09)",
    glow: "rgba(255, 43, 29, 0.18)",
    sweep: "rgba(255, 43, 29, 0.24)",
  },
};

const densityMap = {
  sparse: 24,
  normal: 18,
  dense: 12,
};

const tickOffsets = [18, 30, 42, 58, 70, 82];

export const MonitorOverlay = forwardRef<HTMLDivElement, MonitorOverlayProps>(
  function MonitorOverlay(
    {
      color = "orange",
      opacity = 0.34,
      density = "normal",
      variant = "monitor",
      label,
      secondaryLabel,
      animated = true,
      className = "",
      style,
      ...rest
    },
    ref
  ) {
    const palette = colorMap[color];
    const spacing = densityMap[density];
    const rootStyle = {
      ...style,
      opacity: style?.opacity ?? opacity,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-slot="monitor-overlay"
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        style={rootStyle}
        {...rest}
      >
        {variant === "alert" && (
          <>
            <div
              data-slot="alert-band"
              className="absolute left-0 right-0 top-0 h-2 hazard-stripes-black opacity-45"
            />
            <div
              data-slot="alert-band"
              className="absolute left-0 right-0 bottom-0 h-2 hazard-stripes-black opacity-45"
            />
          </>
        )}

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                180deg,
                transparent 0,
                transparent ${spacing - 1}px,
                ${palette.scan} ${spacing - 1}px,
                ${palette.scan} ${spacing}px
              ),
              linear-gradient(
                90deg,
                transparent 0,
                transparent calc(12% - 0.5px),
                ${palette.guide} calc(12% - 0.5px),
                ${palette.guide} calc(12% + 0.5px),
                transparent calc(12% + 0.5px),
                transparent calc(50% - 0.5px),
                ${palette.guide} calc(50% - 0.5px),
                ${palette.guide} calc(50% + 0.5px),
                transparent calc(50% + 0.5px),
                transparent calc(88% - 0.5px),
                ${palette.guide} calc(88% - 0.5px),
                ${palette.guide} calc(88% + 0.5px),
                transparent calc(88% + 0.5px)
              ),
              linear-gradient(
                180deg,
                transparent 0,
                transparent calc(16% - 0.5px),
                ${palette.guide} calc(16% - 0.5px),
                ${palette.guide} calc(16% + 0.5px),
                transparent calc(16% + 0.5px),
                transparent calc(50% - 0.5px),
                ${palette.guide} calc(50% - 0.5px),
                ${palette.guide} calc(50% + 0.5px),
                transparent calc(50% + 0.5px),
                transparent calc(84% - 0.5px),
                ${palette.guide} calc(84% - 0.5px),
                ${palette.guide} calc(84% + 0.5px),
                transparent calc(84% + 0.5px)
              ),
              radial-gradient(circle at center, ${palette.glow} 0, transparent 58%)
            `,
          }}
        />

        <div
          className="absolute inset-[8%] border"
          style={{
            borderColor: palette.frame,
            boxShadow: `inset 0 0 0 1px ${palette.inner}`,
          }}
        />

        <div
          className="absolute left-[9%] right-[9%] top-[14%] h-px"
          style={{ backgroundColor: palette.frame }}
        />
        <div
          className="absolute left-[9%] right-[9%] bottom-[14%] h-px"
          style={{ backgroundColor: palette.frame }}
        />
        <div
          className="absolute top-[9%] bottom-[9%] left-[14%] w-px"
          style={{ backgroundColor: palette.frame }}
        />
        <div
          className="absolute top-[9%] bottom-[9%] right-[14%] w-px"
          style={{ backgroundColor: palette.frame }}
        />

        <div
          className="absolute left-[7.5%] top-[7.5%] h-7 w-7 border-l border-t"
          style={{ borderColor: palette.text }}
        />
        <div
          className="absolute right-[7.5%] top-[7.5%] h-7 w-7 border-r border-t"
          style={{ borderColor: palette.text }}
        />
        <div
          className="absolute left-[7.5%] bottom-[7.5%] h-7 w-7 border-b border-l"
          style={{ borderColor: palette.text }}
        />
        <div
          className="absolute right-[7.5%] bottom-[7.5%] h-7 w-7 border-b border-r"
          style={{ borderColor: palette.text }}
        />

        {tickOffsets.map((offset) => (
          <div
            key={`left-${offset}`}
            className="absolute left-[8.8%] h-px w-4"
            style={{
              top: `${offset}%`,
              backgroundColor: palette.frame,
            }}
          />
        ))}
        {tickOffsets.map((offset) => (
          <div
            key={`right-${offset}`}
            className="absolute right-[8.8%] h-px w-4"
            style={{
              top: `${offset}%`,
              backgroundColor: palette.frame,
            }}
          />
        ))}

        {label && (
          <div
            data-slot="monitor-label"
            className="absolute left-[10%] top-[14%] -translate-y-1/2 bg-black/85 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{
              color: palette.text,
              fontFamily: "var(--font-nerv-mono)",
              boxShadow: `0 0 0 1px ${palette.frame} inset`,
            }}
          >
            {label}
          </div>
        )}

        {secondaryLabel && (
          <div
            data-slot="monitor-secondary-label"
            className="absolute bottom-[14%] right-[10%] translate-y-1/2 bg-black/85 px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
            style={{
              color: palette.text,
              fontFamily: "var(--font-nerv-mono)",
              boxShadow: `0 0 0 1px ${palette.frame} inset`,
            }}
          >
            {secondaryLabel}
          </div>
        )}

        {animated && (
          <motion.div
            data-slot="monitor-sweep"
            className="absolute inset-x-[10%] h-24"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${palette.sweep} 44%, transparent 100%)`,
              filter: "blur(2px)",
              mixBlendMode: "screen",
            }}
            animate={{ top: ["-18%", "104%"] }}
            transition={{ duration: 5.6, ease: "linear", repeat: Infinity }}
          />
        )}
      </div>
    );
  }
);
