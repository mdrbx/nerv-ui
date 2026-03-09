"use client";

import { motion } from "framer-motion";

export interface WireframeLoaderProps {
  /** Size of the octahedron in pixels */
  size?: number;
  /** Stroke color — maps to EVA design tokens */
  color?: "cyan" | "green" | "orange" | "red" | "magenta";
  /** Optional label below the octahedron */
  label?: string;
  /** Rotation speed in seconds per revolution */
  speed?: number;
  /** Additional CSS classes */
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  cyan: "#00FFFF",
  green: "#00FF00",
  orange: "#FF9900",
  red: "#FF0000",
  magenta: "#FF00FF",
};

/**
 * Wireframe octahedron loader inspired by Ramiel (the 5th Angel).
 * Uses SVG polygon + framer-motion for draw-in and continuous 3D rotation.
 */
export function WireframeLoader({
  size = 64,
  color = "cyan",
  label = "PROCESSING...",
  speed = 2.5,
  className = "",
}: WireframeLoaderProps) {
  const hex = COLOR_MAP[color] ?? COLOR_MAP.cyan;

  // Octahedron isometric projection — diamond with cross
  // Viewbox 0 0 100 100, centered at (50, 50)
  const top = "50,5";
  const right = "95,50";
  const bottom = "50,95";
  const left = "5,50";

  const outerDiamond = `${top} ${right} ${bottom} ${left}`;

  // Total perimeter of the diamond for stroke-dash animation
  // Each side ≈ √((45)² + (45)²) ≈ 63.6, total ≈ 254.5
  const perimeterOuter = 255;
  // Cross lines: horizontal 90 + vertical 90 = 180
  const perimeterCross = 180;

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 ${className}`}
    >
      {/* 3D rotation wrapper */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
        style={{ perspective: 200 }}
      >
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer diamond (octahedron silhouette) */}
          <motion.polygon
            points={outerDiamond}
            stroke={hex}
            strokeWidth="1.5"
            strokeLinejoin="miter"
            fill="none"
            initial={{ strokeDasharray: perimeterOuter, strokeDashoffset: perimeterOuter }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 4px ${hex})`,
            }}
          />

          {/* Central horizontal edge */}
          <motion.line
            x1="5"
            y1="50"
            x2="95"
            y2="50"
            stroke={hex}
            strokeWidth="1"
            opacity="0.5"
            initial={{ strokeDasharray: 90, strokeDashoffset: 90 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          />

          {/* Central vertical edge */}
          <motion.line
            x1="50"
            y1="5"
            x2="50"
            y2="95"
            stroke={hex}
            strokeWidth="1"
            opacity="0.5"
            initial={{ strokeDasharray: 90, strokeDashoffset: 90 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          />

          {/* Inner diamond (depth illusion — smaller, dimmer) */}
          <motion.polygon
            points="50,25 75,50 50,75 25,50"
            stroke={hex}
            strokeWidth="0.8"
            strokeLinejoin="miter"
            fill="none"
            opacity="0.3"
            initial={{ strokeDasharray: 142, strokeDashoffset: 142 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          />

          {/* Diagonal structural edges (depth lines connecting inner to outer) */}
          {[
            { x1: 50, y1: 5, x2: 75, y2: 50 },
            { x1: 50, y1: 5, x2: 25, y2: 50 },
            { x1: 50, y1: 95, x2: 75, y2: 50 },
            { x1: 50, y1: 95, x2: 25, y2: 50 },
          ].map((edge, i) => (
            <motion.line
              key={i}
              {...edge}
              stroke={hex}
              strokeWidth="0.5"
              opacity="0.2"
              initial={{ strokeDasharray: 50, strokeDashoffset: 50 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1 + i * 0.1 }}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Blinking label */}
      {label && (
        <motion.span
          className="text-[10px] uppercase tracking-[0.25em] font-bold"
          style={{
            fontFamily: "var(--font-eva-mono)",
            color: hex,
            textShadow: `0 0 6px ${hex}`,
          }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
            times: [0, 0.5, 1],
          }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
