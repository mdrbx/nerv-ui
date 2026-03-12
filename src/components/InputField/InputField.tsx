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
    text: "text-eva-orange",
    border: "border-eva-orange",
    focusBorder: "focus:border-eva-orange",
    label: "text-eva-orange",
  },
  green: {
    text: "text-eva-green",
    border: "border-eva-green",
    focusBorder: "focus:border-eva-green",
    label: "text-eva-green",
  },
  cyan: {
    text: "text-eva-cyan",
    border: "border-eva-cyan",
    focusBorder: "focus:border-eva-cyan",
    label: "text-eva-cyan",
  },
};

const sizeMap = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
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
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </label>
        )}

        {/* Input wrapper with brackets */}
        <div className="relative flex items-center">
          {/* Left bracket — appears on focus */}
          <span
            className={`
              text-lg font-mono mr-1 transition-all duration-100
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
              flex-1 bg-eva-black font-mono
              border ${focused ? `border-2 ${c.border}` : "border border-eva-mid-gray"}
              ${error ? "border-eva-red" : ""}
              ${c.text} placeholder:text-eva-mid-gray
              ${sizeMap[size]}
              outline-none transition-all duration-100
              ${className}
            `}
            style={{ fontFamily: "var(--font-eva-mono)" }}
            {...props}
          />

          {/* Right bracket — appears on focus */}
          <span
            className={`
              text-lg font-mono ml-1 transition-all duration-100
              ${focused ? `${c.text} opacity-100 translate-x-0` : "opacity-0 translate-x-2"}
            `}
          >
            ]
          </span>
        </div>

        {/* Error or hint */}
        {error && (
          <span className="text-xs text-eva-red font-mono flex items-center gap-1">
            <span className="text-[10px]">!</span> {error}
          </span>
        )}
        {hint && !error && (
          <span className="text-xs text-eva-mid-gray font-mono">{hint}</span>
        )}
      </div>
    );
  }
);
