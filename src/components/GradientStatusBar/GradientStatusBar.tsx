"use client";

import { forwardRef } from "react";

export interface StatusZone {
  /** Start value of the zone */
  start: number;
  /** End value of the zone */
  end: number;
  /** Optional label shown above the zone boundary */
  label?: string;
  /** CSS color for the zone */
  color: string;
}

export interface GradientStatusBarProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Status zones defining color segments */
  zones: StatusZone[];
  /** Primary label */
  label?: string;
  /** Secondary label below the primary */
  sublabel?: string;
  /** Color theme for the label text */
  color?: "cyan" | "green" | "orange" | "red" | "magenta";
  /** Optional className */
  className?: string;
}

const labelColorMap: Record<NonNullable<GradientStatusBarProps["color"]>, string> = {
  cyan: "text-eva-cyan",
  green: "text-eva-green",
  orange: "text-eva-orange",
  red: "text-eva-red",
  magenta: "text-eva-magenta",
};

export const GradientStatusBar = forwardRef<HTMLDivElement, GradientStatusBarProps>(
  function GradientStatusBar(
    {
      value,
      min = 0,
      max = 100,
      zones,
      label,
      sublabel,
      color = "cyan",
      className = "",
    },
    ref
  ) {
    const range = max - min;
    const pct = Math.max(0, Math.min(1, (value - min) / range)) * 100;

    const toPercent = (v: number) =>
      Math.max(0, Math.min(100, ((v - min) / range) * 100));

    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className}`}>
        {/* Labels row */}
        {(label || sublabel) && (
          <div className="flex flex-col">
            {label && (
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-bold ${labelColorMap[color]}`}
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {label}
              </span>
            )}
            {sublabel && (
              <span
                className="text-[9px] uppercase tracking-[0.1em] text-eva-mid-gray font-mono"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {sublabel}
              </span>
            )}
          </div>
        )}

        {/* Zone labels above bar */}
        <div className="relative h-3">
          {zones.map((zone, i) => {
            if (!zone.label) return null;
            const leftPct = toPercent(zone.start);
            return (
              <span
                key={i}
                className="absolute text-[9px] uppercase tracking-[0.1em] font-mono text-eva-mid-gray whitespace-nowrap"
                style={{
                  left: `${leftPct}%`,
                  fontFamily: "var(--font-eva-mono)",
                  transform: leftPct > 80 ? "translateX(-100%)" : "none",
                }}
              >
                {zone.label}
              </span>
            );
          })}
        </div>

        {/* Bar */}
        <div
          className="relative h-4 border border-eva-mid-gray/50 overflow-hidden"
          role="meter"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
        >
          {/* Zone backgrounds */}
          {zones.map((zone, i) => {
            const left = toPercent(zone.start);
            const width = toPercent(zone.end) - left;
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 opacity-20"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: zone.color,
                }}
              />
            );
          })}

          {/* Zone boundary markers */}
          {zones.slice(1).map((zone, i) => {
            const left = toPercent(zone.start);
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-eva-mid-gray/60"
                style={{ left: `${left}%` }}
              />
            );
          })}

          {/* Value fill with LCD line segments */}
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: `${pct}%`,
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
            }}
          >
            {/* Colored fill segments matching zones */}
            {zones.map((zone, i) => {
              const zoneLeft = toPercent(zone.start);
              const zoneRight = toPercent(zone.end);
              const fillRight = pct;

              if (zoneLeft >= fillRight) return null;

              const segLeft = zoneLeft;
              const segRight = Math.min(zoneRight, fillRight);
              const segWidth = segRight - segLeft;

              if (segWidth <= 0) return null;

              return (
                <div
                  key={i}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${(segLeft / pct) * 100}%`,
                    width: `${(segWidth / pct) * 100}%`,
                    backgroundColor: zone.color,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>

          {/* Value indicator line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white"
            style={{
              left: `${pct}%`,
              boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            }}
          />
        </div>

        {/* Bottom scale */}
        <div className="flex justify-between text-[9px] font-mono text-eva-mid-gray px-0.5">
          <span>{min}</span>
          <span>{Math.round(min + range * 0.25)}</span>
          <span>{Math.round(min + range * 0.5)}</span>
          <span>{Math.round(min + range * 0.75)}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);
