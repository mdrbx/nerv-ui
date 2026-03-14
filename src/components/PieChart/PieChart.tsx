"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface PieSlice {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  /** Slice data */
  slices: PieSlice[];
  /** Chart title */
  title?: string;
  /** Chart size in pixels */
  size?: number;
  /** Donut mode (hollow center) */
  donut?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show percentage labels */
  showLabels?: boolean;
  /** Color theme (auto-assigns colors if slices don't specify) */
  color?: "cyan" | "green" | "orange" | "mixed";
  /** Optional className */
  className?: string;
}

const themeColors = {
  cyan: ["#00FFFF", "#0099AA", "#005566", "#00CCDD", "#003344"],
  green: ["#00FF00", "#00AA00", "#005500", "#00CC00", "#003300"],
  orange: ["#FF9900", "#CC7700", "#995500", "#FFBB33", "#664400"],
  mixed: ["#00FFFF", "#FF9900", "#00FF00", "#FF0000", "#FF00FF", "#FFFF00", "#0099FF"],
} as const;

export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  function PieChart(
    {
      slices,
      title,
      size = 180,
      donut = false,
      showLegend = true,
      showLabels = true,
      color = "mixed",
      className = "",
    },
    ref
  ) {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0);
    if (total === 0) return null;

    const palette = themeColors[color];
    const cx = 50;
    const cy = 50;
    const outerR = 42;
    const innerR = donut ? 26 : 0;

    let accumulatedAngle = -90;
    const arcData = slices.map((slice, index) => {
      const pct = slice.value / total;
      const sweepDeg = pct * 360;
      const startDeg = accumulatedAngle;
      accumulatedAngle += sweepDeg;
      const endDeg = accumulatedAngle;
      const midDeg = (startDeg + endDeg) / 2;
      const sliceColor = slice.color || palette[index % palette.length];

      return { ...slice, pct, startDeg, endDeg, midDeg, sliceColor };
    });

    const degToXY = (deg: number, radius: number) => {
      const rad = (deg * Math.PI) / 180;
      return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    };

    const slicePath = (startDeg: number, endDeg: number) => {
      const start = degToXY(startDeg, outerR);
      const end = degToXY(endDeg, outerR);
      const largeArc = endDeg - startDeg > 180 ? 1 : 0;

      if (donut) {
        const innerStart = degToXY(endDeg, innerR);
        const innerEnd = degToXY(startDeg, innerR);
        return `M ${start.x} ${start.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${end.x} ${end.y} L ${innerStart.x} ${innerStart.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y} Z`;
      }

      return `M ${cx} ${cy} L ${start.x} ${start.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    };

    return (
      <div ref={ref} className={`inline-flex flex-col items-center font-mono ${className}`}>
        {title && (
          <div
            className="mb-2 w-full border-b border-eva-orange/25 pb-1 text-left text-[10px] uppercase tracking-[0.22em] font-bold text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </div>
        )}

        <div className="flex items-center gap-4 border border-white/10 bg-black/65 px-3 py-3">
          <svg viewBox="0 0 100 100" width={size} height={size}>
            <rect x="6" y="6" width="88" height="88" fill="none" stroke="rgba(224,224,224,0.08)" strokeWidth="0.6" />
            {[18, 28, 38, 42].map((radius) => (
              <circle
                key={radius}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={0.5}
              />
            ))}
            <line x1={cx} y1={6} x2={cx} y2={94} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
            <line x1={6} y1={cy} x2={94} y2={cy} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />

            {arcData.map((arc, index) => {
              if (arc.pct >= 0.999) {
                return (
                  <motion.circle
                    key={arc.label}
                    cx={cx}
                    cy={cy}
                    r={donut ? (outerR + innerR) / 2 : outerR / 2}
                    fill={donut ? "none" : arc.sliceColor}
                    stroke={donut ? arc.sliceColor : "none"}
                    strokeWidth={donut ? outerR - innerR : 0}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.88, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              }

              return (
                <motion.path
                  key={arc.label}
                  d={slicePath(arc.startDeg, arc.endDeg)}
                  fill={arc.sliceColor}
                  stroke="#000"
                  strokeWidth={0.8}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.88, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              );
            })}

            {donut && (
              <>
                <circle cx={cx} cy={cy} r={innerR - 1} fill="#000" fillOpacity={0.8} />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={7}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {total}
                </text>
              </>
            )}

            {showLabels &&
              arcData
                .filter((arc) => arc.pct >= 0.05)
                .map((arc) => {
                  const labelRadius = donut ? (outerR + innerR) / 2 : outerR * 0.65;
                  const pos = degToXY(arc.midDeg, labelRadius);
                  return (
                    <text
                      key={`${arc.label}-label`}
                      x={pos.x}
                      y={pos.y + 2}
                      textAnchor="middle"
                      fill="#000"
                      fontSize={5}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {Math.round(arc.pct * 100)}%
                    </text>
                  );
                })}
          </svg>

          {showLegend && (
            <div className="space-y-1">
              {arcData.map((arc) => (
                <div
                  key={arc.label}
                  className="grid grid-cols-[8px_minmax(0,1fr)_34px] items-center gap-2 border-b border-white/8 pb-1"
                >
                  <div className="h-2 w-2 shrink-0" style={{ backgroundColor: arc.sliceColor }} />
                  <span className="truncate text-[9px] uppercase tracking-[0.12em] text-eva-white/70">
                    {arc.label}
                  </span>
                  <span className="ml-auto text-right text-[9px] text-eva-white/45 tabular-nums">
                    {Math.round(arc.pct * 100)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
