"use client";

import { forwardRef, useId } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "../Tooltip";

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
  /** Display variant */
  variant?: "needle" | "ring";
  /** Gradient start color for ring variant */
  gradientFrom?: string;
  /** Gradient end color for ring variant */
  gradientTo?: string;
  /** Optional className */
  className?: string;
}

const colorMap = {
  cyan: { stroke: "#00FFFF", text: "text-nerv-cyan", fill: "rgba(0,255,255,0.06)" },
  green: { stroke: "#00FF00", text: "text-nerv-green", fill: "rgba(0,255,0,0.06)" },
  orange: { stroke: "#FF9900", text: "text-nerv-orange", fill: "rgba(255,153,0,0.06)" },
  red: { stroke: "#FF0000", text: "text-nerv-red", fill: "rgba(255,0,0,0.06)" },
  magenta: { stroke: "#FF00FF", text: "text-nerv-magenta", fill: "rgba(255,0,255,0.06)" },
} as const;

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  function Gauge(
    {
      value,
      min = 0,
      max = 100,
      label,
      unit = "%",
      color = "cyan",
      size = 160,
      showTicks = true,
      threshold,
      variant = "needle",
      gradientFrom = "#FF00FF",
      gradientTo = "#FF9900",
      className = "",
    },
    ref
  ) {
    const isRing = variant === "ring";
    const range = Math.max(1, max - min);
    const pct = Math.max(0, Math.min(1, (value - min) / range));
    const isOverThreshold = threshold !== undefined && value > threshold;
    const activeColor = isOverThreshold ? colorMap.red : colorMap[color];
    const gradientId = `gauge-${useId().replace(/:/g, "")}`;

    const cx = 50;
    const cy = 44;
    const r = 31;
    const startAngle = 160;
    const sweepAngle = 220;
    const endAngle = startAngle + sweepAngle;

    const angleToXY = (deg: number) => {
      const rad = (deg * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    const arcPath = (startDeg: number, endDeg: number) => {
      const start = angleToXY(startDeg);
      const end = angleToXY(endDeg);
      const largeArc = endDeg - startDeg > 180 ? 1 : 0;
      return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
    };

    const bgArc = arcPath(startAngle, endAngle);
    const valueAngle = startAngle + pct * sweepAngle;
    const valueArc = arcPath(startAngle, Math.max(startAngle + 0.1, valueAngle));
    const gaugeTooltip = label
      ? `${label}: ${Math.round(value)}${unit}`
      : `${Math.round(value)}${unit}`;
    const tooltipColor = isOverThreshold ? "red" : color;
    const ticks = showTicks
      ? Array.from({ length: 13 }).map((_, index) => {
          const angle = startAngle + (index / 12) * sweepAngle;
          const innerRadius = index % 3 === 0 ? r - 6 : r - 3;
          const outer = angleToXY(angle);
          const rad = (angle * Math.PI) / 180;
          const inner = {
            x: cx + innerRadius * Math.cos(rad),
            y: cy + innerRadius * Math.sin(rad),
          };
          return { outer, inner, major: index % 3 === 0 };
        })
      : [];
    const needle = angleToXY(valueAngle);

    return (
      <div ref={ref} className={`inline-flex flex-col items-center font-mono ${className}`}>
        {label && (
          <div
            className={`mb-1 border-b border-current/25 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold ${activeColor.text}`}
            style={{ fontFamily: "var(--font-nerv-display)", width: `${Math.max(112, size * 0.62)}px` }}
          >
            {label}
          </div>
        )}
        <Tooltip
          content={gaugeTooltip}
          color={tooltipColor}
          delay={120}
          className="block"
          tabIndex={0}
          aria-label={gaugeTooltip}
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -2,
              filter: `drop-shadow(0 0 10px ${activeColor.stroke}55)`,
            }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="cursor-pointer"
          >
            <svg
              viewBox="0 0 100 78"
              width={size}
              height={size * 0.78}
              className="overflow-visible"
            >
              <title>{gaugeTooltip}</title>
              {isRing && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={gradientFrom} />
                    <stop offset="100%" stopColor={gradientTo} />
                  </linearGradient>
                </defs>
              )}

              <rect x="10" y="8" width="80" height="60" fill="none" stroke="rgba(224,224,224,0.08)" strokeWidth="1" />
              <path
                d={bgArc}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={isRing ? 10 : 6}
                strokeLinecap="square"
              />
              {threshold !== undefined && (
                <path
                  d={arcPath(startAngle + ((threshold - min) / range) * sweepAngle, endAngle)}
                  fill="none"
                  stroke="rgba(255,0,0,0.12)"
                  strokeWidth={isRing ? 10 : 6}
                  strokeLinecap="square"
                />
              )}
              <motion.path
                d={valueArc}
                fill="none"
                stroke={isRing ? `url(#${gradientId})` : activeColor.stroke}
                strokeWidth={isRing ? 10 : 4}
                strokeLinecap="square"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {ticks.map((tick, index) => (
                <line
                  key={index}
                  x1={tick.inner.x}
                  y1={tick.inner.y}
                  x2={tick.outer.x}
                  y2={tick.outer.y}
                  stroke={tick.major ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={isRing ? (tick.major ? 1.2 : 0.8) : tick.major ? 1 : 0.6}
                />
              ))}

              {!isRing && (
                <motion.line
                  x1={cx}
                  y1={cy}
                  x2={needle.x}
                  y2={needle.y}
                  stroke={activeColor.stroke}
                  strokeWidth={1.25}
                  strokeLinecap="square"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              )}

              <circle cx={cx} cy={cy} r={2} fill={isRing ? gradientFrom : activeColor.stroke} />
              <circle cx={cx} cy={cy} r={0.8} fill="#000" />

              <text x="18" y="57" fill="rgba(224,224,224,0.42)" fontSize={5} fontFamily="monospace">
                {min}
              </text>
              <text x="78" y="57" fill="rgba(224,224,224,0.42)" fontSize={5} fontFamily="monospace">
                {max}
              </text>

              <rect x="30" y="60" width="40" height="10" fill="black" stroke={activeColor.stroke} strokeWidth="1" />
              <text
                x={cx}
                y="67"
                textAnchor="middle"
                fill={isRing ? gradientTo : activeColor.stroke}
                fontSize={8}
                fontFamily="monospace"
                fontWeight="bold"
              >
                {Math.round(value)}
                {unit}
              </text>
            </svg>
          </motion.div>
        </Tooltip>
      </div>
    );
  }
);
