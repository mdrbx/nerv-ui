"use client";

import { forwardRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { CameraOverlayPlate } from "@/components/_internal/CameraOverlayPlate";

type MotionSafeHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface PilotCardField {
  label: string;
  value: string;
  status?: "ok" | "warning" | "critical" | "unknown";
}

export interface PilotCardProps extends MotionSafeHTMLAttributes {
  /** Pilot designation (e.g. "FIRST.C", "THIRD.C") */
  designation: string;
  /** Pilot name */
  name: string;
  /** Unit assignment (e.g. "EVA-01", "EVA-00") */
  unit?: string;
  /** Status fields */
  fields?: PilotCardField[];
  /** Connection/plug number */
  plugNumber?: string;
  /** Overall check status */
  checkStatus?: "O.K." | "ERROR" | "OFFLINE" | "SYNC";
  /** Color theme */
  color?: "red" | "cyan" | "green" | "orange";
  /** Optional image URL for the pilot */
  imageUrl?: string;
  /** Whether to show animated entry */
  animated?: boolean;
  className?: string;
}

const colorMap = {
  red: { main: "#FF2B1D", glow: "rgba(255, 43, 29, 0.18)", dim: "rgba(255, 43, 29, 0.14)" },
  cyan: { main: "#00F6FF", glow: "rgba(0, 246, 255, 0.18)", dim: "rgba(0, 246, 255, 0.14)" },
  green: { main: "#00FF00", glow: "rgba(0, 255, 0, 0.18)", dim: "rgba(0, 255, 0, 0.14)" },
  orange: { main: "#FF9900", glow: "rgba(255, 153, 0, 0.2)", dim: "rgba(255, 153, 0, 0.14)" },
} as const;

const statusColors: Record<string, string> = {
  ok: "#00FF00",
  "O.K.": "#00FF00",
  warning: "#FF9900",
  SYNC: "#FF9900",
  critical: "#FF2B1D",
  ERROR: "#FF2B1D",
  unknown: "#7A7A7A",
  OFFLINE: "#7A7A7A",
};

export const PilotCard = forwardRef<HTMLDivElement, PilotCardProps>(function PilotCard(
  {
    designation,
    name,
    unit,
    fields = [],
    plugNumber,
    checkStatus = "O.K.",
    color = "orange",
    imageUrl,
    animated = true,
    className = "",
    ...rest
  },
  ref
) {
  const theme = colorMap[color];
  const checkColor = statusColors[checkStatus] || statusColors.unknown;
  const overlayMainStyle = {
    "--overlay-main": theme.main,
  } as CSSProperties;
  const overlayLiveStyle = {
    "--overlay-main": theme.main,
    "--overlay-glow": theme.glow,
  } as CSSProperties;

  return (
    <motion.div
      ref={ref}
      {...rest}
      className={`relative overflow-hidden bg-black ${className}`}
      style={{
        border: `1px solid ${theme.dim}`,
        boxShadow: `inset 0 0 0 1px ${theme.dim}, 0 0 18px ${theme.glow}`,
      }}
      initial={animated ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animated ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(180deg, transparent, transparent 18px, rgba(255,255,255,0.03) 18px, rgba(255,255,255,0.03) 19px)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative">
        {imageUrl ? (
          <div className="relative h-56 overflow-hidden border-b border-white/10 sm:h-64">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${imageUrl})`,
                filter: "contrast(1.05) saturate(0.72) brightness(0.92)",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.08)_32%,rgba(0,0,0,0.56))]" />
            <div className="camera-overlay-cross left-[16%] top-[22%]" style={overlayMainStyle} />
            <div className="camera-overlay-cross right-[18%] bottom-[26%]" style={overlayMainStyle} />

            <div className="absolute left-3 top-3 flex flex-col gap-2 sm:left-4 sm:top-4">
              <CameraOverlayPlate color={color} className="max-w-[13rem]">
                <div className="camera-overlay-meta">
                  TEST PLUG : {plugNumber ?? "00"}
                </div>
                <div className="camera-overlay-title">{unit ?? designation}</div>
                <div className="camera-overlay-detail">harmonics test proceeding</div>
              </CameraOverlayPlate>
              <span
                className="camera-overlay-live"
                style={overlayLiveStyle}
              >
                live
              </span>
            </div>

            <div className="absolute bottom-3 right-3 max-w-[78%] sm:bottom-4 sm:right-4 sm:max-w-[68%]">
              <CameraOverlayPlate color={color} className="ml-auto">
                <div className="camera-overlay-meta text-right">subject : {designation}</div>
                <div className="camera-overlay-title text-right">{name}</div>
                {unit && <div className="camera-overlay-detail text-right">pilot channel // {unit}</div>}
              </CameraOverlayPlate>
            </div>
          </div>
        ) : (
          <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.16))] p-3 sm:p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <CameraOverlayPlate color={color} className="max-w-[14rem]">
                <div className="camera-overlay-meta">subject register</div>
                <div className="camera-overlay-title">{name}</div>
                <div className="camera-overlay-detail">{designation}</div>
              </CameraOverlayPlate>

              <div className="flex flex-col items-end gap-2">
                {(plugNumber || unit) && (
                  <CameraOverlayPlate color={color}>
                    <div className="camera-overlay-meta text-right">
                      {plugNumber ? `test plug : ${plugNumber}` : "entry plug"}
                    </div>
                    <div className="camera-overlay-title text-right">{unit ?? "standby"}</div>
                  </CameraOverlayPlate>
                )}
                <span
                  className="camera-overlay-live"
                  style={overlayLiveStyle}
                >
                  relay
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {fields.length > 0 && (
        <div className="space-y-1 border-b border-white/10 p-3 sm:p-4">
          {fields.map((field, index) => {
            const fieldColor = field.status
              ? statusColors[field.status] || "#E0E0E0"
              : "#E0E0E0";

            return (
              <div
                key={index}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border border-white/8 bg-black/46 px-2 py-1.5"
              >
                <span
                  className="truncate text-[9px] uppercase tracking-[0.16em] text-eva-white/42"
                  style={{ fontFamily: "var(--font-eva-mono)" }}
                >
                  {field.label}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: fieldColor, fontFamily: "var(--font-eva-mono)" }}
                >
                  {field.value}
                </span>
                <span
                  className="px-1.5 py-[2px] text-[9px] uppercase tracking-[0.14em] text-black"
                  style={{
                    backgroundColor: fieldColor,
                    fontFamily: "var(--font-eva-mono)",
                  }}
                >
                  {field.status ?? "log"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
        <div
          className="text-[9px] uppercase tracking-[0.18em] text-eva-white/36"
          style={{ fontFamily: "var(--font-eva-mono)" }}
        >
          {imageUrl ? "camera no.012 left" : "subject relay"}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-[9px] uppercase tracking-[0.18em] text-eva-white/38"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            check
          </span>
          <span
            className="px-1.5 py-[2px] text-[10px] font-bold uppercase tracking-[0.16em] text-black"
            style={{
              backgroundColor: checkColor,
              fontFamily: "var(--font-eva-mono)",
            }}
          >
            {checkStatus}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
