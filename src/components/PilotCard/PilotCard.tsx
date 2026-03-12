"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface PilotCardField {
  label: string;
  value: string;
  status?: "ok" | "warning" | "critical" | "unknown";
}

export interface PilotCardProps extends MotionSafeHTMLAttributes {
  /** Pilot designation (e.g. "FIRST.C", "THIRD.C") */
  designation: string;
  /** Pilot name */
  name: string;
  /** Unit assignment (e.g. "EVA-01", "EVA-00") */
  unit?: string;
  /** Status fields */
  fields?: PilotCardField[];
  /** Connection/plug number */
  plugNumber?: string;
  /** Overall check status */
  checkStatus?: "O.K." | "ERROR" | "OFFLINE" | "SYNC";
  /** Color theme */
  color?: "red" | "cyan" | "green" | "orange";
  /** Optional image URL for the pilot */
  imageUrl?: string;
  /** Whether to show animated entry */
  animated?: boolean;
  className?: string;
}

const colorMap = {
  red: { main: "#FF0000", glow: "rgba(255, 0, 0, 0.3)", dim: "rgba(255, 0, 0, 0.1)" },
  cyan: { main: "#00FFFF", glow: "rgba(0, 255, 255, 0.3)", dim: "rgba(0, 255, 255, 0.1)" },
  green: { main: "#00FF00", glow: "rgba(0, 255, 0, 0.3)", dim: "rgba(0, 255, 0, 0.1)" },
  orange: { main: "#FF9900", glow: "rgba(255, 153, 0, 0.3)", dim: "rgba(255, 153, 0, 0.1)" },
};

const statusColors: Record<string, string> = {
  ok: "#00FF00",
  "O.K.": "#00FF00",
  warning: "#FF9900",
  SYNC: "#FF9900",
  critical: "#FF0000",
  ERROR: "#FF0000",
  unknown: "#555555",
  OFFLINE: "#555555",
};

export const PilotCard = forwardRef<HTMLDivElement, PilotCardProps>(function PilotCard({
  designation,
  name,
  unit,
  fields = [],
  plugNumber,
  checkStatus = "O.K.",
  color = "red",
  imageUrl,
  animated = true,
  className = "",
  ...rest
}, ref) {
  const colors = colorMap[color];
  const checkColor = statusColors[checkStatus] || statusColors.unknown;

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      }
    : {};

  return (
    <Wrapper
      ref={ref}
      {...rest}
      className={`relative bg-eva-black overflow-hidden ${className}`}
      style={{
        border: `1px solid ${colors.dim}`,
        borderTop: `2px solid ${colors.main}`,
      }}
      {...wrapperProps}
    >
      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Image area */}
      {imageUrl && (
        <div
          className="w-full h-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            borderBottom: `1px solid ${colors.dim}`,
            filter: "contrast(1.1) saturate(0.8)",
          }}
        />
      )}

      {/* Designation + Name header */}
      <div className="px-3 py-2" style={{ backgroundColor: colors.dim }}>
        <div
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-eva-display)",
            color: colors.main,
            textShadow: `0 0 6px ${colors.glow}`,
          }}
        >
          {designation}
        </div>
        <div
          className="text-lg font-bold uppercase tracking-wider mt-0.5"
          style={{
            fontFamily: "var(--font-eva-display)",
            color: "#E0E0E0",
          }}
        >
          {name}
        </div>
      </div>

      {/* Unit badge */}
      {unit && (
        <div
          className="px-3 py-1.5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${colors.dim}` }}
        >
          <span className="text-[10px] font-mono uppercase text-eva-white/40">UNIT</span>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-eva-display)",
              color: colors.main,
            }}
          >
            {unit}
          </span>
        </div>
      )}

      {/* Fields */}
      {fields.length > 0 && (
        <div className="px-3 py-2 space-y-1.5">
          {fields.map((field, i) => {
            const fColor = field.status ? statusColors[field.status] || "#E0E0E0" : "#E0E0E0";
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-eva-white/40">
                  {field.label}
                </span>
                <span
                  className="text-[11px] font-mono font-bold uppercase"
                  style={{ color: fColor }}
                >
                  {field.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom status bar */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          borderTop: `1px solid ${colors.dim}`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {plugNumber && (
          <div className="flex items-center gap-1.5">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-eva-display)",
                color: colors.main,
                textShadow: `0 0 4px ${colors.glow}`,
              }}
            >
              TEST PLUG {plugNumber}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-eva-white/40">CHECK</span>
          <span
            className="text-xs font-bold font-mono uppercase"
            style={{
              color: checkColor,
              textShadow: `0 0 6px ${checkColor}40`,
            }}
          >
            {checkStatus}
          </span>
        </div>
      </div>
    </Wrapper>
  );
});
