"use client";

import { forwardRef } from "react";
import { Tooltip } from "../Tooltip";

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
  ok: "bg-nerv-green/90",
  warning: "bg-nerv-orange/90",
  danger: "bg-nerv-red/90",
  inactive: "bg-nerv-mid-gray/40",
};

const statusTextMap: Record<PhaseItem["status"], string> = {
  ok: "text-nerv-black",
  warning: "text-nerv-black",
  danger: "text-nerv-black",
  inactive: "text-nerv-mid-gray",
};

const titleColorMap: Record<NonNullable<PhaseStatusStackProps["color"]>, string> = {
  orange: "text-nerv-orange",
  green: "text-nerv-green",
  cyan: "text-nerv-cyan",
};

const tooltipColorMap: Record<PhaseItem["status"], "green" | "orange" | "red" | "cyan"> = {
  ok: "green",
  warning: "orange",
  danger: "red",
  inactive: "cyan",
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
            className={`mb-1 border-b border-current/25 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold ${titleColorMap[color]}`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            {title}
          </div>
        )}

        <div className="flex flex-col gap-[3px]">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="grid grid-cols-[64px_minmax(0,1fr)_48px] items-center gap-2 border border-white/10 bg-black/70 px-2 py-1"
              style={{ borderColor: "rgba(224,224,224,0.08)" }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.14em] text-nerv-white/62"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                {phase.label}
              </span>
              <Tooltip
                content={phase.value ? `${phase.label} — ${phase.value}` : phase.label}
                color={tooltipColorMap[phase.status]}
                delay={120}
                className="block w-full"
                tabIndex={0}
                aria-label={phase.value ? `${phase.label} — ${phase.value}` : phase.label}
              >
                <div className="relative h-3 cursor-pointer overflow-hidden border border-white/10 bg-black/60 transition-transform duration-150 hover:scale-x-[1.01]">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-nerv-orange/60" />
                  <div
                    className={`absolute left-0 top-0 bottom-0 ${statusColorMap[phase.status]}`}
                    style={{
                      width:
                        phase.status === "ok"
                          ? "100%"
                          : phase.status === "warning"
                            ? "68%"
                            : phase.status === "danger"
                              ? "48%"
                              : "24%",
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.38) 6px, rgba(0,0,0,0.38) 7px)",
                    }}
                  />
                </div>
              </Tooltip>
              <span
                className={`text-right text-[9px] font-bold uppercase ${statusTextMap[phase.status]}`}
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                {phase.value ?? phase.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
