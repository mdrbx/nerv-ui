"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";

export interface CardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "title"
> {
  /** Card header title */
  title?: ReactNode;
  /** Small header line above the title */
  eyebrow?: ReactNode;
  /** Supporting line below the title */
  subtitle?: ReactNode;
  /** Main content */
  children?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Visual palette */
  variant?: "default" | "alert" | "hud" | "video";
  /** Whether the outer frame uses rounded corners */
  rounded?: boolean;
  /** Legacy prop retained for API compatibility */
  cutSize?: number;
  /** Additional CSS classes */
  className?: string;
}

const VARIANT_CONFIG = {
  default: {
    main: "#00FF00",
    soft: "rgba(126, 255, 126, 0.62)",
    glow: "rgba(0, 255, 0, 0.14)",
    surface: "rgba(0, 255, 0, 0.08)",
    divider: "rgba(126, 255, 126, 0.22)",
    header: "#00FF00",
    detail: "rgba(160, 255, 160, 0.82)",
    body: "rgba(240, 240, 240, 0.84)",
    background:
      "linear-gradient(180deg, rgba(4, 12, 4, 0.96) 0%, rgba(0, 0, 0, 0.95) 100%)",
  },
  alert: {
    main: "#FF2B1D",
    soft: "rgba(255, 119, 108, 0.62)",
    glow: "rgba(255, 43, 29, 0.16)",
    surface: "rgba(255, 43, 29, 0.08)",
    divider: "rgba(255, 119, 108, 0.24)",
    header: "#FF2B1D",
    detail: "rgba(255, 166, 160, 0.84)",
    body: "rgba(250, 232, 230, 0.9)",
    background:
      "linear-gradient(180deg, rgba(20, 4, 3, 0.96) 0%, rgba(0, 0, 0, 0.95) 100%)",
  },
  hud: {
    main: "rgba(236, 236, 236, 0.74)",
    soft: "rgba(255, 255, 255, 0.32)",
    glow: "rgba(255, 255, 255, 0.08)",
    surface: "rgba(255, 255, 255, 0.04)",
    divider: "rgba(255, 255, 255, 0.14)",
    header: "rgba(255, 255, 255, 0.86)",
    detail: "rgba(255, 255, 255, 0.62)",
    body: "rgba(255, 255, 255, 0.8)",
    background:
      "linear-gradient(180deg, rgba(12, 14, 16, 0.84) 0%, rgba(0, 0, 0, 0.72) 100%)",
  },
  video: {
    main: "#FF9900",
    soft: "rgba(255, 190, 92, 0.72)",
    glow: "rgba(255, 153, 0, 0.18)",
    surface: "rgba(255, 153, 0, 0.08)",
    divider: "rgba(255, 190, 92, 0.28)",
    header: "#FF9900",
    detail: "rgba(255, 199, 120, 0.86)",
    body: "rgba(255, 236, 208, 0.88)",
    background:
      "linear-gradient(180deg, rgba(14, 10, 3, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%)",
  },
} as const;

const TITLE_CLASS_MAP = {
  default: "text-[0.98rem] leading-[1.02] tracking-[0.16em]",
  alert: "text-[0.98rem] leading-[1.02] tracking-[0.16em]",
  hud: "text-[0.98rem] leading-[1.02] tracking-[0.14em]",
  video:
    "text-[clamp(1.02rem,1.85vw,1.55rem)] leading-[0.92] tracking-[0.06em]",
} as const;

const PANEL_PADDING = "px-3 py-3 sm:px-4";

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    title,
    eyebrow,
    subtitle,
    children,
    footer,
    variant = "default",
    rounded = false,
    cutSize: _cutSize,
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const config = VARIANT_CONFIG[variant];
  const hasHeader = Boolean(eyebrow || title || subtitle);
  const hasBody = children !== undefined && children !== null;
  const hasFooter = footer !== undefined && footer !== null;

  const frameStyle = {
    borderColor: config.main,
    background: `radial-gradient(circle at top left, ${config.surface} 0%, transparent 56%), ${config.background}`,
    boxShadow:
      variant === "hud"
        ? `0 0 0 1px ${config.glow}, inset 0 0 0 1px ${config.divider}`
        : `0 0 0 1px ${config.glow}, inset 0 0 0 1px ${config.soft}, 0 0 18px ${config.glow}`,
    ...(style ?? {}),
  } satisfies CSSProperties;

  const eyebrowStyle = {
    color: config.detail,
    fontFamily: "var(--font-nerv-display)",
  } satisfies CSSProperties;
  const titleStyle = {
    color: config.header,
    fontFamily: "var(--font-nerv-display)",
  } satisfies CSSProperties;
  const railStyle = {
    backgroundColor: config.soft,
  } satisfies CSSProperties;
  const detailStyle = {
    color: config.detail,
    fontFamily: "var(--font-nerv-mono)",
  } satisfies CSSProperties;
  const bodyStyle = {
    color: config.body,
    fontFamily: "var(--font-nerv-body)",
  } satisfies CSSProperties;

  return (
    <div
      ref={ref}
      data-rounded={rounded ? "true" : "false"}
      data-variant={variant}
      className={`relative isolate flex w-full flex-col overflow-hidden border  ${rounded ? "rounded-lg" : ""} ${
        variant === "hud" ? "backdrop-blur-sm" : ""
      } ${className}`}
      style={frameStyle}
      {...rest}
    >
      {hasHeader && (
        <header
          className={`relative z-10 flex flex-col gap-1.5 ${PANEL_PADDING}`}
        >
          {eyebrow && (
            <div
              className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] opacity-90"
              style={eyebrowStyle}
            >
              {eyebrow}
            </div>
          )}

          {title && (
            <div
              className={`font-semibold uppercase ${TITLE_CLASS_MAP[variant]}`}
              style={titleStyle}
            >
              {title}
            </div>
          )}

          {subtitle && (
            <div
              className="whitespace-pre-line text-[0.66rem] uppercase leading-[1.35] tracking-[0.14em]"
              style={detailStyle}
            >
              {subtitle}
            </div>
          )}

          {(hasBody || hasFooter) && (
            <div
              aria-hidden="true"
              data-card-divider="header"
              className="mx-0.45 mt-2 h-0.5"
              style={railStyle}
            />
          )}
        </header>
      )}

      {hasBody && (
        <div
          className={`relative z-10 ${PANEL_PADDING} text-sm leading-relaxed`}
          style={bodyStyle}
        >
          {children}
        </div>
      )}

      {hasFooter && (
        <footer
          className={`relative z-10 ${PANEL_PADDING} whitespace-pre-line text-[0.64rem] uppercase leading-[1.35] tracking-[0.16em]`}
          style={detailStyle}
        >
          {(hasBody || hasHeader) && (
            <div
              aria-hidden="true"
              data-card-divider="footer"
              className="mx-0.45 mb-3 h-0.5"
              style={railStyle}
            />
          )}
          {footer}
        </footer>
      )}
    </div>
  );
});
