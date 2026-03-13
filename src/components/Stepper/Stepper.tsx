"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "color" | "direction"> {
  /** Step definitions */
  steps: StepItem[];
  /** Currently active step (0-based index) */
  activeStep: number;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    active: "border-eva-orange text-eva-orange",
    completed: "border-eva-orange/70 text-eva-orange/70",
    future: "border-eva-mid-gray/40 text-eva-mid-gray/40",
    line: "bg-eva-orange/70",
    lineDashed: "border-eva-mid-gray/30",
    pulse: "bg-eva-orange",
  },
  green: {
    active: "border-eva-green text-eva-green",
    completed: "border-eva-green/70 text-eva-green/70",
    future: "border-eva-mid-gray/40 text-eva-mid-gray/40",
    line: "bg-eva-green/70",
    lineDashed: "border-eva-mid-gray/30",
    pulse: "bg-eva-green",
  },
  cyan: {
    active: "border-eva-cyan text-eva-cyan",
    completed: "border-eva-cyan/70 text-eva-cyan/70",
    future: "border-eva-mid-gray/40 text-eva-mid-gray/40",
    line: "bg-eva-cyan/70",
    lineDashed: "border-eva-mid-gray/30",
    pulse: "bg-eva-cyan",
  },
};

export const Stepper = forwardRef<HTMLElement, StepperProps>(
  function Stepper(
    {
      steps,
      activeStep,
      color = "orange",
      direction = "horizontal",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const isVertical = direction === "vertical";

    return (
      <nav
        ref={ref}
        className={`
          flex ${isVertical ? "flex-col" : "flex-row items-center"}
          ${className}
        `}
        aria-label="Progress"
        {...rest}
      >
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const isCompleted = i < activeStep;
          const isFuture = i > activeStep;
          const stepNum = String(i + 1).padStart(2, "0");
          const stepColor = isActive
            ? c.active
            : isCompleted
              ? c.completed
              : c.future;

          return isVertical
            ? (
              <div key={i} className="flex items-stretch">
                {/* Left column: number + connector */}
                <div className="flex flex-col items-center">
                  {/* Step number square */}
                  <motion.div
                    className={`
                      relative w-4 h-4 flex items-center justify-center
                      border text-[8px] font-bold shrink-0
                      ${stepColor}
                    `}
                    style={{ fontFamily: "var(--font-eva-display)" }}
                    animate={isActive ? { borderColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,1)", "rgba(255,255,255,0.4)"] } : {}}
                    transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                  >
                    {isCompleted ? (
                      <span className="text-[8px] leading-none">&#x2713;</span>
                    ) : (
                      <span className="leading-none">{stepNum}</span>
                    )}

                    {/* Pulsing dot for active */}
                    {isActive && (
                      <motion.span
                        className={`absolute -right-1 -top-1 w-1.5 h-1.5 ${c.pulse}`}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>

                  {/* Vertical connector line */}
                  {i < steps.length - 1 && (
                    <div className="flex-1 min-h-6 w-px my-1">
                      {isCompleted ? (
                        <div className={`w-full h-full ${c.line}`} />
                      ) : (
                        <div
                          className={`w-full h-full border-l border-dashed ${c.lineDashed}`}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Right column: label + description */}
                <div className="ml-3 pb-6 last:pb-0">
                  <span
                    className={`
                      uppercase tracking-[0.15em] text-xs
                      ${isActive ? "font-bold" : "font-medium"}
                      ${stepColor}
                    `}
                    style={{ fontFamily: "var(--font-eva-display)" }}
                  >
                    {stepNum} // {step.label}
                  </span>

                  {step.description && (
                    <p
                      className={`
                        text-[10px] mt-0.5 tracking-wide
                        ${isFuture ? "text-eva-mid-gray/30" : "text-eva-mid-gray/60"}
                      `}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            )
            : (
              <div key={i} className="flex items-center">
                {/* Step */}
                <div className="flex items-center">
                  {/* Step number square */}
                  <motion.div
                    className={`
                      relative w-4 h-4 flex items-center justify-center
                      border text-[8px] font-bold shrink-0
                      ${stepColor}
                    `}
                    style={{ fontFamily: "var(--font-eva-display)" }}
                  >
                    {isCompleted ? (
                      <span className="text-[8px] leading-none">&#x2713;</span>
                    ) : (
                      <span className="leading-none">{stepNum}</span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`
                      ml-2 uppercase tracking-[0.15em] text-xs whitespace-nowrap
                      ${isActive ? "font-bold" : "font-medium"}
                      ${stepColor}
                    `}
                    style={{ fontFamily: "var(--font-eva-display)" }}
                  >
                    {stepNum} // {step.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, opacity: [1, 0.4, 1] }}
                      transition={{ scale: { type: "spring", stiffness: 500, damping: 30 }, opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                      className={`ml-2 w-1.5 h-1.5 shrink-0 ${c.pulse}`}
                    />
                  )}
                </div>

                {/* Horizontal connector */}
                {i < steps.length - 1 && (
                  <div className="mx-3 w-8 h-px shrink-0">
                    {isCompleted ? (
                      <div className={`w-full h-full ${c.line}`} />
                    ) : (
                      <div
                        className={`w-full h-px border-t border-dashed ${c.lineDashed}`}
                      />
                    )}
                  </div>
                )}
              </div>
            );
        })}
      </nav>
    );
  }
);
