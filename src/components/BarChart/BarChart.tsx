"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "../Tooltip";

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
  cyan: { bar: "#00FFFF", text: "text-nerv-cyan", grid: "rgba(0,255,255,0.12)", lane: "rgba(0,255,255,0.06)" },
  green: { bar: "#00FF00", text: "text-nerv-green", grid: "rgba(0,255,0,0.12)", lane: "rgba(0,255,0,0.06)" },
  orange: { bar: "#FF9900", text: "text-nerv-orange", grid: "rgba(255,153,0,0.12)", lane: "rgba(255,153,0,0.06)" },
  red: { bar: "#FF0000", text: "text-nerv-red", grid: "rgba(255,0,0,0.12)", lane: "rgba(255,0,0,0.06)" },
  magenta: { bar: "#FF00FF", text: "text-nerv-magenta", grid: "rgba(255,0,255,0.12)", lane: "rgba(255,0,255,0.06)" },
} as const;

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart(
    {
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
      segmented = true,
      className = "",
    },
    ref
  ) {
    const c = colorMap[color];
    const tooltipColor = color === "magenta" ? "magenta" : color;
    const max = maxValue ?? Math.max(1, ...bars.map((bar) => bar.value));
    const gridLines = 4;

    if (direction === "horizontal") {
      return (
        <div ref={ref} className={`font-mono ${className}`}>
          {title && (
            <div
              className={`mb-2 border-b border-current/25 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold ${c.text}`}
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              {title}
            </div>
          )}
          <div className="space-y-1.5">
            {bars.map((bar, index) => {
              const pct = Math.min((bar.value / max) * 100, 100);
              const barColor = bar.color || c.bar;
              const tooltip = `${bar.label}: ${bar.value}${unit}`;
              return (
                <div key={bar.label} className="grid grid-cols-[78px_minmax(0,1fr)_44px] items-center gap-2">
                  <div className="truncate text-[9px] uppercase tracking-[0.15em] text-nerv-white/58">
                    {bar.label}
                  </div>
                  <Tooltip
                    content={tooltip}
                    color={tooltipColor}
                    delay={120}
                    className="block w-full"
                    tabIndex={0}
                    aria-label={tooltip}
                  >
                    <motion.div
                      whileHover={{
                        scaleX: 1.015,
                        boxShadow: `0 0 0 1px ${barColor}55, 0 0 12px ${barColor}33`,
                      }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="relative h-4 cursor-pointer overflow-hidden border border-white/10 bg-black/70"
                      style={{ borderColor: `${barColor}30` }}
                    >
                      <div className="absolute inset-0" style={{ backgroundColor: c.lane }} />
                      {showGrid &&
                        Array.from({ length: gridLines }).map((_, gridIndex) => (
                          <div
                            key={gridIndex}
                            className="absolute top-0 bottom-0 w-px"
                            style={{
                              left: `${((gridIndex + 1) / (gridLines + 1)) * 100}%`,
                              backgroundColor: c.grid,
                            }}
                          />
                        ))}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        whileHover={{ filter: "brightness(1.18)" }}
                        transition={{ duration: 0.6, delay: index * stagger, ease: "easeOut" }}
                        className="relative h-full"
                        style={{
                          ...(segmented
                            ? {
                                backgroundColor: "transparent",
                                background: `repeating-linear-gradient(90deg, ${barColor} 0px, ${barColor} 7px, transparent 7px, transparent 9px)`,
                              }
                            : { backgroundColor: barColor }),
                          borderRight: `1px solid ${barColor}`,
                        }}
                      />
                    </motion.div>
                  </Tooltip>
                  {showValues && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * stagger + 0.4 }}
                      className={`w-11 text-right text-[9px] ${c.text} tabular-nums`}
                    >
                      {bar.value}
                      {unit}
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={`font-mono ${className}`}>
        {title && (
          <div
            className={`mb-2 border-b border-current/25 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            {title}
          </div>
        )}
        <div className="relative border border-white/10 bg-black/65 px-2 pb-5 pt-2" style={{ height }}>
          {showGrid &&
            Array.from({ length: gridLines }).map((_, gridIndex) => {
              const y = ((gridIndex + 1) / (gridLines + 1)) * 100;
              const gridVal = Math.round(max - (max * (gridIndex + 1)) / (gridLines + 1));
              return (
                <div key={gridIndex} className="absolute left-0 right-0" style={{ top: `${y}%` }}>
                  <div className="h-px w-full" style={{ backgroundColor: c.grid }} />
                  <span className="absolute -left-1 -top-2 -translate-x-full pr-1 text-[8px] text-nerv-white/28">
                    {gridVal}
                  </span>
                </div>
              );
            })}

          <div className="flex h-full items-end gap-1.5 pl-6">
            {bars.map((bar, index) => {
              const pct = Math.min((bar.value / max) * 100, 100);
              const barColor = bar.color || c.bar;
              const tooltip = `${bar.label}: ${bar.value}${unit}`;
              return (
                <div key={bar.label} className="flex h-full min-h-0 flex-1 flex-col items-center">
                  {showValues && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * stagger + 0.4 }}
                      className={`mb-1 text-[8px] ${c.text} tabular-nums`}
                    >
                      {bar.value}
                      {unit}
                    </motion.span>
                  )}
                  <div className="flex w-full flex-1 min-h-0 items-end">
                    <Tooltip
                      content={tooltip}
                      color={tooltipColor}
                      delay={120}
                      className="block h-full w-full"
                      tabIndex={0}
                      aria-label={tooltip}
                    >
                      <motion.div
                        whileHover={{
                          scaleX: 1.05,
                          boxShadow: `0 0 0 1px ${barColor}55, 0 0 12px ${barColor}33`,
                        }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="flex h-full items-end overflow-hidden border border-white/10 bg-black/70"
                        style={{ borderColor: `${barColor}30` }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          whileHover={{
                            filter: "brightness(1.14)",
                          }}
                          transition={{ duration: 0.6, delay: index * stagger, ease: "easeOut" }}
                          className="relative min-w-[8px] w-full origin-bottom cursor-pointer border border-white/10 bg-black/35"
                          style={{
                            ...(segmented
                              ? {
                                  backgroundColor: "transparent",
                                  background: `repeating-linear-gradient(0deg, ${barColor} 0px, ${barColor} 7px, transparent 7px, transparent 9px)`,
                                }
                              : { backgroundColor: barColor }),
                            borderColor: `${barColor}40`,
                          }}
                        />
                      </motion.div>
                    </Tooltip>
                  </div>
                  <div className="mt-1 w-full truncate text-center text-[8px] uppercase tracking-[0.1em] text-nerv-white/50">
                    {bar.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-6 right-2 h-px" style={{ backgroundColor: `${c.bar}40` }} />
        </div>
      </div>
    );
  }
);
