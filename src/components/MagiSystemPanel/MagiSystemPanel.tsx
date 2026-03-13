"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type MagiStatus = "idle" | "computing" | "accepted" | "rejected";

export interface MagiVote {
  name: string;
  status: MagiStatus;
}

export interface MagiSystemPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title"> {
  /** Array of MAGI brain votes */
  votes: MagiVote[];
  /** Title label */
  title?: string;
  /** Optional className */
  className?: string;
  /** Use angled trapezoidal layout like the anime MAGI display */
  trapezoidal?: boolean;
}

// Hexadecimal data lines for the "computing" scrolling effect
const hexLines = [
  "0x7F3A >> PATTERN_ANALYSIS",
  "0xAF02 :: SIGNAL_PROC",
  "0x1B9E mem_alloc(PRIBNOW_BOX)",
  "0xCC41 NEURAL_LINK :: stable",
  "if (waveform.type === BLUE) {",
  "  exec PRIORITY_ALPHA;",
  "  sync_rate = calc(0.4123);",
  "}",
  "return MAGI_CONSENSUS;",
  "await harmonics.verify();",
  "deploy AT_FIELD_BARRIER;",
  "scan SECTOR_7G :: pass",
  "LCL_PRESSURE.normalize();",
  "PILOT_SYNC :: fluctuating",
  "OVERRIDE :: pending auth",
  "0xD4F0 >> compile_verdict()",
  "0x88A1 sync CASPER_LOGIC",
  "0x3C7B verify_consensus(3/3)",
];

const trapezoidClipPaths = {
  top: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
  bottomLeft: "polygon(0 0, 55% 0, 40% 100%, 0 100%)",
  bottomRight: "polygon(45% 0, 100% 0, 100% 100%, 60% 100%)",
};

function getGlowColor(status: MagiStatus): string {
  switch (status) {
    case "accepted":
      return "rgba(255, 153, 0, 0.4)";
    case "rejected":
      return "rgba(255, 0, 0, 0.4)";
    case "computing":
      return "rgba(0, 255, 255, 0.4)";
    default:
      return "rgba(0, 255, 0, 0.15)";
  }
}

function MagiColumn({ vote, index }: { vote: MagiVote; index: number }) {
  const [scrollLines, setScrollLines] = useState<string[]>([]);

  // Scrolling hex data for "computing" state
  useEffect(() => {
    if (vote.status !== "computing") {
      setScrollLines([]);
      return;
    }

    const interval = setInterval(() => {
      setScrollLines((prev) => {
        const next = [
          ...prev,
          hexLines[Math.floor(Math.random() * hexLines.length)],
        ];
        return next.slice(-20);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [vote.status]);

  const statusColor =
    vote.status === "accepted"
      ? "text-eva-orange"
      : vote.status === "rejected"
        ? "text-eva-red"
        : vote.status === "computing"
          ? "text-eva-cyan"
          : "text-eva-green";

  const statusLabel =
    vote.status === "accepted"
      ? "ACCEPTED"
      : vote.status === "rejected"
        ? "REJECTED"
        : vote.status === "computing"
          ? "COMPUTING..."
          : "STANDBY";

  return (
    <div className="flex flex-col md:border-r border-eva-mid-gray last:border-r-0 bg-eva-black overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b-2 border-eva-mid-gray bg-eva-dark-gray">
        <span
          className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {vote.name}
        </span>
        <span className="text-[10px] font-mono text-eva-mid-gray">
          0{index + 1}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-[200px] relative">
        {/* IDLE -- green standby text */}
        {vote.status === "idle" && (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center">
              <div className="text-2xl font-mono text-eva-green/40 mb-2">&mdash;</div>
              <div className="text-xs font-mono text-eva-green/60 uppercase tracking-wider">
                STANDBY
              </div>
            </div>
          </div>
        )}

        {/* COMPUTING -- scrolling hex/mono data */}
        {vote.status === "computing" && (
          <div className="h-full overflow-hidden p-2">
            <div className="space-y-0.5">
              {scrollLines.map((line, i) => (
                <motion.div
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: i === scrollLines.length - 1 ? 1 : 0.4,
                    x: 0,
                  }}
                  className="text-[10px] font-mono text-eva-cyan whitespace-nowrap"
                >
                  {line}
                </motion.div>
              ))}
            </div>
            {/* Scanning bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-eva-cyan/50"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        )}

        {/* ACCEPTED -- orange/green filled with ACCEPTED text */}
        {vote.status === "accepted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full bg-eva-orange"
          >
            <span
              className="text-3xl font-black uppercase tracking-[0.1em] text-eva-black"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              ACCEPTED
            </span>
          </motion.div>
        )}

        {/* REJECTED -- red background, REJECTED blinking */}
        {vote.status === "rejected" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full bg-eva-red"
          >
            <motion.span
              className="text-3xl font-black uppercase tracking-[0.1em] text-eva-black"
              style={{ fontFamily: "var(--font-eva-display)" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              REJECTED
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Footer status */}
      <div
        className={`flex items-center justify-center px-3 py-1.5 border-t-2 border-eva-mid-gray bg-eva-dark-gray ${statusColor}`}
      >
        <motion.span
          className="text-[10px] font-mono font-bold uppercase tracking-wider"
          animate={
            vote.status === "computing" ? { opacity: [1, 0.4, 1] } : {}
          }
          transition={
            vote.status === "computing"
              ? { duration: 1, repeat: Infinity }
              : {}
          }
        >
          {statusLabel}
        </motion.span>
      </div>
    </div>
  );
}

export const MagiSystemPanel = forwardRef<HTMLDivElement, MagiSystemPanelProps>(
  function MagiSystemPanel(
    {
      votes,
      title = "MAGI SUPER COMPUTER SYSTEM",
      className = "",
      trapezoidal = false,
      ...rest
    },
    ref
  ) {
    if (trapezoidal) {
      const balthasar = votes[1] ?? votes[0];
      const casper = votes[2] ?? votes[1] ?? votes[0];
      const melchior = votes[0];

      return (
        <div ref={ref} className={`bg-eva-black ${className}`} {...rest}>
          {/* Title */}
          <div className="flex items-center justify-between px-4 py-2 border-2 border-eva-mid-gray border-b-0 bg-eva-dark-gray">
            <span
              className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {title}
            </span>
            <div className="flex gap-1.5">
              {votes.map((v, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${
                    v.status === "accepted"
                      ? "bg-eva-orange"
                      : v.status === "rejected"
                        ? "bg-eva-red"
                        : v.status === "computing"
                          ? "bg-eva-cyan"
                          : "bg-eva-mid-gray"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trapezoidal MAGI layout */}
          <div className="border-2 border-eva-mid-gray bg-eva-black p-4">
            {/* Row 1: BALTHASAR — centered top trapezoid */}
            <div className="flex justify-center mb-[-12px]">
              <div
                className="w-full"
                style={{
                  clipPath: trapezoidClipPaths.top,
                  boxShadow: `0 0 12px ${getGlowColor(balthasar.status)}, inset 0 0 8px ${getGlowColor(balthasar.status)}`,
                }}
              >
                <MagiColumn vote={balthasar} index={1} />
              </div>
            </div>

            {/* Row 2: CASPER (left) + MELCHIOR (right) */}
            <div className="grid grid-cols-2 gap-0">
              <div
                className="mr-[-8px]"
                style={{
                  clipPath: trapezoidClipPaths.bottomLeft,
                  boxShadow: `0 0 12px ${getGlowColor(casper.status)}, inset 0 0 8px ${getGlowColor(casper.status)}`,
                }}
              >
                <MagiColumn vote={casper} index={2} />
              </div>
              <div
                className="ml-[-8px]"
                style={{
                  clipPath: trapezoidClipPaths.bottomRight,
                  boxShadow: `0 0 12px ${getGlowColor(melchior.status)}, inset 0 0 8px ${getGlowColor(melchior.status)}`,
                }}
              >
                <MagiColumn vote={melchior} index={0} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={`bg-eva-black ${className}`} {...rest}>
        {/* Title */}
        <div className="flex items-center justify-between px-4 py-2 border-2 border-eva-mid-gray border-b-0 bg-eva-dark-gray">
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </span>
          <div className="flex gap-1.5">
            {votes.map((v, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  v.status === "accepted"
                    ? "bg-eva-orange"
                    : v.status === "rejected"
                      ? "bg-eva-red"
                      : v.status === "computing"
                        ? "bg-eva-cyan"
                        : "bg-eva-mid-gray"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3-column grid with thick borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-eva-mid-gray">
          {votes.map((vote, i) => (
            <MagiColumn key={vote.name} vote={vote} index={i} />
          ))}
        </div>
      </div>
    );
  }
);
