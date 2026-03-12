"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface GaugeProps {
  /** Current value (0–100 by default) */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Label text above the gauge */
  label?: string;
  /** Unit suffix shown after value */
  unit?: string;
  /** Color theme */
  color?: "cyan" | "green" | "orange" | "red" | "magenta";
  /** Gauge size in pixels */
  size?: number;
  /** Show tick marks */
  showTicks?: boolean;
  /** Threshold value — gauge changes to red above this */
  threshold?: number;
  /** Optional className */
  className?: string;
}

const colorMap = {
  cyan: { stroke: "#00FFFF", glow: "rgba(0,255,255,0.4)", text: "text-eva-cyan", fill: "rgba(0,255,255,0.06)" },
  green: { stroke: "#00FF00", glow: "rgba(0,255,0,0.4)", text: "text-eva-green", fill: "rgba(0,255,0,0.06)" },
  orange: { stroke: "#FF9900", glow: "rgba(255,153,0,0.4)", text: "text-eva-orange", fill: "rgba(255,153,0,0.06)" },
  red: { stroke: "#FF0000", glow: "rgba(255,0,0,0.4)", text: "text-eva-red", fill: "rgba(255,0,0,0.06)" },
  magenta: { stroke: "#FF00FF", glow: "rgba(255,0,255,0.4)", text: "text-eva-magenta", fill: "rgba(255,0,255,0.06)" },
};

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  function Gauge({
    value,
    min = 0,
    max = 100,
    label,
    unit = "%",
    color = "cyan",
    size = 160,
    showTicks = true,
    threshold,
    className = "",
  }, ref) {
  const range = max - min;
  const pct = Math.max(0, Math.min(1, (value - min) / range));
  const isOverThreshold = threshold !== undefined && value > threshold;
  const activeColor = isOverThreshold ? colorMap.red : colorMap[color];

  // Arc geometry: 240° sweep (from 150° to 390° / -210° to 30°)
  const cx = 50;
  const cy = 52;
  const r = 40;
  const startAngle = 150;
  const sweepAngle = 240;
  const endAngle = startAngle + sweepAngle;

  const angleToXY = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  // Full arc path
  const arcPath = (startDeg: number, endDeg: number) => {
    const start = angleToXY(startDeg);
    const end = angleToXY(endDeg);
    const sweep = endDeg - startDeg;
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const bgArc = arcPath(startAngle, endAngle);
  const valueAngle = startAngle + pct * sweepAngle;
  const valueArc = arcPath(startAngle, Math.max(startAngle + 0.1, valueAngle));

  // Tick marks
  const ticks = showTicks
    ? Array.from({ length: 13 }).map((_, i) => {
        const angle = startAngle + (i / 12) * sweepAngle;
        const innerR = i % 3 === 0 ? r - 6 : r - 3;
        const outer = angleToXY(angle);
        const rad = (angle * Math.PI) / 180;
        const inner = {
          x: cx + innerR * Math.cos(rad),
          y: cy + innerR * Math.sin(rad),
        };
        return { outer, inner, major: i % 3 === 0 };
      })
    : [];

  // Needle endpoint
  const needle = angleToXY(valueAngle);

  return (
    <div ref={ref} className={`inline-flex flex-col items-center font-mono ${className}`}>
      {label && (
        <div
          className={`text-[10px] uppercase tracking-[0.2em] font-bold ${activeColor.text} mb-1`}
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {label}
        </div>
      )}
      <svg
        viewBox="0 0 100 70"
        width={size}
        height={size * 0.7}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={bgArc}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
          strokeLinecap="butt"
        />

        {/* Threshold zone */}
        {threshold !== undefined && (
          <path
            d={arcPath(
              startAngle + ((threshold - min) / range) * sweepAngle,
              endAngle
            )}
            fill="none"
            stroke="rgba(255,0,0,0.12)"
            strokeWidth={8}
            strokeLinecap="butt"
          />
        )}

        {/* Value arc */}
        <motion.path
          d={valueArc}
          fill="none"
          stroke={activeColor.stroke}
          strokeWidth={5}
          strokeLinecap="butt"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 4px ${activeColor.glow})`,
          }}
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.inner.x}
            y1={tick.inner.y}
            x2={tick.outer.x}
            y2={tick.outer.y}
            stroke={tick.major ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"}
            strokeWidth={tick.major ? 1 : 0.5}
          />
        ))}

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={needle.x}
          y2={needle.y}
          stroke={activeColor.stroke}
          strokeWidth={1.5}
          strokeLinecap="butt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            filter: `drop-shadow(0 0 3px ${activeColor.glow})`,
          }}
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={2.5} fill={activeColor.stroke} />
        <circle cx={cx} cy={cy} r={1} fill="#000" />

        {/* Value text */}
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill={activeColor.stroke}
          fontSize={10}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {Math.round(value)}{unit}
        </text>
      </svg>
    </div>
  );
});
