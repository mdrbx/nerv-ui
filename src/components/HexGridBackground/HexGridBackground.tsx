"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface HexGridBackgroundProps extends MotionSafeHTMLAttributes {
  /** Color of the hexagon strokes */
  color?: string;
  /** Overall opacity of the grid */
  opacity?: number;
  /** Size of hexagons */
  hexSize?: number;
  /** Enable pulsing animation */
  animated?: boolean;
  /** Optional className */
  className?: string;
}

export const HexGridBackground = forwardRef<HTMLDivElement, HexGridBackgroundProps>(function HexGridBackground({
  color = "#FF9900",
  opacity = 0.08,
  hexSize = 30,
  animated = true,
  className = "",
  ...rest
}, ref) {
  // Calculate hex dimensions
  const w = hexSize * 2;
  const h = hexSize * Math.sqrt(3);
  const patternW = w * 0.75;
  const patternH = h;

  // Hex path centered at origin
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${hexSize * Math.cos(angle)},${hexSize * Math.sin(angle)}`;
  }).join(" ");

  const svgContent = (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex-grid"
          x="0"
          y="0"
          width={patternW}
          height={patternH}
          patternUnits="userSpaceOnUse"
        >
          {/* Primary hex */}
          <polygon
            points={hexPoints}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            transform={`translate(${hexSize}, ${h / 2})`}
          />
          {/* Offset hex for honeycomb pattern */}
          <polygon
            points={hexPoints}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            transform={`translate(${hexSize + patternW / 2}, ${h / 2 + patternH / 2})`}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-grid)" />
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        ref={ref}
        {...rest}
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [opacity, opacity * 1.5, opacity] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {svgContent}
      </motion.div>
    );
  }

  return (
    <div ref={ref} {...rest} className="absolute inset-0 pointer-events-none">{svgContent}</div>
  );
});
