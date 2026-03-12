"use client";

import { forwardRef, useState, useEffect, useRef, useCallback } from "react";

export interface SegmentDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "color"> {
  /** Initial value in seconds (for countdown mode) or direct numeric display */
  value?: number;
  /** Whether to count down automatically */
  countdown?: boolean;
  /** Number of digit groups: "H:MM:SS" (default), "MM:SS", "SS" */
  format?: "H:MM:SS" | "MM:SS" | "SS" | "raw";
  /** Fixed number of digits for raw mode */
  digits?: number;
  /** Color when normal */
  color?: "orange" | "red" | "green" | "cyan";
  /** Threshold (seconds) below which color turns red */
  criticalThreshold?: number;
  /** Label text above the display */
  label?: string;
  /** Sub-label text */
  subLabel?: string;
  /** Size multiplier */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show the colon separator blinking */
  blinkSeparator?: boolean;
  /** Called when countdown reaches zero */
  onComplete?: () => void;
  className?: string;
}

const colorMap = {
  orange: { on: "#FF9900", off: "#1A1200", glow: "rgba(255, 153, 0, 0.4)" },
  red: { on: "#FF0000", off: "#1A0000", glow: "rgba(255, 0, 0, 0.4)" },
  green: { on: "#00FF00", off: "#001A00", glow: "rgba(0, 255, 0, 0.4)" },
  cyan: { on: "#00FFFF", off: "#001A1A", glow: "rgba(0, 255, 255, 0.4)" },
};

const sizeMap = {
  sm: { digit: 32, gap: 2, stroke: 4 },
  md: { digit: 56, gap: 3, stroke: 6 },
  lg: { digit: 80, gap: 4, stroke: 8 },
  xl: { digit: 120, gap: 6, stroke: 10 },
};

// 7-segment mapping: [top, topRight, bottomRight, bottom, bottomLeft, topLeft, middle]
const segmentMap: Record<string, boolean[]> = {
  "0": [true, true, true, true, true, true, false],
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
};

function SevenSegDigit({
  char,
  width,
  height,
  strokeWidth,
  onColor,
  offColor,
}: {
  char: string;
  width: number;
  height: number;
  strokeWidth: number;
  onColor: string;
  offColor: string;
}) {
  const segments = segmentMap[char] || [false, false, false, false, false, false, false];
  const pad = strokeWidth * 0.8;
  const halfH = height / 2;
  const segW = width - pad * 2;

  // Segment path definitions: [top, topRight, bottomRight, bottom, bottomLeft, topLeft, middle]
  const segPaths = [
    // top
    `M ${pad + strokeWidth} ${pad} L ${pad + segW - strokeWidth} ${pad}`,
    // top-right
    `M ${width - pad} ${pad + strokeWidth} L ${width - pad} ${halfH - strokeWidth / 2}`,
    // bottom-right
    `M ${width - pad} ${halfH + strokeWidth / 2} L ${width - pad} ${height - pad - strokeWidth}`,
    // bottom
    `M ${pad + strokeWidth} ${height - pad} L ${pad + segW - strokeWidth} ${height - pad}`,
    // bottom-left
    `M ${pad} ${halfH + strokeWidth / 2} L ${pad} ${height - pad - strokeWidth}`,
    // top-left
    `M ${pad} ${pad + strokeWidth} L ${pad} ${halfH - strokeWidth / 2}`,
    // middle
    `M ${pad + strokeWidth} ${halfH} L ${pad + segW - strokeWidth} ${halfH}`,
  ];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {segPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={segments[i] ? onColor : offColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
        />
      ))}
    </svg>
  );
}

function formatTime(totalSeconds: number, format: string): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  if (format === "SS") return String(s).padStart(2, "0");
  if (format === "MM:SS") {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  // H:MM:SS
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export const SegmentDisplay = forwardRef<HTMLDivElement, SegmentDisplayProps>(
  function SegmentDisplay(
    {
      value = 0,
      countdown = false,
      format = "H:MM:SS",
      digits,
      color = "orange",
      criticalThreshold = 60,
      label,
      subLabel,
      size = "lg",
      blinkSeparator = true,
      onComplete,
      className = "",
      ...rest
    },
    ref
  ) {
    const [currentValue, setCurrentValue] = useState(value);
    const [blinkOn, setBlinkOn] = useState(true);
    const completedRef = useRef(false);

    // Countdown
    useEffect(() => {
      if (!countdown) {
        setCurrentValue(value);
        return;
      }
      setCurrentValue(value);
      completedRef.current = false;
      const interval = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete?.();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [value, countdown, onComplete]);

    // Blink colons
    useEffect(() => {
      if (!blinkSeparator) return;
      const interval = setInterval(() => setBlinkOn((b) => !b), 500);
      return () => clearInterval(interval);
    }, [blinkSeparator]);

    const isCritical = countdown && currentValue <= criticalThreshold;
    const activeColor = isCritical ? "red" : color;
    const colors = colorMap[activeColor];
    const dims = sizeMap[size];

    const displayStr =
      format === "raw"
        ? String(currentValue).padStart(digits || 4, "0")
        : formatTime(currentValue, format);

    return (
      <div ref={ref} className={`inline-flex flex-col items-center ${className}`} {...rest}>
        {/* Label */}
        {label && (
          <div
            className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
            style={{
              fontFamily: "var(--font-eva-display)",
              color: colors.on,
              textShadow: `0 0 8px ${colors.glow}`,
            }}
          >
            {label}
          </div>
        )}

        {/* Display */}
        <div
          className="flex items-center gap-1 px-4 py-3"
          style={{
            background: "linear-gradient(180deg, #0A0A0A 0%, #050505 100%)",
            border: `1px solid ${colors.on}30`,
            boxShadow: `0 0 20px ${colors.glow}, inset 0 0 10px rgba(0,0,0,0.8)`,
          }}
        >
          {displayStr.split("").map((char, i) => {
            if (char === ":") {
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center mx-1"
                  style={{
                    width: dims.stroke * 2,
                    height: dims.digit,
                    gap: dims.digit * 0.2,
                  }}
                >
                  <div
                    style={{
                      width: dims.stroke,
                      height: dims.stroke,
                      backgroundColor:
                        blinkSeparator && !blinkOn ? colorMap[activeColor].off : colors.on,
                      boxShadow: blinkOn ? `0 0 6px ${colors.glow}` : "none",
                    }}
                  />
                  <div
                    style={{
                      width: dims.stroke,
                      height: dims.stroke,
                      backgroundColor:
                        blinkSeparator && !blinkOn ? colorMap[activeColor].off : colors.on,
                      boxShadow: blinkOn ? `0 0 6px ${colors.glow}` : "none",
                    }}
                  />
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  filter: `drop-shadow(0 0 4px ${colors.glow})`,
                  marginRight: dims.gap,
                }}
              >
                <SevenSegDigit
                  char={char}
                  width={dims.digit * 0.6}
                  height={dims.digit}
                  strokeWidth={dims.stroke}
                  onColor={colors.on}
                  offColor={colorMap[activeColor].off}
                />
              </div>
            );
          })}
        </div>

        {/* Sub-label */}
        {subLabel && (
          <div
            className="text-[10px] font-mono uppercase tracking-[0.15em] mt-2"
            style={{ color: colors.on, opacity: 0.5 }}
          >
            {subLabel}
          </div>
        )}
      </div>
    );
  }
);
