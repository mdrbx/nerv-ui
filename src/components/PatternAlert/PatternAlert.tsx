"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface PatternAlertProps {
  /** Alert designation (e.g. "3rd ANGEL", "15th ANGEL") */
  designation: string;
  /** Pattern classification */
  pattern?: string;
  /** Blood type classification */
  bloodType?: "BLUE" | "ORANGE" | "RED" | "GREEN" | "UNKNOWN";
  /** Whether the alert is visible */
  visible?: boolean;
  /** Scale range (-N to +N) */
  scaleRange?: number;
  /** Measurement unit label */
  unit?: string;
  /** Optional subtitle / additional info */
  subtitle?: string;
  /** Color theme */
  color?: "orange" | "red" | "cyan" | "green";
  /** Whether to show animated scanline */
  animated?: boolean;
  className?: string;
}

const colorMap = {
  orange: { main: "#FF9900", glow: "rgba(255, 153, 0, 0.3)", dim: "rgba(255, 153, 0, 0.15)" },
  red: { main: "#FF0000", glow: "rgba(255, 0, 0, 0.3)", dim: "rgba(255, 0, 0, 0.15)" },
  cyan: { main: "#00FFFF", glow: "rgba(0, 255, 255, 0.3)", dim: "rgba(0, 255, 255, 0.15)" },
  green: { main: "#00FF00", glow: "rgba(0, 255, 0, 0.3)", dim: "rgba(0, 255, 0, 0.15)" },
};

const bloodTypeColors: Record<string, string> = {
  BLUE: "#4488FF",
  ORANGE: "#FF9900",
  RED: "#FF0000",
  GREEN: "#00FF00",
  UNKNOWN: "#999999",
};

export function PatternAlert({
  designation,
  pattern = "PATTERN",
  bloodType = "BLUE",
  visible = true,
  scaleRange = 3,
  unit = "10⁻⁶m",
  subtitle,
  color = "orange",
  animated = true,
  className = "",
}: PatternAlertProps) {
  const colors = colorMap[color];
  const btColor = bloodTypeColors[bloodType] || bloodTypeColors.UNKNOWN;
  const scaleMarks = Array.from({ length: scaleRange * 2 + 1 }, (_, i) => i - scaleRange);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`relative bg-eva-black overflow-hidden ${className}`}
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            border: `1px solid ${colors.dim}`,
            minHeight: "140px",
          }}
        >
          {/* Scanline overlay */}
          {animated && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
              }}
            />
          )}

          {/* Top scale bar */}
          <div
            className="flex items-end justify-center gap-0 px-4 pt-3"
            style={{ borderBottom: `1px solid ${colors.dim}` }}
          >
            {scaleMarks.map((mark) => (
              <div key={mark} className="flex flex-col items-center" style={{ flex: 1 }}>
                <span
                  className="text-[10px] font-mono mb-1"
                  style={{ color: colors.main, opacity: mark === 0 ? 1 : 0.5 }}
                >
                  {mark > 0 ? `+${mark}` : String(mark)}
                </span>
                <div
                  style={{
                    width: "1px",
                    height: mark === 0 ? "12px" : "8px",
                    backgroundColor: colors.main,
                    opacity: mark === 0 ? 0.8 : 0.3,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="px-4 py-4 flex items-start justify-between">
            {/* Left: Tick marks */}
            <div className="flex flex-col gap-3 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "12px",
                    height: "3px",
                    backgroundColor: colors.main,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>

            {/* Center: Designation + Pattern */}
            <div className="flex-1">
              <motion.div
                className="flex items-center gap-3 mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {/* Designation badge */}
                <div
                  className="px-3 py-1.5"
                  style={{
                    border: `2px solid ${colors.main}`,
                    backgroundColor: colors.dim,
                  }}
                >
                  <span
                    className="text-lg font-bold uppercase tracking-wider whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-eva-display)",
                      color: colors.main,
                      textShadow: `0 0 8px ${colors.glow}`,
                    }}
                  >
                    {designation}
                  </span>
                </div>

                {/* Pattern text */}
                <span
                  className="text-sm font-bold uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--font-eva-display)",
                    color: colors.main,
                  }}
                >
                  {pattern} : BLOOD TYPE{" "}
                  <span style={{ color: btColor }}>{bloodType}</span>
                </span>
              </motion.div>

              {subtitle && (
                <motion.div
                  className="text-[10px] font-mono uppercase tracking-wider mt-2"
                  style={{ color: colors.main, opacity: 0.5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.3 }}
                >
                  {subtitle}
                </motion.div>
              )}
            </div>

            {/* Right: Unit label */}
            <div className="text-right">
              <span
                className="text-sm font-mono"
                style={{ color: colors.main, opacity: 0.6 }}
              >
                {unit}
              </span>
            </div>
          </div>

          {/* Bottom scale bar (mirror of top) */}
          <div
            className="flex items-start justify-center gap-0 px-4 pb-3"
            style={{ borderTop: `1px solid ${colors.dim}` }}
          >
            {scaleMarks.map((mark) => (
              <div key={mark} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div
                  style={{
                    width: "1px",
                    height: mark === 0 ? "12px" : "8px",
                    backgroundColor: colors.main,
                    opacity: mark === 0 ? 0.8 : 0.3,
                  }}
                />
                <span
                  className="text-[10px] font-mono mt-1"
                  style={{ color: colors.main, opacity: mark === 0 ? 1 : 0.5 }}
                >
                  {mark > 0 ? `+${mark}` : String(mark)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
