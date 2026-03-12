"use client";

import { type HTMLAttributes, forwardRef } from "react";

export interface EvaBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Badge variant */
  variant?: "default" | "success" | "warning" | "danger" | "info";
  /** Badge text */
  label: string;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Show remove button */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Additional class names */
  className?: string;
}

const variantMap = {
  default: {
    text: "text-eva-orange",
    border: "border-eva-orange",
  },
  success: {
    text: "text-eva-green",
    border: "border-eva-green",
  },
  warning: {
    text: "text-eva-orange",
    border: "border-eva-orange",
  },
  danger: {
    text: "text-eva-red",
    border: "border-eva-red",
  },
  info: {
    text: "text-eva-cyan",
    border: "border-eva-cyan",
  },
};

const sizeMap = {
  sm: "px-1.5 py-0.5 text-[9px]",
  md: "px-2.5 py-1 text-[10px]",
  lg: "px-3 py-1.5 text-xs",
};

export const EvaBadge = forwardRef<HTMLSpanElement, EvaBadgeProps>(
  function EvaBadge(
    {
      variant = "default",
      label,
      size = "md",
      removable = false,
      onRemove,
      className = "",
      ...rest
    },
    ref
  ) {
    const v = variantMap[variant];

    return (
      <span
        ref={ref}
        className={`
          relative inline-flex items-center gap-1.5
          uppercase tracking-[0.15em] font-bold
          border ${v.border} ${v.text}
          bg-eva-black
          ${sizeMap[size]}
          select-none
          ${className}
        `}
        style={{ fontFamily: "var(--font-eva-display)" }}
        {...rest}
      >
        {/* Corner accents */}
        <span className={`absolute top-0 left-0 w-1 h-1 border-t border-l ${v.border}`} />
        <span className={`absolute top-0 right-0 w-1 h-1 border-t border-r ${v.border}`} />
        <span className={`absolute bottom-0 left-0 w-1 h-1 border-b border-l ${v.border}`} />
        <span className={`absolute bottom-0 right-0 w-1 h-1 border-b border-r ${v.border}`} />

        {label}

        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={`
              ${v.text} opacity-60 hover:opacity-100
              transition-opacity duration-100
              cursor-pointer text-current leading-none
            `}
            style={{ fontFamily: "var(--font-eva-mono)" }}
            aria-label={`Remove ${label}`}
          >
            X
          </button>
        )}
      </span>
    );
  }
);
