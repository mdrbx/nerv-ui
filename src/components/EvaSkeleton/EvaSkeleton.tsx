"use client";

import { type HTMLAttributes, forwardRef } from "react";

export interface EvaSkeletonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Width (CSS value or number in px) */
  width?: string | number;
  /** Height (CSS value or number in px) */
  height?: string | number;
  /** Shape variant */
  variant?: "text" | "rectangular" | "circular";
  /** Number of lines (only for text variant) */
  lines?: number;
  /** Additional class names */
  className?: string;
}

const shimmerKeyframes = `
@keyframes eva-scanline {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

export const EvaSkeleton = forwardRef<HTMLDivElement, EvaSkeletonProps>(
  function EvaSkeleton(
    {
      width,
      height,
      variant = "text",
      lines = 1,
      className = "",
      style: styleProp,
      ...rest
    },
    ref
  ) {
    const resolveWidth = typeof width === "number" ? `${width}px` : width;
    const resolveHeight = typeof height === "number" ? `${height}px` : height;

    const baseClasses = `
      relative overflow-hidden bg-eva-dark-gray/50
      border border-eva-mid-gray/20
    `;

    const shimmerOverlay = (
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.06) 40%, rgba(255,106,0,0.12) 50%, rgba(255,106,0,0.06) 60%, transparent 100%)",
          animation: "eva-scanline 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    );

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          className={`flex flex-col gap-2 ${className}`}
          role="status"
          aria-label="Loading"
          {...rest}
        >
          <style>{shimmerKeyframes}</style>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`${baseClasses} h-3`}
              style={{
                width:
                  i === lines - 1
                    ? resolveWidth
                      ? `calc(${resolveWidth} * 0.7)`
                      : "70%"
                    : resolveWidth || "100%",
              }}
            >
              {shimmerOverlay}
            </div>
          ))}
        </div>
      );
    }

    const variantStyles: Record<string, string> = {
      text: "",
      rectangular: "",
      circular: "rounded-full",
    };

    const defaultDimensions: Record<string, { w?: string; h?: string }> = {
      text: { w: "100%", h: "12px" },
      rectangular: { w: "100%", h: "80px" },
      circular: { w: "48px", h: "48px" },
    };

    const defaults = defaultDimensions[variant];

    return (
      <>
        <style>{shimmerKeyframes}</style>
        <div
          ref={ref}
          className={`${baseClasses} ${variantStyles[variant]} ${className}`}
          role="status"
          aria-label="Loading"
          style={{
            width: resolveWidth || defaults.w,
            height: resolveHeight || defaults.h,
            ...styleProp,
          }}
          {...rest}
        >
          {shimmerOverlay}
        </div>
      </>
    );
  }
);
