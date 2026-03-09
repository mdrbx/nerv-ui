"use client";

import type { ReactNode } from "react";

export interface EvaCardProps {
  /** Card header title (displayed uppercase) */
  title?: string;
  /** Main content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Visual variant — default (green border) or alert (red border + glow) */
  variant?: "default" | "alert";
  /** Corner cut size in pixels */
  cutSize?: number;
  /** Additional CSS classes */
  className?: string;
}

const VARIANT_CONFIG = {
  default: {
    borderColor: "#00FF00",
    titleColor: "text-eva-green",
    glowColor: "rgba(0, 255, 0, 0.08)",
    decorColor: "bg-eva-green",
  },
  alert: {
    borderColor: "#FF0000",
    titleColor: "text-eva-red",
    glowColor: "rgba(255, 0, 0, 0.12)",
    decorColor: "bg-eva-red",
  },
};

/**
 * Brutalist card container with armour-plate clip-path corner cut.
 * Used for status displays, forms, and data grouping.
 */
export function EvaCard({
  title,
  children,
  footer,
  variant = "default",
  cutSize = 20,
  className = "",
}: EvaCardProps) {
  const config = VARIANT_CONFIG[variant];

  // Clip-path: rectangle with top-right corner cut
  const clipPath = `polygon(0 0, calc(100% - ${cutSize}px) 0, 100% ${cutSize}px, 100% 100%, 0 100%)`;

  return (
    <div
      className={`relative bg-eva-black ${className}`}
      style={{
        clipPath,
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 0 12px ${config.glowColor}, inset 0 0 6px ${config.glowColor}`,
      }}
    >
      {/* Corner cut decoration — small triangle at the cut edge */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: cutSize + 1,
          height: cutSize + 1,
        }}
      >
        <svg
          width={cutSize + 1}
          height={cutSize + 1}
          viewBox={`0 0 ${cutSize + 1} ${cutSize + 1}`}
          className="absolute top-0 right-0"
        >
          <line
            x1="0"
            y1="0"
            x2={cutSize}
            y2={cutSize}
            stroke={config.borderColor}
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Header */}
      {title && (
        <div
          className="px-4 py-2.5 border-b flex items-center gap-2"
          style={{ borderColor: config.borderColor }}
        >
          <span
            className={`text-[10px] ${config.titleColor} opacity-70`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            &#9632;
          </span>
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${config.titleColor}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-4">{children}</div>

      {/* Footer */}
      {footer && (
        <div
          className="px-4 py-2 border-t text-[10px] font-mono text-eva-white/50"
          style={{ borderColor: config.borderColor }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
