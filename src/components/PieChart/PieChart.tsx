"use client";

import { forwardRef, useRef, useState } from "react";
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
    const surfaceRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<{
      x: number;
      y: number;
      label: string;
      value: number;
      pct: number;
      color: string;
    } | null>(null);
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

    const showTooltip = (
      target: { getBoundingClientRect: () => DOMRect },
      arc: (typeof arcData)[number],
      index: number,
      point?: { clientX: number; clientY: number }
    ) => {
      const surfaceRect = surfaceRef.current?.getBoundingClientRect();
      if (!surfaceRect) return;

      const targetRect = target.getBoundingClientRect();
      const x = point
        ? point.clientX - surfaceRect.left
        : targetRect.left - surfaceRect.left + targetRect.width / 2;
      const y = point
        ? point.clientY - surfaceRect.top
        : targetRect.top - surfaceRect.top + targetRect.height / 2;

      setHoveredIndex(index);
      setTooltip({
        x,
        y,
        label: arc.label,
        value: arc.value,
        pct: Math.round(arc.pct * 100),
        color: arc.sliceColor,
      });
    };

    const hideTooltip = () => {
      setHoveredIndex(null);
      setTooltip(null);
    };

    const tooltipLeft = tooltip
      ? Math.max(56, Math.min((surfaceRef.current?.clientWidth ?? size) - 56, tooltip.x))
      : 0;
    const tooltipTop = tooltip ? Math.max(24, tooltip.y - 16) : 0;

    return (
      <div ref={ref} className={`inline-flex flex-col items-center font-mono ${className}`}>
        {title && (
          <div
            className="mb-2 w-full border-b border-nerv-orange/25 pb-1 text-left text-[10px] uppercase tracking-[0.22em] font-bold text-nerv-orange"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            {title}
          </div>
        )}

        <div
          ref={surfaceRef}
          className="relative flex items-center gap-4 border border-white/10 bg-black/65 px-3 py-3"
        >
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
                    animate={{
                      opacity: hoveredIndex === null || hoveredIndex === index ? 0.94 : 0.5,
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.24, delay: index * 0.06 }}
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    onMouseEnter={(event) => showTooltip(event.currentTarget, arc, index, event)}
                    onMouseMove={(event) => showTooltip(event.currentTarget, arc, index, event)}
                    onMouseLeave={hideTooltip}
                    onFocus={(event) => showTooltip(event.currentTarget, arc, index)}
                    onBlur={hideTooltip}
                  >
                    <title>{`${arc.label}: ${arc.value} (${Math.round(arc.pct * 100)}%)`}</title>
                  </motion.circle>
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
                  animate={{
                    opacity: hoveredIndex === null || hoveredIndex === index ? 0.94 : 0.5,
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.24, delay: index * 0.06 }}
                  style={{ transformOrigin: `${cx}px ${cy}px`, cursor: "pointer" }}
                  tabIndex={0}
                  onMouseEnter={(event) => showTooltip(event.currentTarget, arc, index, event)}
                  onMouseMove={(event) => showTooltip(event.currentTarget, arc, index, event)}
                  onMouseLeave={hideTooltip}
                  onFocus={(event) => showTooltip(event.currentTarget, arc, index)}
                  onBlur={hideTooltip}
                >
                  <title>{`${arc.label}: ${arc.value} (${Math.round(arc.pct * 100)}%)`}</title>
                </motion.path>
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
              {arcData.map((arc, index) => (
                <div
                  key={arc.label}
                  className="grid cursor-pointer grid-cols-[8px_minmax(0,1fr)_34px] items-center gap-2 border-b border-white/8 pb-1 transition-colors hover:bg-white/[0.03]"
                  onMouseEnter={(event) => showTooltip(event.currentTarget, arc, index)}
                  onMouseLeave={hideTooltip}
                  onFocus={(event) => showTooltip(event.currentTarget, arc, index)}
                  onBlur={hideTooltip}
                  tabIndex={0}
                >
                  <div className="h-2 w-2 shrink-0" style={{ backgroundColor: arc.sliceColor }} />
                  <span className="truncate text-[9px] uppercase tracking-[0.12em] text-nerv-white/70">
                    {arc.label}
                  </span>
                  <span className="ml-auto text-right text-[9px] text-nerv-white/45 tabular-nums">
                    {Math.round(arc.pct * 100)}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {tooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full border bg-black/95 px-2 py-1 text-[9px] uppercase tracking-[0.16em]"
              style={{
                left: tooltipLeft,
                top: tooltipTop,
                color: tooltip.color,
                borderColor: tooltip.color,
                boxShadow: `0 0 0 1px ${tooltip.color}22 inset, 0 6px 20px rgba(0,0,0,0.32)`,
                fontFamily: "var(--font-nerv-mono)",
              }}
            >
              {tooltip.label}: {tooltip.value} ({tooltip.pct}%)
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);
