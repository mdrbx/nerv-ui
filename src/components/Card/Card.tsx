"use client";

import { forwardRef, type ReactNode } from "react";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "title"> {
  /** Card header title (displayed uppercase) */
  title?: string;
  /** Main content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Visual variant -- structural panel, alert, minimal hud, or rounded video overlay plate */
  variant?: "default" | "alert" | "hud" | "video";
  /** Legacy corner-cut prop retained for API compatibility */
  cutSize?: number;
  /** Additional CSS classes */
  className?: string;
}

const VARIANT_CONFIG = {
  default: {
    borderColor: "#00FF00",
    titleColor: "text-eva-green",
    panelColor: "rgba(0, 255, 0, 0.08)",
    lineColor: "rgba(0, 255, 0, 0.35)",
    surface: "linear-gradient(180deg, rgba(3, 14, 3, 0.98) 0%, rgba(0, 0, 0, 0.98) 100%)",
  },
  alert: {
    borderColor: "#FF0000",
    titleColor: "text-eva-red",
    panelColor: "rgba(255, 0, 0, 0.08)",
    lineColor: "rgba(255, 0, 0, 0.35)",
    surface: "linear-gradient(180deg, rgba(18, 1, 1, 0.98) 0%, rgba(0, 0, 0, 0.98) 100%)",
  },
  hud: {
    borderColor: "rgba(224, 224, 224, 0.22)",
    titleColor: "text-white/75",
    panelColor: "rgba(224, 224, 224, 0.08)",
    lineColor: "rgba(224, 224, 224, 0.2)",
    surface: "linear-gradient(180deg, rgba(4, 6, 7, 0.82) 0%, rgba(0, 0, 0, 0.68) 100%)",
  },
  video: {
    borderColor: "#FF9900",
    titleColor: "text-eva-orange",
    panelColor: "rgba(255, 153, 0, 0.08)",
    lineColor: "rgba(255, 184, 90, 0.48)",
    surface: "linear-gradient(180deg, rgba(7, 7, 7, 0.92) 0%, rgba(0, 0, 0, 0.82) 100%)",
  },
} as const;

/**
 * Segmented NERV-style inspection panel.
 * Used for status displays, forms, and data grouping.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      title,
      children,
      footer,
      variant = "default",
      cutSize = 20,
      className = "",
      ...rest
    },
    ref
  ) {
    const config = VARIANT_CONFIG[variant];
    const isHud = variant === "hud";
    const isVideo = variant === "video";
    const videoRadius = 14;

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${isHud ? "backdrop-blur-sm" : ""} ${className}`}
        style={{
          border: `1px solid ${config.borderColor}`,
          background: config.surface,
          boxShadow: isVideo
            ? `0 0 0 1px ${config.panelColor}, 0 0 12px ${config.panelColor}`
            : isHud
              ? undefined
              : `inset 0 0 0 1px ${config.panelColor}`,
          clipPath: isVideo ? `inset(0 round ${videoRadius}px)` : undefined,
        }}
        {...rest}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(180deg, transparent 0%, ${config.panelColor} 100%)`,
          }}
        />
        <div
          className="absolute left-0 right-0 top-[26px] h-px pointer-events-none"
          style={{ backgroundColor: config.lineColor }}
        />
        <div
          className="absolute left-0 right-0 bottom-[22px] h-px pointer-events-none"
          style={{ backgroundColor: config.lineColor }}
        />
        {isVideo && (
          <>
            <div
              className="absolute inset-[2px] pointer-events-none"
              style={{
                border: `1px solid ${config.lineColor}`,
                clipPath: `inset(0 round ${videoRadius - 2}px)`,
              }}
            />
            <div
              className="absolute left-[10px] right-[10px] top-[8px] h-px pointer-events-none"
              style={{ backgroundColor: config.lineColor }}
            />
            <div
              className="absolute left-[10px] right-[10px] bottom-[8px] h-px pointer-events-none"
              style={{ backgroundColor: config.lineColor }}
            />
          </>
        )}
        <div
          className="absolute top-0 left-0 h-[22px] pointer-events-none"
          style={{
            width: "100%",
            borderBottom: `1px solid ${config.lineColor}`,
          }}
        />
        <div
          className="absolute top-0 left-[10px] h-[6px] w-[56px] pointer-events-none"
          style={{ backgroundColor: config.borderColor }}
        />
        <div
          className="absolute bottom-[6px] left-[10px] right-[10px] h-px pointer-events-none"
          style={{ backgroundColor: config.lineColor }}
        />

        {title && !isVideo && (
          <div className="relative z-10 flex min-h-[26px] items-center gap-3 px-3 pb-2 pt-1.5">
            <span
              className={`text-[9px] uppercase tracking-[0.28em] ${config.titleColor}`}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              SYS
            </span>
            <span
              className="h-[9px] w-[9px]"
              style={{ backgroundColor: config.borderColor }}
            />
            <span
              className={`text-[11px] uppercase tracking-[0.24em] font-bold ${config.titleColor}`}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {title}
            </span>
            <span
              className="ml-auto text-[9px] uppercase tracking-[0.22em] text-eva-white/35"
              style={{ fontFamily: "var(--font-eva-mono)" }}
            >
              PANEL
            </span>
          </div>
        )}

        {title && isVideo && (
          <div className="relative z-10 flex items-start gap-3 px-4 pb-1 pt-3">
            <div className="flex flex-col gap-0.5">
              <span
                className={`text-[9px] uppercase tracking-[0.18em] ${config.titleColor}`}
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                SUBJECT // VIDEO RELAY
              </span>
              <span
                className={`text-[clamp(1.05rem,2vw,1.55rem)] uppercase leading-[0.88] tracking-[0.03em] ${config.titleColor}`}
                style={{
                  fontFamily: "var(--font-eva-display)",
                  textShadow: "0 0 10px rgba(255, 153, 0, 0.16)",
                }}
              >
                {title}
              </span>
            </div>
            <span
              className="ml-auto pt-0.5 text-[9px] uppercase tracking-[0.2em] text-eva-orange/70"
              style={{ fontFamily: "var(--font-eva-mono)" }}
            >
              FEED-01
            </span>
          </div>
        )}

        <div className={`relative z-10 ${title ? (isVideo ? "px-4 pb-3 pt-1.5" : "px-3 pb-3 pt-1.5") : (isVideo ? "px-4 py-3" : "px-3 py-3")}`}>
          {children}
        </div>

        {footer && (
          <div
            className={`relative z-10 flex items-center gap-3 ${isVideo ? "px-4 pb-3" : "px-3 pb-2 pt-1"} text-[9px] uppercase tracking-[0.22em] ${isVideo ? "text-eva-orange/70" : "text-eva-white/55"}`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            <span className={config.titleColor}>{isVideo ? "CAMERA" : "LOG"}</span>
            <span className="h-px flex-1 bg-current opacity-20" />
            {footer}
          </div>
        )}
      </div>
    );
  }
);
