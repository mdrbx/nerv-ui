"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface BarChartBar {
  label: string;
  value: number;
  /** Optional override color for this bar */
  color?: string;
}

export interface BarChartProps {
  /** Bar data */
  bars: BarChartBar[];
  /** Max value for scale (auto-detected if omitted) */
  maxValue?: number;
  /** Color theme */
  color?: "cyan" | "green" | "orange" | "red" | "magenta";
  /** Chart title */
  title?: string;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show value labels on bars */
  showValues?: boolean;
  /** Bar direction */
  direction?: "vertical" | "horizontal";
  /** Animation stagger delay in seconds */
  stagger?: number;
  /** Chart height in pixels (vertical) or width (horizontal) */
  height?: number;
  /** Unit suffix for values (e.g. "%", "ms") */
  unit?: string;
  /** Segmented LCD-cell look with discrete blocks */
  segmented?: boolean;
  /** Optional className */
  className?: string;
}

const colorMap = {
  cyan: { bar: "#00FFFF", glow: "rgba(0,255,255,0.3)", text: "text-eva-cyan", grid: "rgba(0,255,255,0.08)" },
  green: { bar: "#00FF00", glow: "rgba(0,255,0,0.3)", text: "text-eva-green", grid: "rgba(0,255,0,0.08)" },
  orange: { bar: "#FF9900", glow: "rgba(255,153,0,0.3)", text: "text-eva-orange", grid: "rgba(255,153,0,0.08)" },
  red: { bar: "#FF0000", glow: "rgba(255,0,0,0.3)", text: "text-eva-red", grid: "rgba(255,0,0,0.08)" },
  magenta: { bar: "#FF00FF", glow: "rgba(255,0,255,0.3)", text: "text-eva-magenta", grid: "rgba(255,0,255,0.08)" },
};

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart({
    bars,
    maxValue,
    color = "cyan",
    title,
    showGrid = true,
    showValues = true,
    direction = "vertical",
    stagger = 0.08,
    height = 200,
    unit = "",
    segmented = false,
    className = "",
  }, ref) {
  const c = colorMap[color];
  const max = maxValue ?? Math.max(...bars.map((b) => b.value), 1);
  const gridLines = 4;

  if (direction === "horizontal") {
    return (
      <div ref={ref} className={`font-mono ${className}`}>
        {title && (
          <div
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.text} mb-3 border-b border-current/20 pb-1`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            ■ {title}
          </div>
        )}
        <div className="space-y-2">
          {bars.map((bar, i) => {
            const pct = Math.min((bar.value / max) * 100, 100);
            const barColor = bar.color || c.bar;
            return (
              <div key={bar.label} className="flex items-center gap-3">
                <div className="w-24 text-[10px] text-eva-white/60 text-right truncate shrink-0">
                  {bar.label}
                </div>
                <div className="flex-1 h-5 bg-eva-dark-gray/50 relative overflow-hidden">
                  {showGrid &&
                    Array.from({ length: gridLines }).map((_, gi) => (
                      <div
                        key={gi}
                        className="absolute top-0 bottom-0 w-px"
                        style={{
                          left: `${((gi + 1) / (gridLines + 1)) * 100}%`,
                          backgroundColor: c.grid,
                        }}
                      />
                    ))}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: i * stagger, ease: "easeOut" }}
                    className="h-full relative"
                    style={{
                      ...(segmented
                        ? {
                            backgroundColor: "transparent",
                            background: `repeating-linear-gradient(90deg, ${barColor} 0px, ${barColor} 6px, transparent 6px, transparent 8px)`,
                          }
                        : { backgroundColor: barColor }),
                      boxShadow: `0 0 8px ${bar.color ? barColor + "50" : c.glow}`,
                    }}
                  >
                    {/* Scanline overlay */}
                    {!segmented && (
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
                        }}
                      />
                    )}
                  </motion.div>
                </div>
                {showValues && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * stagger + 0.4 }}
                    className={`text-[10px] ${c.text} w-12 tabular-nums`}
                  >
                    {bar.value}{unit}
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical bars
  return (
    <div ref={ref} className={`font-mono ${className}`}>
      {title && (
        <div
          className={`text-xs uppercase tracking-[0.2em] font-bold ${c.text} mb-3 border-b border-current/20 pb-1`}
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          ■ {title}
        </div>
      )}
      <div className="relative" style={{ height }}>
        {/* Grid lines */}
        {showGrid &&
          Array.from({ length: gridLines }).map((_, gi) => {
            const y = ((gi + 1) / (gridLines + 1)) * 100;
            const gridVal = Math.round(max - (max * (gi + 1)) / (gridLines + 1));
            return (
              <div key={gi} className="absolute left-0 right-0" style={{ top: `${y}%` }}>
                <div className="w-full h-px" style={{ backgroundColor: c.grid }} />
                <span className="absolute -left-1 -top-2 text-[8px] text-eva-white/30 -translate-x-full pr-1">
                  {gridVal}
                </span>
              </div>
            );
          })}

        {/* Bars */}
        <div className="flex items-end h-full gap-1 pl-6">
          {bars.map((bar, i) => {
            const pct = Math.min((bar.value / max) * 100, 100);
            const barColor = bar.color || c.bar;
            return (
              <div key={bar.label} className="flex-1 flex flex-col items-center h-full justify-end">
                {showValues && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * stagger + 0.4 }}
                    className={`text-[9px] ${c.text} mb-1 tabular-nums`}
                  >
                    {bar.value}{unit}
                  </motion.span>
                )}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * stagger, ease: "easeOut" }}
                  className="w-full relative min-w-[8px]"
                  style={{
                    ...(segmented
                      ? {
                          backgroundColor: "transparent",
                          background: `repeating-linear-gradient(0deg, ${barColor} 0px, ${barColor} 6px, transparent 6px, transparent 8px)`,
                        }
                      : { backgroundColor: barColor }),
                    boxShadow: `0 0 8px ${bar.color ? barColor + "50" : c.glow}`,
                  }}
                >
                  {/* Scanline overlay */}
                  {!segmented && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
                      }}
                    />
                  )}
                </motion.div>
                <div className="text-[8px] text-eva-white/50 mt-1 text-center truncate w-full">
                  {bar.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Baseline */}
        <div className="absolute bottom-0 left-6 right-0 h-px" style={{ backgroundColor: c.bar + "40" }} />
      </div>
    </div>
  );
});
