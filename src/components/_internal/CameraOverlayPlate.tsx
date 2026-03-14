"use client";

import { type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type OverlayColor = "orange" | "red" | "cyan" | "green" | "magenta";

interface CameraOverlayPlateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children: ReactNode;
  color?: OverlayColor;
}

const colorMap: Record<
  OverlayColor,
  { main: string; glow: string; surface: string; soft: string }
> = {
  orange: {
    main: "#FF9900",
    glow: "rgba(255, 153, 0, 0.2)",
    surface: "rgba(255, 153, 0, 0.08)",
    soft: "rgba(255, 184, 90, 0.66)",
  },
  red: {
    main: "#FF2B1D",
    glow: "rgba(255, 43, 29, 0.18)",
    surface: "rgba(255, 43, 29, 0.08)",
    soft: "rgba(255, 110, 99, 0.66)",
  },
  cyan: {
    main: "#00F6FF",
    glow: "rgba(0, 246, 255, 0.18)",
    surface: "rgba(0, 246, 255, 0.08)",
    soft: "rgba(116, 250, 255, 0.6)",
  },
  green: {
    main: "#00FF00",
    glow: "rgba(0, 255, 0, 0.18)",
    surface: "rgba(0, 255, 0, 0.08)",
    soft: "rgba(111, 255, 111, 0.62)",
  },
  magenta: {
    main: "#FF00FF",
    glow: "rgba(255, 0, 255, 0.18)",
    surface: "rgba(255, 0, 255, 0.08)",
    soft: "rgba(255, 120, 255, 0.62)",
  },
};

export function CameraOverlayPlate({
  children,
  color = "orange",
  className = "",
  style,
  ...rest
}: CameraOverlayPlateProps) {
  const theme = colorMap[color];
  const overlayStyle = {
    "--overlay-main": theme.main,
    "--overlay-main-soft": theme.soft,
    "--overlay-glow": theme.glow,
    "--overlay-surface": theme.surface,
  } as CSSProperties;

  return (
    <div
      className={`camera-overlay-plate ${className}`}
      style={{ ...overlayStyle, ...style }}
      {...rest}
    >
      <div className="camera-overlay-plate__body">{children}</div>
    </div>
  );
}
