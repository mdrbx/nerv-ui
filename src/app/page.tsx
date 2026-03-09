"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { EvaTitleScreen } from "@/components/EvaTitleScreen";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { MagiSystemPanel } from "@/components/MagiSystemPanel";
import type { MagiVote } from "@/components/MagiSystemPanel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SeeleMonolith } from "@/components/SeeleMonolith";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";

// ─── Pilot sync data ───
const pilots = [
  { id: "EVA-00", pilot: "AYANAMI REI", sync: 68 },
  { id: "EVA-01", pilot: "IKARI SHINJI", sync: 41 },
  { id: "EVA-02", pilot: "SORYU ASUKA", sync: 92 },
];

export default function NervCommandCenter() {
  // ─── Global state ───
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "EMERGENCY">(
    "NORMAL"
  );
  const [currentTime, setCurrentTime] = useState("");
  const [syncValues, setSyncValues] = useState(
    pilots.map((p) => p.sync)
  );
  const [magiVotes, setMagiVotes] = useState<MagiVote[]>([
    { name: "MELCHIOR 1", status: "idle" },
    { name: "BALTHASAR 2", status: "idle" },
    { name: "CASPER 3", status: "idle" },
  ]);
  const [classifiedUnlocked, setClassifiedUnlocked] = useState(false);

  const isEmergency = systemStatus === "EMERGENCY";

  // ─── Live clock ───
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Simulated sync gauge fluctuation ───
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncValues((prev) =>
        prev.map((v) =>
          Math.max(10, Math.min(99, v + (Math.random() - 0.5) * 4))
        )
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ─── MAGI voting simulation ───
  const triggerMagiVote = useCallback(() => {
    const update = (
      idx: number,
      status: "idle" | "computing" | "accepted" | "rejected"
    ) =>
      setMagiVotes((prev) =>
        prev.map((v, i) => (i === idx ? { ...v, status } : v))
      );

    update(0, "computing");
    update(1, "computing");
    update(2, "computing");
    setTimeout(() => update(0, "accepted"), 1800);
    setTimeout(() => update(1, "accepted"), 3200);
    setTimeout(() => update(2, "rejected"), 4000);
    setTimeout(() => {
      update(0, "idle");
      update(1, "idle");
      update(2, "idle");
    }, 8000);
  }, []);

  // ─── Toggle system status ───
  const toggleAlert = useCallback(() => {
    setSystemStatus((prev) => {
      const next = prev === "NORMAL" ? "EMERGENCY" : "NORMAL";
      if (next === "EMERGENCY") triggerMagiVote();
      return next;
    });
  }, [triggerMagiVote]);

  // ─── Border color token ───
  const borderColor = isEmergency
    ? "border-alert-red"
    : "border-grid-green";

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-500"
      style={{
        backgroundColor: isEmergency ? "#1A0000" : "#000000",
      }}
    >
      {/* ═══════════════════════════════════════════
          HEADER (Full Width)
          ═══════════════════════════════════════════ */}
      <header className={`relative w-full border-b-2 ${borderColor}`}>
        {/* EMERGENCY → Banner overlay */}
        {isEmergency && (
          <EmergencyBanner
            text="EMERGENCY"
            subtext="PATTERN BLUE DETECTED — ALL PERSONNEL TO BATTLE STATIONS"
            visible
            severity="emergency"
          />
        )}

        {/* NORMAL → Title screen header (compact) */}
        {!isEmergency && (
          <div className="relative w-full h-[120px] overflow-hidden bg-bg-base flex items-center justify-between px-8">
            {/* Left — title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white text-3xl md:text-5xl font-black uppercase"
              style={{
                fontFamily: "var(--font-eva-title)",
                lineHeight: "0.9",
                letterSpacing: "-0.03em",
              }}
            >
              PROJECT
              <br />
              IDENTIFIER
            </motion.h1>

            {/* Center — decorative line */}
            <div className="hidden md:block flex-1 mx-8 h-px bg-eva-mid-gray/30" />

            {/* Right — subtitle + time */}
            <div className="text-right">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.6, x: 0 }}
                className="text-white text-xl md:text-3xl font-black uppercase"
                style={{
                  fontFamily: "var(--font-eva-title)",
                  lineHeight: "0.9",
                  letterSpacing: "-0.02em",
                }}
              >
                EVA-UI DEMO
              </motion.p>
              <span
                className="text-sm font-mono text-eva-orange tabular-nums eva-text-shadow-orange mt-2 block"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {currentTime || "00:00:00"} — TOKYO-3
              </span>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════
          STATUS BAR
          ═══════════════════════════════════════════ */}
      <div
        className={`flex items-center justify-between px-4 py-1.5 border-b ${borderColor} ${
          isEmergency ? "bg-eva-red/10" : "bg-eva-dark-gray"
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-2 h-2 ${isEmergency ? "bg-eva-red" : "bg-eva-green"}`}
            animate={isEmergency ? { opacity: [1, 0, 1] } : {}}
            transition={isEmergency ? { duration: 0.4, repeat: Infinity } : {}}
          />
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${
              isEmergency ? "text-eva-red" : "text-eva-green"
            }`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {isEmergency ? "CONDITION RED" : "ALL SYSTEMS NORMAL"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-eva-mid-gray">
            NERV HQ — CENTRAL DOGMA — GEOFRONT L-02
          </span>
          {/* The big alert toggle */}
          <Button
            variant={isEmergency ? "primary" : "danger"}
            size="sm"
            onClick={toggleAlert}
          >
            {isEmergency ? "STAND DOWN" : "TRIGGER ALERT"}
          </Button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — 3-Column Grid
          ═══════════════════════════════════════════ */}
      <main className="grid grid-cols-12 gap-0 min-h-[calc(100vh-180px)]">
        {/* ─────────────────────────────────────────
            LEFT COLUMN — Monitoring (3 cols)
            ───────────────────────────────────────── */}
        <div
          className={`col-span-3 border-r ${borderColor} flex flex-col`}
        >
          {/* Countdown Timer */}
          <div className={`border-b ${borderColor}`}>
            <CountdownTimer
              initialSeconds={isEmergency ? 300 : 300}
            />
          </div>

          {/* Pilot Sync Rates */}
          <div className="flex-1 p-3 flex flex-col gap-4">
            <h3
              className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              PILOT SYNCHRONIZATION
            </h3>

            {pilots.map((p, i) => (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-eva-mid-gray">
                  <span>{p.id}</span>
                  <span className="text-eva-cyan">{p.pilot}</span>
                </div>
                <SyncProgressBar
                  value={syncValues[i]}
                  label={`${p.id} SYNC`}
                  blocks={15}
                />
              </div>
            ))}

            {/* Spacer + decorative footer */}
            <div className="mt-auto pt-4 border-t border-eva-mid-gray/30">
              <div className="text-[9px] font-mono text-eva-mid-gray/50 space-y-0.5">
                <div>LCL SYSTEM ........... NOMINAL</div>
                <div>ENTRY PLUG ........... LOCKED</div>
                <div>A.T. FIELD ........... DEPLOYED</div>
                <div>UMBILICAL CABLE ...... CONNECTED</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            CENTER COLUMN — Data Viz & Decision (6 cols)
            ───────────────────────────────────────── */}
        <div className="col-span-6 flex flex-col">
          {/* Sync Ratio Chart — top half */}
          <div
            className={`border-b ${borderColor} flex flex-col`}
            style={{ minHeight: "280px" }}
          >
            {/* Chart label */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-eva-dark-gray border-b border-eva-mid-gray/30">
              <span
                className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                HARMONIC WAVEFORM ANALYSIS
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-eva-cyan inline-block" />
                  <span className="text-eva-cyan">DATA-BLUE</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-eva-magenta inline-block" />
                  <span className="text-eva-magenta">MAGENTA-WAVE</span>
                </span>
              </div>
            </div>
            {/* Chart fills the rest */}
            <div className="flex-1">
              <SyncRatioChart showGrid animated />
            </div>
          </div>

          {/* MAGI System Panel — bottom half */}
          <div className="flex-1 flex flex-col">
            <MagiSystemPanel
              votes={magiVotes}
              className="flex-1"
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────
            RIGHT COLUMN — Comms & Security (3 cols)
            ───────────────────────────────────────── */}
        <div
          className={`col-span-3 border-l ${borderColor} flex flex-col`}
        >
          {/* SEELE Monoliths */}
          <div className={`border-b ${borderColor} p-3`}>
            <h3
              className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange mb-3"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              SEELE — SECURE CHANNEL
            </h3>
            <div className="flex flex-col gap-2">
              <SeeleMonolith id="01" isSpeaking className="min-h-[100px]" />
              <SeeleMonolith id="02" isSpeaking={false} className="min-h-[100px]" />
              <SeeleMonolith id="03" isSpeaking className="min-h-[100px]" />
            </div>
          </div>

          {/* Classified form zone */}
          <div className="flex-1 relative">
            <ClassifiedOverlay
              text="TOP SECRET"
              isUnlocked={classifiedUnlocked}
            >
              <div className="p-4 space-y-4 h-full">
                <h3
                  className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange mb-2"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  CLASSIFIED TERMINAL
                </h3>

                <InputField
                  label="OPERATOR ID"
                  placeholder="Enter ID..."
                  color="orange"
                  value="IKARI-G"
                  readOnly
                />
                <InputField
                  label="AUTHORIZATION CODE"
                  placeholder="••••••••"
                  color="green"
                  type="password"
                  readOnly
                />
                <InputField
                  label="TARGET DESIGNATION"
                  placeholder="ANGEL-XX"
                  color="cyan"
                  value="SACHIEL"
                  readOnly
                />

                <div className="pt-2 text-[9px] font-mono text-eva-mid-gray/50 space-y-0.5">
                  <div>CLEARANCE: LEVEL 7 — EYES ONLY</div>
                  <div>ENCRYPTION: AES-256 / MAGI-VERIFIED</div>
                </div>
              </div>
            </ClassifiedOverlay>

            {/* Unlock toggle button */}
            <div className="absolute bottom-3 left-3 right-3 z-[60]">
              <Button
                variant={classifiedUnlocked ? "ghost" : "danger"}
                size="sm"
                fullWidth
                onClick={() => setClassifiedUnlocked((v) => !v)}
              >
                {classifiedUnlocked ? "RE-CLASSIFY" : "OVERRIDE CLEARANCE"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════
          FOOTER STATUS BAR
          ═══════════════════════════════════════════ */}
      <footer
        className={`px-4 py-1 border-t ${borderColor} ${
          isEmergency ? "bg-eva-red/5" : "bg-eva-dark-gray"
        } flex items-center justify-between text-[10px] font-mono text-eva-mid-gray`}
      >
        <div className="flex items-center gap-3">
          <span>NERV COMMAND CENTER v2.0</span>
          <span className="text-eva-mid-gray/30">|</span>
          <span>
            EvaUI —{" "}
            <span className="text-eva-orange">DESIGN SYSTEM</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>MAGI: {magiVotes.every((v) => v.status === "idle") ? "STANDBY" : "ACTIVE"}</span>
          <span className="text-eva-mid-gray/30">|</span>
          <span className="text-eva-green">SECURE CHANNEL — ENCRYPTED</span>
        </div>
      </footer>
    </div>
  );
}
