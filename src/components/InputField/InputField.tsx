"use client";

import { type InputHTMLAttributes, useState, forwardRef, useId } from "react";

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text (displayed uppercase) */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Optional className for the wrapper */
  wrapperClassName?: string;
}

const colorMap = {
  orange: {
    text: "text-nerv-orange",
    border: "border-nerv-orange",
    focusBorder: "focus:border-nerv-orange",
    label: "text-nerv-orange",
  },
  green: {
    text: "text-nerv-green",
    border: "border-nerv-green",
    focusBorder: "focus:border-nerv-green",
    label: "text-nerv-green",
  },
  cyan: {
    text: "text-nerv-cyan",
    border: "border-nerv-cyan",
    focusBorder: "focus:border-nerv-cyan",
    label: "text-nerv-cyan",
  },
};

const sizeMap = {
  sm: "min-h-[34px] px-3 py-1.5 text-xs",
  md: "min-h-[42px] px-4 py-2.5 text-sm",
  lg: "min-h-[48px] px-5 py-3 text-base",
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      color = "orange",
      size = "md",
      error,
      hint,
      wrapperClassName = "",
      className = "",
      id,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const c = colorMap[color];

    return (
      <div className={`flex w-full flex-col gap-1.5 ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </label>
        )}

        {/* Input wrapper with brackets */}
        <div className="relative">
          {/* Left bracket — appears on focus */}
          <span
            className={`
              pointer-events-none absolute left-[-0.85rem] top-1/2 -translate-y-1/2
              text-lg font-mono transition-all duration-100
              ${focused ? `${c.text} opacity-100 translate-x-0` : "opacity-0 -translate-x-2"}
            `}
          >
            [
          </span>

          {/* Input */}
          <input
            id={inputId}
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
              w-full bg-nerv-black font-mono
              border ${focused ? `border-2 ${c.border}` : "border border-nerv-mid-gray"}
              ${error ? "border-nerv-red" : ""}
              ${c.text} placeholder:text-nerv-mid-gray
              ${sizeMap[size]}
              outline-none transition-all duration-100
              ${className}
            `}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
            {...props}
          />

          {/* Right bracket — appears on focus */}
          <span
            className={`
              pointer-events-none absolute right-[-0.85rem] top-1/2 -translate-y-1/2
              text-lg font-mono transition-all duration-100
              ${focused ? `${c.text} opacity-100 translate-x-0` : "opacity-0 translate-x-2"}
            `}
          >
            ]
          </span>
        </div>

        {/* Error or hint */}
        {error && (
          <span className="text-xs text-nerv-red font-mono flex items-center gap-1">
            <span className="text-[10px]">!</span> {error}
          </span>
        )}
        {hint && !error && (
          <span className="text-xs text-nerv-mid-gray font-mono">{hint}</span>
        )}
      </div>
    );
  }
);
