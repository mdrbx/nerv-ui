"use client";

import {
  type InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useId,
} from "react";

export interface EvaCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label text (displayed uppercase with // prefix) */
  label?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Indeterminate state */
  indeterminate?: boolean;
}

const colorMap = {
  orange: {
    text: "text-eva-orange",
    border: "border-eva-orange",
    label: "text-eva-orange",
  },
  green: {
    text: "text-eva-green",
    border: "border-eva-green",
    label: "text-eva-green",
  },
  cyan: {
    text: "text-eva-cyan",
    border: "border-eva-cyan",
    label: "text-eva-cyan",
  },
};

export const EvaCheckbox = forwardRef<HTMLInputElement, EvaCheckboxProps>(
  function EvaCheckbox(
    {
      label,
      color = "orange",
      indeterminate = false,
      checked,
      className = "",
      id,
      disabled,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const internalRef = useRef<HTMLInputElement | null>(null);
    const c = colorMap[color];

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const symbol = indeterminate ? "-" : checked ? "X" : "\u00A0";

    return (
      <label
        htmlFor={inputId}
        className={`
          inline-flex items-center gap-2 select-none
          ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
      >
        {/* Hidden native checkbox */}
        <input
          id={inputId}
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            }
          }}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...rest}
        />

        {/* Custom visual checkbox */}
        <span
          className={`
            inline-flex items-center font-mono text-sm leading-none
            ${c.text}
          `}
          style={{ fontFamily: "var(--font-eva-mono)" }}
          aria-hidden="true"
        >
          <span className="opacity-70">[</span>
          <span className="w-4 text-center font-bold">{symbol}</span>
          <span className="opacity-70">]</span>
        </span>

        {/* Label */}
        {label && (
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${c.label}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-50 mr-1">//</span>
            {label}
          </span>
        )}
      </label>
    );
  }
);
