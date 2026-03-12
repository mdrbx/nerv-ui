"use client";

import { type HTMLAttributes, forwardRef } from "react";

export interface EvaToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  /** Controlled checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text (displayed uppercase) */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

const colorMap = {
  orange: {
    active: "bg-eva-orange",
    text: "text-eva-orange",
    border: "border-eva-orange",
    label: "text-eva-orange",
  },
  green: {
    active: "bg-eva-green",
    text: "text-eva-green",
    border: "border-eva-green",
    label: "text-eva-green",
  },
  cyan: {
    active: "bg-eva-cyan",
    text: "text-eva-cyan",
    border: "border-eva-cyan",
    label: "text-eva-cyan",
  },
};

const sizeMap = {
  sm: { track: "w-12 h-5", thumb: "w-5 h-3", text: "text-[8px]" },
  md: { track: "w-16 h-7", thumb: "w-7 h-5", text: "text-[10px]" },
  lg: { track: "w-20 h-9", thumb: "w-9 h-7", text: "text-xs" },
};

export const EvaToggle = forwardRef<HTMLDivElement, EvaToggleProps>(
  function EvaToggle(
    {
      checked = false,
      onChange,
      label,
      color = "orange",
      size = "md",
      disabled = false,
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const s = sizeMap[size];

    const handleClick = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 ${className}`}
        {...rest}
      >
        {/* Toggle track */}
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`
            relative ${s.track} border
            ${checked ? c.border : "border-eva-mid-gray"}
            bg-eva-black
            ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
            transition-all duration-150 select-none
            flex items-center
          `}
        >
          {/* OFF text */}
          <span
            className={`
              absolute left-1 ${s.text} uppercase font-bold tracking-wider
              ${checked ? "opacity-20" : "opacity-60"} text-eva-mid-gray
            `}
            style={{ fontFamily: "var(--font-eva-mono)" }}
            aria-hidden="true"
          >
            OFF
          </span>

          {/* ON text */}
          <span
            className={`
              absolute right-1 ${s.text} uppercase font-bold tracking-wider
              ${checked ? `${c.text} opacity-100` : "opacity-0"}
            `}
            style={{ fontFamily: "var(--font-eva-mono)" }}
            aria-hidden="true"
          >
            ON
          </span>

          {/* Sliding indicator */}
          <span
            className={`
              absolute top-0.5 ${s.thumb}
              transition-all duration-150
              ${checked ? `${c.active} right-0.5 left-auto` : "bg-eva-mid-gray left-0.5 right-auto"}
            `}
            style={{
              boxShadow: checked
                ? `0 0 6px ${color === "orange" ? "#FF6A00" : color === "green" ? "#00FF00" : "#00FFFF"}`
                : "none",
            }}
          />
        </div>

        {/* Label */}
        {label && (
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);
