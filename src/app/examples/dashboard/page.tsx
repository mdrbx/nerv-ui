"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { BarChart } from "@/components/BarChart";
import { DataGrid } from "@/components/DataGrid";
import { Gauge } from "@/components/Gauge";
import { PieChart } from "@/components/PieChart";
import { PhaseStatusStack } from "@/components/PhaseStatusStack";
import { GradientStatusBar } from "@/components/GradientStatusBar";
import { SegmentDisplay } from "@/components/SegmentDisplay";

// ─── Mock data ───

const operationsLog = [
  { id: "OP-7701", timestamp: "08:14:22", unit: "EVA-01", action: "SORTIE DEPLOYED", sector: "TOKYO-3 N", status: "COMPLETE" },
  { id: "OP-7702", timestamp: "08:31:05", unit: "EVA-02", action: "PERIMETER SWEEP", sector: "SECTOR 7-G", status: "ACTIVE" },
  { id: "OP-7703", timestamp: "09:02:47", unit: "EVA-00", action: "CALIBRATION", sector: "CAGE-03", status: "COMPLETE" },
  { id: "OP-7704", timestamp: "09:18:33", unit: "EVA-01", action: "A.T. FIELD TEST", sector: "GEOFRONT", status: "ACTIVE" },
  { id: "OP-7705", timestamp: "09:45:11", unit: "EVA-04", action: "SYNC DIAGNOSTIC", sector: "CAGE-04", status: "PENDING" },
  { id: "OP-7706", timestamp: "10:01:59", unit: "EVA-02", action: "WEAPONS LOAD", sector: "ARMORY B", status: "COMPLETE" },
  { id: "OP-7707", timestamp: "10:22:14", unit: "EVA-03", action: "NEURAL LINK", sector: "CAGE-02", status: "WARNING" },
  { id: "OP-7708", timestamp: "10:44:38", unit: "EVA-01", action: "PATROL ROUTE C", sector: "TOKYO-3 S", status: "ACTIVE" },
  { id: "OP-7709", timestamp: "11:05:20", unit: "EVA-00", action: "COOLANT FLUSH", sector: "CAGE-03", status: "COMPLETE" },
  { id: "OP-7710", timestamp: "11:19:55", unit: "EVA-05", action: "ACTIVATION TEST", sector: "CAGE-05", status: "PENDING" },
];

const deploymentBars = [
  { label: "EVA-00", value: 72, color: "#00FFFF" },
  { label: "EVA-01", value: 94, color: "#FF9900" },
  { label: "EVA-02", value: 86, color: "#00FF00" },
  { label: "EVA-03", value: 41, color: "#FF0000" },
  { label: "EVA-04", value: 58, color: "#00FFFF" },
  { label: "EVA-05", value: 23, color: "#FF9900" },
];

const resourceSlices = [
  { label: "POWER", value: 35, color: "#FF9900" },
  { label: "LCL", value: 25, color: "#00FFFF" },
  { label: "COOLANT", value: 20, color: "#00FF00" },
  { label: "MUNITIONS", value: 12, color: "#FF0000" },
  { label: "RESERVE", value: 8, color: "#FF00FF" },
];

const systemPhases = [
  { label: "MAGI CASPER", status: "ok" as const, value: "ONLINE" },
  { label: "MAGI BALTHASAR", status: "ok" as const, value: "ONLINE" },
  { label: "MAGI MELCHIOR", status: "warning" as const, value: "DEGRADED" },
  { label: "PRIBNOW BOX", status: "ok" as const, value: "SEALED" },
  { label: "TERMINAL DOGMA", status: "danger" as const, value: "RESTRICTED" },
  { label: "CAGE SYSTEMS", status: "ok" as const, value: "NOMINAL" },
  { label: "A.T. FIELD GEN", status: "ok" as const, value: "STANDBY" },
];

const threatZones = [
  { start: 0, end: 30, color: "#00FF00", label: "SAFE" },
  { start: 30, end: 60, color: "#FF9900", label: "ELEVATED" },
  { start: 60, end: 80, color: "#FF4400", label: "HIGH" },
  { start: 80, end: 100, color: "#FF0000", label: "CRITICAL" },
];

export default function OperationsDashboard() {
  const [syncRate, setSyncRate] = useState(87.4);
  const [activeUnits, setActiveUnits] = useState(4);
  const [personnelOnline, setPersonnelOnline] = useState(342);
  const [threatLevel, setThreatLevel] = useState(22);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sectorThreats, setSectorThreats] = useState([18, 42, 7]);

  // ─── Clock update ───
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${h}${m}${s}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Simulated live sync rate fluctuation ───
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate((prev) => {
        const delta = (Math.random() - 0.48) * 3.2;
        return Math.max(60, Math.min(99.9, +(prev + delta).toFixed(1)));
      });
      setPersonnelOnline((prev) =>
        Math.max(280, Math.min(400, prev + Math.floor((Math.random() - 0.5) * 8)))
      );
      setThreatLevel((prev) => {
        const d = (Math.random() - 0.5) * 6;
        return Math.max(5, Math.min(75, Math.round(prev + d)));
      });
      setSectorThreats((prev) =>
        prev.map((v) => Math.max(3, Math.min(85, Math.round(v + (Math.random() - 0.5) * 8))))
      );
      setActiveUnits((prev) => {
        const r = Math.random();
        if (r > 0.92) return Math.min(6, prev + 1);
        if (r < 0.08) return Math.max(2, prev - 1);
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const threatColor = threatLevel < 30 ? "text-eva-green" : threatLevel < 60 ? "text-eva-orange" : "text-eva-red";
  const syncColor = syncRate >= 85 ? "text-eva-green" : syncRate >= 70 ? "text-eva-cyan" : "text-eva-orange";

  return (
    <div className="min-h-screen bg-eva-black nerv-page-shell">
      {/* ═══════ HEADER ═══════ */}
      <div className="border-b border-eva-orange/20 py-3">
        <div className="nerv-page-frame flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="nerv-section-label mb-2">Ops Control</span>
            <h1
              className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold sm:text-3xl"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              NERV OPERATIONS CENTER
            </h1>
            <p className="nerv-caption mt-1">
              CENTRAL DOGMA // COMMAND LEVEL // REAL-TIME TACTICAL OVERVIEW
            </p>
          </div>

          <div className="nerv-panel flex items-center gap-3 px-3 py-2">
            <span className="nerv-data-label">System Time</span>
            {currentTime && (
              <SegmentDisplay
                value={parseInt(currentTime, 10)}
                format="raw"
                digits={6}
                size="sm"
                color="orange"
              />
            )}
          </div>
        </div>
      </div>

      {/* ═══════ KPI ROW ═══════ */}
      <div className="border-b border-eva-orange/12 py-3">
        <div className="nerv-page-frame grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "ACTIVE UNITS",
              value: `${activeUnits}/6`,
              color: activeUnits >= 4 ? "text-eva-green" : "text-eva-orange",
              sub: "EVANGELION FLEET",
            },
            {
              label: "SYNC RATE",
              value: `${syncRate.toFixed(1)}%`,
              color: syncColor,
              sub: "AVG PILOT RATIO",
            },
            {
              label: "THREAT LEVEL",
              value: `${threatLevel}`,
              color: threatColor,
              sub: "COMPOSITE INDEX",
            },
            {
              label: "PERSONNEL ONLINE",
              value: `${personnelOnline}`,
              color: "text-eva-cyan",
              sub: "NERV GEOFRONT",
            },
          ].map((kpi) => (
            <div key={kpi.label} className="nerv-panel px-3 py-3">
              <div
                className="text-[10px] uppercase tracking-[0.15em] text-eva-white/40 font-bold mb-1"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {kpi.label}
              </div>
              <div
                className={`text-2xl sm:text-3xl font-bold tabular-nums ${kpi.color}`}
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {kpi.value}
              </div>
              <div className="text-[9px] font-mono text-eva-white/30 mt-0.5">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ MAIN AREA ═══════ */}
      <div className="nerv-page-frame grid grid-cols-1 gap-4 py-4 lg:grid-cols-12">
        {/* ─── Left column (8 cols) ─── */}
        <div className="col-span-full lg:col-span-8">
          {/* Unit deployment chart */}
          <div className="nerv-panel p-3 sm:p-4">
            <Card title="UNIT DEPLOYMENT STATUS">
              <BarChart
                title="OPERATIONAL READINESS"
                bars={deploymentBars}
                unit="%"
                color="orange"
                segmented
                height={220}
                showGrid
              />
            </Card>
          </div>

          {/* Operations log */}
          <div className="nerv-panel mt-4 p-3 sm:p-4">
            <DataGrid
              columns={[
                { key: "id", header: "OP ID", width: "90px", sortable: true },
                { key: "timestamp", header: "TIME", width: "90px", sortable: true },
                { key: "unit", header: "UNIT", width: "80px", sortable: true },
                { key: "action", header: "ACTION", sortable: true },
                { key: "sector", header: "SECTOR", sortable: true },
                { key: "status", header: "STATUS", align: "center", sortable: true },
              ]}
              data={operationsLog}
              color="cyan"
              title="RECENT OPERATIONS LOG"
              showIndex
              pageSize={8}
              maxHeight="420px"
            />
          </div>
        </div>

        {/* ─── Right column (4 cols) ─── */}
        <div className="col-span-full space-y-4 lg:col-span-4">
          {/* Sync gauge */}
          <div className="nerv-panel flex flex-col items-center p-3 sm:p-4">
            <div
              className="text-[10px] uppercase tracking-[0.2em] text-eva-cyan font-bold mb-3 self-start"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              OVERALL SYNC RATE
            </div>
            <Gauge
              value={Math.round(syncRate)}
              label="AVG SYNC"
              color="cyan"
              size={200}
              threshold={90}
            />
            <div className="mt-2 text-[9px] font-mono text-eva-white/40 text-center">
              THRESHOLD: 90% — CURRENT:{" "}
              <span className={syncColor}>{syncRate.toFixed(1)}%</span>
            </div>
          </div>

          {/* Resource allocation pie */}
          <div className="nerv-panel p-3 sm:p-4">
            <PieChart
              title="RESOURCE ALLOCATION"
              slices={resourceSlices}
              size={170}
              donut
              showLegend
            />
          </div>

          {/* Phase status stack */}
          <div className="nerv-panel p-3 sm:p-4">
            <PhaseStatusStack
              title="SYSTEM STATUS"
              phases={systemPhases}
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* ═══════ BOTTOM ROW — THREAT ASSESSMENT ═══════ */}
      <div className="border-t border-eva-orange/16 py-4">
        <div className="nerv-page-frame">
        <div
          className="text-xs uppercase tracking-[0.2em] text-eva-orange font-bold mb-4"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          SECTOR THREAT ASSESSMENT
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "SECTOR ALPHA", sublabel: "TOKYO-3 NORTH PERIMETER", value: sectorThreats[0] },
            { label: "SECTOR BRAVO", sublabel: "GEOFRONT INTERIOR", value: sectorThreats[1] },
            { label: "SECTOR CHARLIE", sublabel: "TOKYO-3 SOUTH APPROACH", value: sectorThreats[2] },
          ].map((sector) => (
            <GradientStatusBar
              key={sector.label}
              label={sector.label}
              sublabel={sector.sublabel}
              value={sector.value}
              min={0}
              max={100}
              zones={threatZones}
              color={sector.value < 30 ? "green" : sector.value < 60 ? "orange" : "red"}
            />
          ))}
        </div>
        </div>
      </div>

      {/* ═══════ FOOTER ═══════ */}
      <div className="border-t border-eva-white/10 py-3">
        <div className="nerv-page-frame flex flex-col gap-1 sm:flex-row sm:justify-between">
          <span className="text-[9px] font-mono text-eva-white/30">
            NERV CENTRAL DOGMA — OPERATIONS DASHBOARD v3.1.0
          </span>
          <span className="text-[9px] font-mono text-eva-white/30">
            MAGI SYSTEM STATUS: NOMINAL — CLEARANCE LEVEL: A-17
          </span>
        </div>
      </div>
    </div>
  );
}
