"use client";

import { type SelectHTMLAttributes, useState, forwardRef, useId } from "react";

export interface SelectMenuOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectMenuProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Label text */
  label?: string;
  /** Options to display */
  options: SelectMenuOption[];
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Optional className for wrapper */
  wrapperClassName?: string;
}

const colorMap = {
  orange: { text: "text-eva-orange", border: "border-eva-orange" },
  green: { text: "text-eva-green", border: "border-eva-green" },
  cyan: { text: "text-eva-cyan", border: "border-eva-cyan" },
};

const sizeMap = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export const SelectMenu = forwardRef<HTMLSelectElement, SelectMenuProps>(
  function SelectMenu(
    {
      label,
      options,
      color = "orange",
      size = "md",
      placeholder = "SELECT...",
      error,
      wrapperClassName = "",
      className = "",
      id,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const c = colorMap[color];

    return (
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </label>
        )}

        {/* Select wrapper */}
        <div className="relative flex items-center">
          <span
            className={`text-lg font-mono mr-1 transition-all duration-100
              ${focused ? `${c.text} opacity-100` : "opacity-0"}`}
          >
            {"<"}
          </span>

          <div className="relative flex-1">
            <select
              id={selectId}
              ref={ref}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
              className={`
                w-full appearance-none bg-eva-black font-mono cursor-pointer
                border ${focused ? `border-2 ${c.border}` : "border border-eva-mid-gray"}
                ${error ? "border-eva-red" : ""}
                ${c.text}
                ${sizeMap[size]}
                pr-8 outline-none transition-all duration-100
                ${className}
              `}
              style={{ fontFamily: "var(--font-eva-mono)" }}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${c.text}`}
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                <path d="M0 0L5 6L10 0H0Z" />
              </svg>
            </div>
          </div>

          <span
            className={`text-lg font-mono ml-1 transition-all duration-100
              ${focused ? `${c.text} opacity-100` : "opacity-0"}`}
          >
            {">"}
          </span>
        </div>

        {error && (
          <span className="text-xs text-eva-red font-mono">
            <span className="text-[10px]">!</span> {error}
          </span>
        )}
      </div>
    );
  }
);
