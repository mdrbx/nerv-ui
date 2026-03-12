"use client";

import { type ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface TargetingContainerProps extends MotionSafeHTMLAttributes {
  children: ReactNode;
  /** Label displayed at the top of the container */
  label?: string;
  /** Show crosshair grid background */
  showCrosshairs?: boolean;
  /** Color theme for brackets and grid */
  color?: "orange" | "green" | "cyan" | "red";
  /** Size of L-brackets in pixels */
  bracketSize?: number;
  /** Optional className */
  className?: string;
}

const bracketColors = {
  orange: "#FF9900",
  green: "#00FF00",
  cyan: "#00FFFF",
  red: "#FF0000",
};

export const TargetingContainer = forwardRef<HTMLDivElement, TargetingContainerProps>(function TargetingContainer({
  children,
  label,
  showCrosshairs = true,
  color = "orange",
  bracketSize = 24,
  className = "",
  ...rest
}, ref) {
  const c = bracketColors[color];

  return (
    <motion.div
      ref={ref}
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative p-6 ${className}`}
    >
      {/* Crosshair background grid */}
      {showCrosshairs && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `
              radial-gradient(circle, ${c} 1px, transparent 1px),
              linear-gradient(${c} 0.5px, transparent 0.5px),
              linear-gradient(90deg, ${c} 0.5px, transparent 0.5px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px",
            backgroundPosition: "20px 20px, 0 0, 0 0",
          }}
        />
      )}

      {/* L-Brackets — 4 corners */}
      {/* Top-left */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderTop: `2px solid ${c}`,
          borderLeft: `2px solid ${c}`,
        }}
      />
      {/* Top-right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderTop: `2px solid ${c}`,
          borderRight: `2px solid ${c}`,
        }}
      />
      {/* Bottom-left */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderBottom: `2px solid ${c}`,
          borderLeft: `2px solid ${c}`,
        }}
      />
      {/* Bottom-right */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: bracketSize,
          height: bracketSize,
          borderBottom: `2px solid ${c}`,
          borderRight: `2px solid ${c}`,
        }}
      />

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <div className="relative w-12 h-12">
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{ backgroundColor: c }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: c }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border"
            style={{ borderColor: c }}
          />
        </div>
      </div>

      {/* Label */}
      {label && (
        <div
          className="absolute -top-3 left-6 px-2 bg-eva-black text-xs uppercase tracking-[0.2em] font-bold"
          style={{ color: c, fontFamily: "var(--font-eva-display)" }}
        >
          {label}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});
