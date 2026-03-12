"use client";

import { forwardRef, useId, type HTMLAttributes } from "react";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  /** Radio options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Input name attribute */
  name?: string;
  /** Group label */
  label?: string;
}

const colorMap = {
  orange: {
    text: "text-eva-orange",
    selected: "text-eva-orange",
    unselected: "text-eva-mid-gray",
    label: "text-eva-orange",
  },
  green: {
    text: "text-eva-green",
    selected: "text-eva-green",
    unselected: "text-eva-mid-gray",
    label: "text-eva-green",
  },
  cyan: {
    text: "text-eva-cyan",
    selected: "text-eva-cyan",
    unselected: "text-eva-mid-gray",
    label: "text-eva-cyan",
  },
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      options,
      value,
      onChange,
      direction = "vertical",
      color = "orange",
      name,
      label,
      className = "",
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const groupName = name || `eva-radio-${generatedId}`;
    const c = colorMap[color];

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label}
        className={`${className}`}
        {...rest}
      >
        {/* Group label */}
        {label && (
          <div
            className={`text-[10px] uppercase tracking-[0.2em] font-bold ${c.label} mb-2`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {label}
          </div>
        )}

        {/* Options */}
        <div
          className={`flex ${direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-1"}`}
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            const isDisabled = option.disabled === true;
            const optionId = `${groupName}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={`
                  flex items-center gap-2 py-1 px-1 cursor-pointer
                  transition-colors duration-100 select-none
                  ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {/* Hidden native radio for a11y */}
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={option.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => !isDisabled && onChange?.(option.value)}
                  className="sr-only"
                />

                {/* Visual radio indicator */}
                <span
                  className={`text-sm font-bold ${isSelected ? c.selected : c.unselected}`}
                  style={{ fontFamily: "var(--font-eva-mono)" }}
                  aria-hidden="true"
                >
                  {isSelected ? "(*)" : "( )"}
                </span>

                {/* Label text */}
                <span
                  className={`text-xs uppercase tracking-[0.15em] font-bold ${isSelected ? c.text : "text-eva-white"}`}
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
);
