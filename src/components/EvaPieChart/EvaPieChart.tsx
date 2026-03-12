"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface EvaPieSlice {
  label: string;
  value: number;
  color?: string;
}

export interface EvaPieChartProps {
  /** Slice data */
  slices: EvaPieSlice[];
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
};

export const EvaPieChart = forwardRef<HTMLDivElement, EvaPieChartProps>(
  function EvaPieChart({
    slices,
    title,
    size = 180,
    donut = false,
    showLegend = true,
    showLabels = true,
    color = "mixed",
    className = "",
  }, ref) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total === 0) return null;

  const palette = themeColors[color];
  const cx = 50;
  const cy = 50;
  const outerR = 42;
  const innerR = donut ? 26 : 0;

  // Build slice arcs
  let accumulatedAngle = -90; // start at 12 o'clock
  const arcData = slices.map((slice, i) => {
    const pct = slice.value / total;
    const sweepDeg = pct * 360;
    const startDeg = accumulatedAngle;
    accumulatedAngle += sweepDeg;
    const endDeg = accumulatedAngle;
    const midDeg = (startDeg + endDeg) / 2;
    const sliceColor = slice.color || palette[i % palette.length];

    return { ...slice, pct, startDeg, endDeg, midDeg, sliceColor };
  });

  const degToXY = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
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
          className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange mb-3 border-b border-eva-orange/20 pb-1 w-full text-center"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          ■ {title}
        </div>
      )}

      <div className="flex items-center gap-6">
        <svg viewBox="0 0 100 100" width={size} height={size}>
          {/* Grid rings */}
          {[20, 30, 42].map((r) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          ))}

          {/* Crosshairs */}
          <line x1={cx} y1={5} x2={cx} y2={95} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          <line x1={5} y1={cy} x2={95} y2={cy} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />

          {/* Slices */}
          {arcData.map((arc, i) => {
            // Handle single-slice case (full circle)
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
                  animate={{ opacity: 0.85, scale: 1 }}
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
                strokeWidth={1}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.85, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  filter: `drop-shadow(0 0 3px ${arc.sliceColor}50)`,
                }}
              />
            );
          })}

          {/* Donut center */}
          {donut && (
            <>
              <circle cx={cx} cy={cy} r={innerR - 1} fill="#000" fillOpacity={0.8} />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={8}
                fontFamily="monospace"
                fontWeight="bold"
              >
                {total}
              </text>
            </>
          )}

          {/* Percentage labels */}
          {showLabels &&
            arcData
              .filter((a) => a.pct >= 0.05)
              .map((arc) => {
                const labelR = donut ? (outerR + innerR) / 2 : outerR * 0.65;
                const pos = degToXY(arc.midDeg, labelR);
                return (
                  <text
                    key={arc.label + "-label"}
                    x={pos.x}
                    y={pos.y + 2}
                    textAnchor="middle"
                    fill="#000"
                    fontSize={5.5}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {Math.round(arc.pct * 100)}%
                  </text>
                );
              })}
        </svg>

        {/* Legend */}
        {showLegend && (
          <div className="space-y-1.5">
            {arcData.map((arc) => (
              <div key={arc.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 shrink-0"
                  style={{ backgroundColor: arc.sliceColor }}
                />
                <span className="text-[10px] text-eva-white/70 truncate max-w-[100px]">
                  {arc.label}
                </span>
                <span className="text-[10px] text-eva-white/40 tabular-nums ml-auto">
                  {Math.round(arc.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
