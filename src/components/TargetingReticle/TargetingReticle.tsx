"use client";

import { useRef, useEffect, useState } from "react";

export interface TargetingReticleProps {
  /** Current targeting mode label */
  mode?: string;
  /** Whether the target is locked */
  locked?: boolean;
  /** Coordinate readout values */
  coordinates?: { x: string; y: string; z?: string };
  /** Additional data readouts */
  readouts?: { label: string; value: string }[];
  /** Color theme */
  color?: "red" | "green" | "cyan" | "orange";
  /** Size of the component */
  size?: number;
  /** Whether to show the animated rotation */
  animated?: boolean;
  /** Label text for the target */
  targetLabel?: string;
  className?: string;
}

const colorMap = {
  red: { main: "#FF0000", glow: "rgba(255, 0, 0, 0.3)", dim: "rgba(255, 0, 0, 0.15)" },
  green: { main: "#00FF00", glow: "rgba(0, 255, 0, 0.3)", dim: "rgba(0, 255, 0, 0.15)" },
  cyan: { main: "#00FFFF", glow: "rgba(0, 255, 255, 0.3)", dim: "rgba(0, 255, 255, 0.15)" },
  orange: { main: "#FF9900", glow: "rgba(255, 153, 0, 0.3)", dim: "rgba(255, 153, 0, 0.15)" },
};

export function TargetingReticle({
  mode = "MODE:SHOOT",
  locked = false,
  coordinates,
  readouts,
  color = "red",
  size = 400,
  animated = true,
  targetLabel,
  className = "",
}: TargetingReticleProps) {
  const colors = colorMap[color];
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animated) return;
    let angle = 0;
    const animate = () => {
      angle += 0.3;
      setRotation(angle);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animated]);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.18;
  const diamondR = size * 0.38;

  // Diamond corners
  const diamond = [
    { x: cx, y: cy - diamondR }, // top
    { x: cx + diamondR, y: cy }, // right
    { x: cx, y: cy + diamondR }, // bottom
    { x: cx - diamondR, y: cy }, // left
  ];

  // Tick marks around circle
  const tickCount = 36;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (i * 360) / tickCount;
    const rad = (angle * Math.PI) / 180;
    const isMain = i % 9 === 0;
    const r1 = outerR - (isMain ? 12 : 6);
    const r2 = outerR;
    return {
      x1: cx + r1 * Math.cos(rad),
      y1: cy + r1 * Math.sin(rad),
      x2: cx + r2 * Math.cos(rad),
      y2: cy + r2 * Math.sin(rad),
      isMain,
    };
  });

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
      >
        {/* Diamond frame */}
        <polygon
          points={diamond.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={colors.main}
          strokeWidth={1.5}
          opacity={0.6}
        />

        {/* Diagonal cross lines through diamond */}
        <line x1={diamond[0].x} y1={diamond[0].y} x2={diamond[2].x} y2={diamond[2].y}
          stroke={colors.main} strokeWidth={0.5} opacity={0.3} />
        <line x1={diamond[1].x} y1={diamond[1].y} x2={diamond[3].x} y2={diamond[3].y}
          stroke={colors.main} strokeWidth={0.5} opacity={0.3} />

        {/* Outer circle (rotating) */}
        <g transform={`rotate(${rotation} ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            fill="none"
            stroke={colors.main}
            strokeWidth={2}
            strokeDasharray="8 4"
            opacity={0.4}
          />
        </g>

        {/* Inner circle */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke={locked ? "#FF0000" : colors.main}
          strokeWidth={2.5}
          opacity={locked ? 1 : 0.7}
        />

        {/* Inner circle gap marks */}
        <line x1={cx - innerR} y1={cy} x2={cx - innerR - 8} y2={cy}
          stroke={colors.main} strokeWidth={2} />
        <line x1={cx + innerR} y1={cy} x2={cx + innerR + 8} y2={cy}
          stroke={colors.main} strokeWidth={2} />
        <line x1={cx} y1={cy - innerR} x2={cx} y2={cy - innerR - 8}
          stroke={colors.main} strokeWidth={2} />
        <line x1={cx} y1={cy + innerR} x2={cx} y2={cy + innerR + 8}
          stroke={colors.main} strokeWidth={2} />

        {/* Crosshair center */}
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy}
          stroke={colors.main} strokeWidth={1} />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6}
          stroke={colors.main} strokeWidth={1} />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={colors.main}
            strokeWidth={t.isMain ? 2 : 1}
            opacity={t.isMain ? 0.8 : 0.3}
          />
        ))}

        {/* Bottom horizontal scale */}
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((n) => {
          const bx = cx + n * (size * 0.04);
          const by = cy + diamondR + 20;
          return (
            <g key={n}>
              <line
                x1={bx}
                y1={by}
                x2={bx}
                y2={by + (n === 0 ? 10 : 6)}
                stroke={colors.main}
                strokeWidth={n === 0 ? 2 : 1}
                opacity={0.5}
              />
            </g>
          );
        })}
      </svg>

      {/* Mode label (top-left) */}
      <div
        className="absolute top-2 left-2 text-xs font-bold uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-eva-display)",
          color: colors.main,
          textShadow: `0 0 6px ${colors.glow}`,
        }}
      >
        {mode}
      </div>

      {/* Coordinates readout (left side) */}
      {coordinates && (
        <div className="absolute top-12 left-2 space-y-0.5">
          <div className="text-[9px] font-mono" style={{ color: colors.main, opacity: 0.7 }}>
            X:{coordinates.x}
          </div>
          <div className="text-[9px] font-mono" style={{ color: colors.main, opacity: 0.7 }}>
            Y:{coordinates.y}
          </div>
          {coordinates.z && (
            <div className="text-[9px] font-mono" style={{ color: colors.main, opacity: 0.7 }}>
              Z:{coordinates.z}
            </div>
          )}
        </div>
      )}

      {/* Target label (right side) */}
      {targetLabel && (
        <div
          className="absolute right-2 text-xs font-bold uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-eva-display)",
            color: locked ? "#FF0000" : colors.main,
            textShadow: `0 0 6px ${locked ? "rgba(255,0,0,0.4)" : colors.glow}`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {locked ? "LOCKED" : targetLabel}
        </div>
      )}

      {/* Readouts (bottom-right) */}
      {readouts && readouts.length > 0 && (
        <div className="absolute bottom-2 right-2 space-y-0.5 text-right">
          {readouts.map((r, i) => (
            <div key={i} className="text-[9px] font-mono" style={{ color: colors.main, opacity: 0.6 }}>
              {r.label}:{r.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
