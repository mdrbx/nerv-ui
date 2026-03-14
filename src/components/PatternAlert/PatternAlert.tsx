"use client";

import { forwardRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CameraOverlayPlate } from "@/components/_internal/CameraOverlayPlate";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface PatternAlertProps extends MotionSafeHTMLAttributes {
  /** Alert designation (e.g. "3rd ANGEL", "15th ANGEL") */
  designation: string;
  /** Pattern classification */
  pattern?: string;
  /** Blood type classification */
  bloodType?: "BLUE" | "ORANGE" | "RED" | "GREEN" | "UNKNOWN";
  /** Whether the alert is visible */
  visible?: boolean;
  /** Scale range (-N to +N) */
  scaleRange?: number;
  /** Measurement unit label */
  unit?: string;
  /** Optional subtitle / additional info */
  subtitle?: string;
  /** Color theme */
  color?: "orange" | "red" | "cyan" | "green";
  /** Whether to show animated scanline */
  animated?: boolean;
  className?: string;
}

const colorMap = {
  orange: { main: "#FF9900", glow: "rgba(255, 153, 0, 0.2)", dim: "rgba(255, 153, 0, 0.14)" },
  red: { main: "#FF2B1D", glow: "rgba(255, 43, 29, 0.18)", dim: "rgba(255, 43, 29, 0.14)" },
  cyan: { main: "#00F6FF", glow: "rgba(0, 246, 255, 0.18)", dim: "rgba(0, 246, 255, 0.14)" },
  green: { main: "#00FF00", glow: "rgba(0, 255, 0, 0.18)", dim: "rgba(0, 255, 0, 0.14)" },
} as const;

const bloodTypeColors: Record<string, string> = {
  BLUE: "#5DA2FF",
  ORANGE: "#FF9900",
  RED: "#FF2B1D",
  GREEN: "#00FF00",
  UNKNOWN: "#9A9A9A",
};

export const PatternAlert = forwardRef<HTMLDivElement, PatternAlertProps>(function PatternAlert(
  {
    designation,
    pattern = "PATTERN",
    bloodType = "BLUE",
    visible = true,
    scaleRange = 3,
    unit = "MAGNIFICATION : x05",
    subtitle,
    color = "orange",
    animated = true,
    className = "",
    ...rest
  },
  ref
) {
  const theme = colorMap[color];
  const bloodColor = bloodTypeColors[bloodType] || bloodTypeColors.UNKNOWN;
  const scaleMarks = Array.from({ length: scaleRange * 2 + 1 }, (_, index) => index - scaleRange);
  const overlayMainStyle = {
    "--overlay-main": theme.main,
  } as CSSProperties;
  const overlayLiveStyle = {
    "--overlay-main": theme.main,
    "--overlay-glow": theme.glow,
  } as CSSProperties;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          {...rest}
          className={`relative overflow-hidden bg-black ${className}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            minHeight: "188px",
            border: `1px solid ${theme.dim}`,
            boxShadow: `inset 0 0 0 1px ${theme.dim}, 0 0 20px ${theme.glow}`,
          }}
        >
          {animated && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)",
              }}
            />
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_45%)]" />
          <div className="absolute left-4 right-4 top-4 h-px bg-white/12" />
          <div className="absolute left-4 right-4 bottom-4 h-px bg-white/12" />
          <div className="absolute left-[24%] top-[34%] h-px w-[52%] bg-white/10" />
          <div className="absolute top-[24%] bottom-[24%] left-1/2 w-px -translate-x-1/2 bg-white/8" />

          <div className="camera-overlay-cross left-[14%] top-[30%]" style={overlayMainStyle} />
          <div className="camera-overlay-cross right-[16%] bottom-[28%]" style={overlayMainStyle} />

          <div className="absolute left-3 top-3 max-w-[16rem] sm:left-4 sm:top-4">
            <CameraOverlayPlate color={color}>
              <div className="camera-overlay-meta">{pattern}</div>
              <div
                className="camera-overlay-title"
                style={{ fontSize: "clamp(0.92rem, 1.25vw, 1.28rem)" }}
              >
                blood type <span style={{ color: bloodColor }}>{bloodType}</span>
              </div>
              <div className="camera-overlay-detail">pattern analysis locked</div>
            </CameraOverlayPlate>
          </div>

          <div className="absolute right-3 top-3 flex flex-col items-end gap-2 sm:right-4 sm:top-4">
            <div
              className="text-[10px] uppercase tracking-[0.16em] text-eva-white/42"
              style={{ fontFamily: "var(--font-eva-mono)" }}
            >
              {unit}
            </div>
            <span
              className="camera-overlay-live"
              style={overlayLiveStyle}
            >
              live
            </span>
          </div>

          <div className="absolute left-4 right-4 top-[42%] hidden sm:grid sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
            {scaleMarks.map((mark) => (
              <div key={`top-${mark}`} className="flex flex-col items-center">
                <div className="h-2 w-px" style={{ backgroundColor: theme.main, opacity: mark === 0 ? 0.9 : 0.36 }} />
                <span
                  className="mt-1 text-[9px] uppercase tracking-[0.06em]"
                  style={{
                    color: theme.main,
                    opacity: mark === 0 ? 1 : 0.6,
                    fontFamily: "var(--font-eva-mono)",
                  }}
                >
                  {mark > 0 ? `+${mark}` : `${mark}`}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 right-3 max-w-[82%] sm:bottom-4 sm:right-4 sm:max-w-[68%]">
            <CameraOverlayPlate color={color} className="ml-auto">
              <div className="camera-overlay-meta text-right">subject</div>
              <div className="camera-overlay-title text-right">{designation}</div>
              <div className="camera-overlay-detail text-right">
                {subtitle ?? "camera no.012 left // signal held"}
              </div>
            </CameraOverlayPlate>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
