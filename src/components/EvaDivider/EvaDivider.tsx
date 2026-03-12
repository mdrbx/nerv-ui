"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface EvaDividerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Optional centered label text */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Line style variant */
  variant?: "solid" | "dashed" | "dotted";
  /** Divider orientation */
  orientation?: "horizontal" | "vertical";
}

const colorMap = {
  orange: {
    line: "border-eva-orange",
    text: "text-eva-orange",
    bg: "bg-eva-black",
  },
  green: {
    line: "border-eva-green",
    text: "text-eva-green",
    bg: "bg-eva-black",
  },
  cyan: {
    line: "border-eva-cyan",
    text: "text-eva-cyan",
    bg: "bg-eva-black",
  },
};

const variantMap = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

export const EvaDivider = forwardRef<HTMLDivElement, EvaDividerProps>(
  function EvaDivider(
    {
      label,
      color = "orange",
      variant = "solid",
      orientation = "horizontal",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const lineStyle = variantMap[variant];
    const isVertical = orientation === "vertical";

    if (isVertical) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={`
            inline-block self-stretch
            border-l ${lineStyle} ${c.line} opacity-50
            ${className}
          `}
          style={{ minHeight: "1em" }}
          {...rest}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={`flex items-center w-full ${className}`}
        {...rest}
      >
        {label ? (
          <>
            {/* Left line */}
            <div
              className={`flex-1 border-t ${lineStyle} ${c.line} opacity-50`}
            />

            {/* Centered label */}
            <span
              className={`
                px-3 text-[10px] uppercase tracking-[0.2em] font-bold
                ${c.text} whitespace-nowrap select-none
              `}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              [ {label} ]
            </span>

            {/* Right line */}
            <div
              className={`flex-1 border-t ${lineStyle} ${c.line} opacity-50`}
            />
          </>
        ) : (
          <div
            className={`flex-1 border-t ${lineStyle} ${c.line} opacity-50`}
          />
        )}
      </div>
    );
  }
);
