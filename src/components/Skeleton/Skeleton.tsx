"use client";

import { type HTMLAttributes, forwardRef } from "react";

export interface SkeletonProps
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

const animationKeyframes = `
@keyframes nerv-skeleton-scan {
  0% { transform: translateY(-135%); opacity: 0; }
  18% { opacity: 0.18; }
  46% { opacity: 0.46; }
  100% { transform: translateY(220%); opacity: 0; }
}

@keyframes nerv-skeleton-flicker {
  0%, 100% { opacity: 0.74; }
  45% { opacity: 0.94; }
  70% { opacity: 0.82; }
}

@keyframes nerv-skeleton-line-pulse {
  0%, 100% {
    opacity: 0.74;
  }
  50% {
    opacity: 0.88;
  }
}

@keyframes nerv-skeleton-cell-pulse {
  0%, 100% {
    opacity: 0.24;
    transform: scale(0.82);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes nerv-skeleton-grid-drift {
  0% { transform: translateX(-120%); opacity: 0; }
  22% { opacity: 0.1; }
  58% { opacity: 0.22; }
  100% { transform: translateX(220%); opacity: 0; }
}
`;

const basePanelClasses =
  "relative overflow-hidden border border-nerv-mid-gray/30 bg-black";

function resolveDimension(value?: string | number) {
  if (typeof value === "number") return `${value}px`;
  return value;
}

function renderCrtLine(width: string, height: string, key?: number) {
  return (
    <div
      key={key}
      className={`${basePanelClasses} h-3`}
      style={{
        width,
        height,
        animation: "nerv-skeleton-line-pulse 1.7s ease-in-out infinite",
      }}
    >
      <span
        className="absolute inset-[1px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            repeating-linear-gradient(
              180deg,
              rgba(28,64,38,0.85) 0 2px,
              rgba(56,115,71,0.75) 2px 3px,
              rgba(16,28,20,0.95) 3px 6px
            )
          `,
          animation: "nerv-skeleton-flicker 2.6s steps(2, end) infinite",
        }}
      />
      <span
        className="absolute inset-x-[1px] top-[-45%] h-[45%] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(174,255,202,0.08) 18%, rgba(120,255,162,0.42) 52%, rgba(174,255,202,0.08) 82%, transparent 100%)",
          animation: "nerv-skeleton-scan 2.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function renderSquareField(
  variant: "rectangular" | "circular",
  width: string,
  height: string,
  className: string
) {
  const columns = variant === "circular" ? 7 : 12;
  const rows = variant === "circular" ? 7 : 8;
  const totalCells = columns * rows;

  return (
    <div
      className={`${basePanelClasses} ${variant === "circular" ? "rounded-full" : ""} ${className}`}
      role="status"
      aria-label="Loading"
      style={{
        width,
        height,
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 16px rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute inset-[10%] grid"
        aria-hidden="true"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gap: "0.28rem",
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => {
          const intensity = 0.28 + ((index * 7) % 5) * 0.12;

          return (
            <span
              key={index}
              className="h-1.5 w-1.5 place-self-center bg-white"
              style={{
                opacity: intensity,
                boxShadow: "0 0 5px rgba(255,255,255,0.12)",
                animation: "nerv-skeleton-cell-pulse 1.4s ease-in-out infinite",
                animationDelay: `${((index % columns) * 0.06) + (Math.floor(index / columns) * 0.04)}s`,
              }}
            />
          );
        })}
      </div>

      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.04), transparent 28%, rgba(255,255,255,0.02))
          `,
        }}
      />
      <span
        className="absolute inset-y-0 left-[-32%] w-[32%] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 26%, rgba(255,255,255,0.14) 58%, transparent 100%)",
          animation: "nerv-skeleton-grid-drift 2.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
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
    const resolveWidth = resolveDimension(width);
    const resolveHeight = resolveDimension(height);

    const defaultDimensions: Record<
      NonNullable<SkeletonProps["variant"]>,
      { w: string; h: string }
    > = {
      text: { w: "100%", h: "14px" },
      rectangular: { w: "100%", h: "88px" },
      circular: { w: "56px", h: "56px" },
    };

    const defaults = defaultDimensions[variant];

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          className={`flex flex-col gap-1.5 ${className}`}
          role="status"
          aria-label="Loading"
          style={styleProp}
          {...rest}
        >
          <style>{animationKeyframes}</style>
          {Array.from({ length: lines }).map((_, index) =>
            renderCrtLine(
              index === lines - 1
                ? resolveWidth
                  ? `calc(${resolveWidth} * 0.72)`
                  : "72%"
                : resolveWidth || defaults.w,
              resolveHeight || defaults.h,
              index
            )
          )}
        </div>
      );
    }

    if (variant === "text") {
      return (
        <>
          <style>{animationKeyframes}</style>
          <div
            ref={ref}
            className={className}
            role="status"
            aria-label="Loading"
            style={styleProp}
            {...rest}
          >
            {renderCrtLine(resolveWidth || defaults.w, resolveHeight || defaults.h)}
          </div>
        </>
      );
    }

    return (
      <>
        <style>{animationKeyframes}</style>
        <div ref={ref} style={styleProp} {...rest}>
          {renderSquareField(
            variant,
            resolveWidth || defaults.w,
            resolveHeight || defaults.h,
            className
          )}
        </div>
      </>
    );
  }
);
