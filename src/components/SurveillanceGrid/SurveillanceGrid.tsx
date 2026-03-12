"use client";

import { forwardRef, useState, useEffect, ReactNode } from "react";

export interface SurveillanceFeed {
  /** Unique feed identifier (e.g. "CAM-01") */
  id: string;
  /** Location label */
  label: string;
  /** Optional secondary label */
  subLabel?: string;
  /** Feed status */
  status?: "active" | "signal-lost" | "warning" | "offline";
  /** Optional content to render inside the feed cell */
  children?: ReactNode;
  /** Optional image URL */
  imageUrl?: string;
}

export interface SurveillanceGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "color"> {
  /** Array of camera feed definitions */
  feeds: SurveillanceFeed[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Color theme */
  color?: "green" | "cyan" | "orange";
  /** Title displayed at top */
  title?: string;
  /** Whether to show the timestamp */
  showTimestamp?: boolean;
  /** Whether to animate the SIGNAL LOST overlay */
  animated?: boolean;
  className?: string;
}

const statusConfig = {
  active: {
    borderColor: "rgba(0, 255, 0, 0.3)",
    indicator: "#00FF00",
    label: "",
  },
  "signal-lost": {
    borderColor: "rgba(255, 153, 0, 0.4)",
    indicator: "#FF9900",
    label: "SIGNAL LOST",
  },
  warning: {
    borderColor: "rgba(255, 0, 0, 0.4)",
    indicator: "#FF0000",
    label: "WARNING",
  },
  offline: {
    borderColor: "rgba(85, 85, 85, 0.3)",
    indicator: "#555555",
    label: "OFFLINE",
  },
};

const colorThemes = {
  green: { text: "#00FF00", border: "rgba(0, 255, 0, 0.2)", headerBg: "rgba(0, 255, 0, 0.05)" },
  cyan: { text: "#00FFFF", border: "rgba(0, 255, 255, 0.2)", headerBg: "rgba(0, 255, 255, 0.05)" },
  orange: { text: "#FF9900", border: "rgba(255, 153, 0, 0.2)", headerBg: "rgba(255, 153, 0, 0.05)" },
};

export const SurveillanceGrid = forwardRef<HTMLDivElement, SurveillanceGridProps>(
  function SurveillanceGrid(
    {
      feeds,
      columns = 3,
      color = "green",
      title,
      showTimestamp = true,
      animated = true,
      className = "",
      ...rest
    },
    ref
  ) {
    const [time, setTime] = useState("");
    const theme = colorThemes[color];

    useEffect(() => {
      if (!showTimestamp) return;
      const update = () => {
        const now = new Date();
        setTime(
          `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`
        );
      };
      update();
      const interval = setInterval(update, 100);
      return () => clearInterval(interval);
    }, [showTimestamp]);

    const gridCols = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];

    return (
      <div
        ref={ref}
        className={`bg-eva-black ${className}`}
        style={{ border: `1px solid ${theme.border}` }}
        {...rest}
      >
        {/* Header */}
        {(title || showTimestamp) && (
          <div
            className="flex items-center justify-between px-3 py-1.5"
            style={{
              borderBottom: `1px solid ${theme.border}`,
              backgroundColor: theme.headerBg,
            }}
          >
            {title && (
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-eva-display)", color: theme.text }}
              >
                {title}
              </span>
            )}
            {showTimestamp && (
              <span className="text-[10px] font-mono" style={{ color: theme.text, opacity: 0.6 }}>
                {time}
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridCols} gap-0`}>
          {feeds.map((feed) => {
            const status = statusConfig[feed.status || "active"];
            const isLost = feed.status === "signal-lost" || feed.status === "offline";

            return (
              <div
                key={feed.id}
                className="relative overflow-hidden"
                style={{
                  border: `1px solid ${status.borderColor}`,
                  backgroundColor: "#050505",
                  aspectRatio: "16 / 10",
                }}
              >
                {/* Background content / image */}
                {feed.imageUrl && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${feed.imageUrl})`,
                      opacity: isLost ? 0.15 : 0.5,
                      filter: isLost ? "grayscale(1)" : "none",
                    }}
                  />
                )}

                {/* Children content */}
                {feed.children && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {feed.children}
                  </div>
                )}

                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                  }}
                />

                {/* Status overlay */}
                {status.label && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${animated ? "animate-pulse" : ""}`}
                  >
                    <div
                      className="px-3 py-1.5"
                      style={{
                        border: `2px solid ${status.indicator}`,
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          fontFamily: "var(--font-eva-display)",
                          color: status.indicator,
                        }}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                )}

                {/* ID badge */}
                <div className="absolute top-1 left-1 flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5"
                    style={{
                      backgroundColor: status.indicator,
                      boxShadow: `0 0 4px ${status.indicator}`,
                    }}
                  />
                  <span
                    className="text-[9px] font-mono uppercase"
                    style={{ color: theme.text, opacity: 0.8 }}
                  >
                    {feed.id}
                  </span>
                </div>

                {/* Location label */}
                <div className="absolute bottom-1 left-1 right-1">
                  <div
                    className="text-[10px] font-bold uppercase truncate"
                    style={{
                      fontFamily: "var(--font-eva-display)",
                      color: "#E0E0E0",
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {feed.label}
                  </div>
                  {feed.subLabel && (
                    <div
                      className="text-[8px] font-mono uppercase truncate"
                      style={{ color: theme.text, opacity: 0.5 }}
                    >
                      {feed.subLabel}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
