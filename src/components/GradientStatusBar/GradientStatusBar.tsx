"use client";

import { forwardRef } from "react";
import { Tooltip } from "../Tooltip";

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
  /** How the fill transitions between zone colors */
  fillMode?: "stepped" | "gradient";
  /** Optional className */
  className?: string;
}

const labelColorMap: Record<NonNullable<GradientStatusBarProps["color"]>, string> = {
  cyan: "text-nerv-cyan",
  green: "text-nerv-green",
  orange: "text-nerv-orange",
  red: "text-nerv-red",
  magenta: "text-nerv-magenta",
};

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function buildProgressiveGradient(
  zones: StatusZone[],
  toPercent: (value: number) => number
) {
  if (zones.length === 0) {
    return "linear-gradient(90deg, transparent 0%, transparent 100%)";
  }

  if (zones.length === 1) {
    return `linear-gradient(90deg, ${zones[0].color} 0%, ${zones[0].color} 100%)`;
  }

  const transitionWindow = 3;
  const stops: string[] = [`${zones[0].color} 0%`];

  zones.forEach((zone, index) => {
    const start = clampPercent(toPercent(zone.start));
    const end = clampPercent(toPercent(zone.end));

    if (index === 0) {
      stops.push(`${zone.color} ${clampPercent(end - transitionWindow)}%`);
      return;
    }

    if (index === zones.length - 1) {
      stops.push(`${zone.color} ${clampPercent(start + transitionWindow)}%`);
      stops.push(`${zone.color} 100%`);
      return;
    }

    stops.push(`${zone.color} ${clampPercent(start + transitionWindow)}%`);
    stops.push(`${zone.color} ${clampPercent(end - transitionWindow)}%`);
  });

  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

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
      fillMode = "stepped",
      className = "",
    },
    ref
  ) {
    const range = Math.max(1, max - min);
    const pct = Math.max(0, Math.min(1, (value - min) / range)) * 100;

    const toPercent = (v: number) =>
      Math.max(0, Math.min(100, ((v - min) / range) * 100));
    const progressiveGradient = buildProgressiveGradient(zones, toPercent);

    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className}`}>
        {(label || sublabel) && (
          <div className="flex flex-col border-b border-white/10 pb-1">
            {label && (
              <span
                className={`text-[10px] uppercase tracking-[0.22em] font-bold ${labelColorMap[color]}`}
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                {label}
              </span>
            )}
            {sublabel && (
              <span
                className="text-[9px] uppercase tracking-[0.1em] text-nerv-mid-gray font-mono"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                {sublabel}
              </span>
            )}
          </div>
        )}

        <div className="relative h-3">
          {zones.map((zone, index) => {
            if (!zone.label) return null;
            const leftPct = toPercent(zone.start);
            return (
              <span
                key={index}
                className="absolute whitespace-nowrap text-[8px] uppercase tracking-[0.12em] font-mono text-nerv-mid-gray"
                style={{
                  left: `${leftPct}%`,
                  fontFamily: "var(--font-nerv-mono)",
                  transform: leftPct > 80 ? "translateX(-100%)" : "none",
                }}
              >
                {zone.label}
              </span>
            );
          })}
        </div>

        <div
          className="relative h-4 overflow-hidden border border-nerv-mid-gray/50 bg-black/70"
          role="meter"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
        >
          {fillMode === "gradient" ? (
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: progressiveGradient }}
            />
          ) : (
            zones.map((zone, index) => {
              const left = toPercent(zone.start);
              const width = toPercent(zone.end) - left;
              return (
                <div
                  key={index}
                  className="absolute top-0 bottom-0 opacity-20"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: zone.color,
                  }}
                />
              );
            })
          )}

          {zones.slice(1).map((zone, index) => {
            const left = toPercent(zone.start);
            return (
              <div
                key={index}
                className="absolute top-0 bottom-0 w-px bg-nerv-mid-gray/60"
                style={{ left: `${left}%` }}
              />
            );
          })}

          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-0 w-px bg-black/35"
              style={{ left: `${(index / 24) * 100}%` }}
            />
          ))}

          {zones.map((zone, index) => {
            const left = toPercent(zone.start);
            const width = toPercent(zone.end) - left;
            const tooltip = zone.label
              ? `${zone.label} (${zone.start}–${zone.end})`
              : undefined;

            return (
              <Tooltip
                key={`tooltip-${index}`}
                content={tooltip ?? `${zone.start}–${zone.end}`}
                color={color === "magenta" ? "magenta" : color}
                delay={120}
                className="absolute top-0 bottom-0 z-[1] block"
                tabIndex={0}
                aria-label={tooltip ?? `${zone.start}–${zone.end}`}
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                <div className="h-full w-full cursor-pointer transition-colors duration-150 hover:bg-white/[0.04]" />
              </Tooltip>
            );
          })}

          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: `${pct}%`,
              backgroundImage:
                fillMode === "gradient"
                  ? `${progressiveGradient}, repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.4) 6px, rgba(0,0,0,0.4) 7px)`
                  : "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.4) 6px, rgba(0,0,0,0.4) 7px)",
            }}
          >
            {pct > 0 &&
              fillMode === "stepped" &&
              zones.map((zone, index) => {
                const zoneLeft = toPercent(zone.start);
                const zoneRight = toPercent(zone.end);

                if (zoneLeft >= pct) return null;

                const segLeft = zoneLeft;
                const segRight = Math.min(zoneRight, pct);
                const segWidth = segRight - segLeft;

                if (segWidth <= 0) return null;

                return (
                  <div
                    key={index}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${(segLeft / pct) * 100}%`,
                      width: `${(segWidth / pct) * 100}%`,
                      backgroundColor: zone.color,
                      opacity: 0.9,
                    }}
                  />
                );
              })}
          </div>

          <div
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${pct}%` }}
          />
          <div
            className="absolute -top-px h-[5px] w-[8px] -translate-x-1/2 border-x border-t border-white"
            style={{ left: `${pct}%` }}
          />
        </div>

        <div className="flex justify-between px-0.5 text-[8px] font-mono text-nerv-mid-gray">
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
