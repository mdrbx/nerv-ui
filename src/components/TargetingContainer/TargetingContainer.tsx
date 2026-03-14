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

export const TargetingContainer = forwardRef<HTMLDivElement, TargetingContainerProps>(
  function TargetingContainer(
    {
      children,
      label,
      showCrosshairs = true,
      color = "orange",
      bracketSize = 18,
      className = "",
      ...rest
    },
    ref
  ) {
    const c = bracketColors[color];

    return (
      <motion.div
        ref={ref}
        {...rest}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`relative border bg-black/80 px-3 pb-3 pt-4 ${className}`}
        style={{
          borderColor: `${c}55`,
          boxShadow: `inset 0 0 0 1px ${c}12`,
        }}
      >
        {showCrosshairs && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(${c} 0.5px, transparent 0.5px),
                linear-gradient(90deg, ${c} 0.5px, transparent 0.5px)
              `,
              backgroundSize: "28px 28px, 28px 28px",
            }}
          />
        )}

        <div
          className="absolute left-0 right-0 top-[18px] h-px pointer-events-none"
          style={{ backgroundColor: `${c}55` }}
        />
        <div
          className="absolute left-0 right-0 bottom-[10px] h-px pointer-events-none"
          style={{ backgroundColor: `${c}22` }}
        />

        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderTop: `1px solid ${c}`,
            borderLeft: `1px solid ${c}`,
          }}
        />
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderTop: `1px solid ${c}`,
            borderRight: `1px solid ${c}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderBottom: `1px solid ${c}`,
            borderLeft: `1px solid ${c}`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderBottom: `1px solid ${c}`,
            borderRight: `1px solid ${c}`,
          }}
        />

        <div
          className="absolute right-3 top-[18px] flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30 pointer-events-none"
          style={{ fontFamily: "var(--font-eva-mono)" }}
        >
          <span>{color}</span>
          <span className="h-px w-6 bg-current opacity-40" />
        </div>

        {label && (
          <div
            className="absolute left-3 top-0 z-20 -translate-y-1/2 bg-black px-2 text-[10px] uppercase tracking-[0.24em] font-bold"
            style={{ color: c, fontFamily: "var(--font-eva-display)" }}
          >
            {label}
          </div>
        )}

        <div className={`relative z-10 ${label ? "mt-1.5" : ""}`}>{children}</div>
      </motion.div>
    );
  }
);
