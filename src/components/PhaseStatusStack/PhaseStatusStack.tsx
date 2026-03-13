"use client";

import { forwardRef } from "react";

export interface PhaseItem {
  label: string;
  status: "ok" | "warning" | "danger" | "inactive";
  value?: string;
}

export interface PhaseStatusStackProps {
  /** Array of phase items to display */
  phases: PhaseItem[];
  /** Color theme for the title */
  color?: "orange" | "green" | "cyan";
  /** Title displayed above the stack */
  title?: string;
  /** Optional className */
  className?: string;
}

const statusColorMap: Record<PhaseItem["status"], string> = {
  ok: "bg-eva-green/90",
  warning: "bg-eva-orange/90",
  danger: "bg-eva-red/90",
  inactive: "bg-eva-mid-gray/40",
};

const statusTextMap: Record<PhaseItem["status"], string> = {
  ok: "text-eva-black",
  warning: "text-eva-black",
  danger: "text-eva-black",
  inactive: "text-eva-mid-gray",
};

const titleColorMap: Record<NonNullable<PhaseStatusStackProps["color"]>, string> = {
  orange: "text-eva-orange",
  green: "text-eva-green",
  cyan: "text-eva-cyan",
};

export const PhaseStatusStack = forwardRef<HTMLDivElement, PhaseStatusStackProps>(
  function PhaseStatusStack(
    {
      phases,
      color = "green",
      title,
      className = "",
    },
    ref
  ) {
    return (
      <div ref={ref} className={`flex flex-col ${className}`}>
        {title && (
          <div
            className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ${titleColorMap[color]}`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </div>
        )}

        <div className="flex flex-col gap-[2px]">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`
                flex items-center justify-between
                px-2 py-[3px]
                ${statusColorMap[phase.status]}
              `}
            >
              <span
                className={`text-[10px] uppercase tracking-[0.15em] font-bold font-mono ${statusTextMap[phase.status]}`}
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {phase.label}
              </span>
              {phase.value && (
                <span
                  className={`text-[10px] font-bold font-mono ${statusTextMap[phase.status]}`}
                  style={{ fontFamily: "var(--font-eva-mono)" }}
                >
                  {phase.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
