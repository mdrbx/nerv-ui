"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { MagiSystemPanel } from "@/components/MagiSystemPanel";
import type { MagiVote } from "@/components/MagiSystemPanel";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { DataGrid } from "@/components/DataGrid";
import { TargetingContainer } from "@/components/TargetingContainer";
import { Badge } from "@/components/Badge";
import { Gauge } from "@/components/Gauge";
import { BarChart } from "@/components/BarChart";
import { PhaseStatusStack } from "@/components/PhaseStatusStack";
import { PieChart } from "@/components/PieChart";
import { GradientStatusBar } from "@/components/GradientStatusBar";
import { PatternAlert } from "@/components/PatternAlert";
import { Stepper } from "@/components/Stepper";
import { Divider } from "@/components/Divider";
import { NavigationTabs } from "@/components/NavigationTabs";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { Textarea } from "@/components/Textarea";
import { Toggle } from "@/components/Toggle";
import { Checkbox } from "@/components/Checkbox";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { StatusStamp } from "@/components/StatusStamp";

// ─── Pilot sync data ───
const pilots = [
  { id: "EVA-00", pilot: "AYANAMI REI", sync: 82 },
  { id: "EVA-01", pilot: "IKARI SHINJI", sync: 41 },
  { id: "EVA-02", pilot: "SORYU ASUKA", sync: 92 },
  { id: "EVA-03", pilot: "SUZUHARA TOJI", sync: 46 },
  { id: "EVA-04", pilot: "NAGISA KAWORU", sync: 86 },
];

// ─── Operations log data (15 rows) ───
const operationsLog = [
  { time: "14:32:01.221", operation: "PATTERN BLUE DETECTED — SECTOR 7G", priority: "CRITICAL", operator: "MAGI-1", status: "CONFIRMED" },
  { time: "14:32:01.445", operation: "A.T. FIELD ANALYSIS INITIATED", priority: "HIGH", operator: "MAGI-2", status: "IN PROGRESS" },
  { time: "14:32:02.102", operation: "MAGI CONSENSUS PROTOCOL REQUESTED", priority: "HIGH", operator: "CENTRAL", status: "PENDING" },
  { time: "14:32:03.018", operation: "SYNC RATE FLUCTUATION — EVA-01", priority: "WARNING", operator: "CAGE-7", status: "MONITORING" },
  { time: "14:32:04.887", operation: "EVANGELION UNIT-01 LAUNCH SEQUENCE", priority: "CRITICAL", operator: "COMMAND", status: "EXECUTING" },
  { time: "14:32:06.333", operation: "UMBILICAL CABLE CONNECTION VERIFIED", priority: "NORMAL", operator: "EVA-01", status: "COMPLETE" },
  { time: "14:32:08.190", operation: "TARGET LOCK ACQUIRED — BEARING 270", priority: "HIGH", operator: "MAGI-3", status: "LOCKED" },
  { time: "14:32:09.441", operation: "PROGRESSIVE KNIFE DEPLOYMENT", priority: "NORMAL", operator: "EVA-01", status: "ARMED" },
  { time: "14:32:11.002", operation: "A.T. FIELD NEUTRALIZATION ATTEMPT", priority: "CRITICAL", operator: "MAGI-1", status: "IN PROGRESS" },
  { time: "14:32:13.887", operation: "ANGEL CORE EXPOSURE DETECTED", priority: "HIGH", operator: "ANALYSIS", status: "CONFIRMED" },
  { time: "14:32:15.100", operation: "EVA-02 STANDBY ORDER ISSUED", priority: "NORMAL", operator: "COMMAND", status: "ACKNOWLEDGED" },
  { time: "14:32:17.442", operation: "LCL PRESSURE NOMINAL — ALL UNITS", priority: "LOW", operator: "MEDICAL", status: "OK" },
  { time: "14:32:19.881", operation: "GEOFRONT PERIMETER SCAN COMPLETE", priority: "LOW", operator: "SECURITY", status: "CLEAR" },
  { time: "14:32:22.003", operation: "S2 ENGINE OUTPUT FLUCTUATION", priority: "WARNING", operator: "MAGI-2", status: "MONITORING" },
  { time: "14:32:24.667", operation: "DUMMY PLUG SYSTEM CHECK — FAILED", priority: "WARNING", operator: "CAGE-3", status: "ERROR" },
];

const showcaseTabs = [
  { id: "mission", label: "MAGI ROUTE" },
  { id: "access", label: "DOGMA ACCESS" },
  { id: "containment", label: "CAGE LOCK" },
];

const missionModeOptions = [
  { value: "synced", label: "SYNCED DEPLOYMENT" },
  { value: "manual", label: "MANUAL ROUTE" },
  { value: "dummy", label: "DUMMY PLUG FALLBACK" },
];

const clearanceBandOptions = [
  { value: "lattice", label: "LATTICE-3 / ACTIVE" },
  { value: "sealed", label: "SEALED-5 / EYES ONLY" },
  { value: "relay", label: "RELAY-1 / REMOTE" },
];

const showcaseLog = [
  "GEOFRONT ROUTER ONLINE",
  "> Operation packet checksum verified",
  "> MAGI routing authority: dual consensus",
  "> Entry plug telemetry uplink established",
  "> Cage launch deck ready for operator input",
];

export default function NervCommandCenter() {
  // ─── State ───
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "EMERGENCY">("NORMAL");
  const [clockSeconds, setClockSeconds] = useState(0);
  const [syncValues, setSyncValues] = useState(pilots.map((p) => p.sync));
  const [anomalyVisible, setAnomalyVisible] = useState(false);
  const [magiVotes, setMagiVotes] = useState<MagiVote[]>([
    { name: "MELCHIOR 1", status: "idle" },
    { name: "BALTHASAR 2", status: "idle" },
    { name: "CASPER 3", status: "idle" },
  ]);

  const [emergencySeverity, setEmergencySeverity] = useState<
    "emergency" | "warning" | "info" | "success" | "critical" | "contrast"
  >("emergency");
  const [showcaseTab, setShowcaseTab] = useState("mission");
  const [autoRouteEnabled, setAutoRouteEnabled] = useState(true);
  const [magiAutovoteEnabled, setMagiAutovoteEnabled] = useState(false);
  const [classificationLockEnabled, setClassificationLockEnabled] = useState(true);
  const [dualAuthorizationEnabled, setDualAuthorizationEnabled] = useState(true);

  const isEmergency = systemStatus === "EMERGENCY";
  const autoTriggeredRef = useRef(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Live clock (seconds since midnight for SegmentDisplay) ───
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockSeconds(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Sync fluctuation every 2s ───
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncValues((prev) =>
        prev.map((v) => Math.max(10, Math.min(99, v + (Math.random() - 0.5) * 6)))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ─── MAGI voting simulation ───
  const triggerMagiVote = useCallback(() => {
    const update = (idx: number, status: "idle" | "computing" | "accepted" | "rejected") =>
      setMagiVotes((prev) => prev.map((v, i) => (i === idx ? { ...v, status } : v)));

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

  // Auto-trigger on mount so the panel isn't static black blocks
  useEffect(() => {
    const timer = setTimeout(() => triggerMagiVote(), 1500);
    return () => clearTimeout(timer);
  }, [triggerMagiVote]);

  // ─── Toggle emergency ───
  const toggleAlert = useCallback(() => {
    setSystemStatus((prev) => {
      const next = prev === "NORMAL" ? "EMERGENCY" : "NORMAL";
      if (next === "EMERGENCY") {
        triggerMagiVote();
        setAnomalyVisible(true);
        setTimeout(() => setAnomalyVisible(false), 10000);
      } else {
        setAnomalyVisible(false);
      }
      return next;
    });
  }, [triggerMagiVote]);

  // ─── Severity picker ───
  const randomSeverity = useCallback(() => {
    const severities: typeof emergencySeverity[] = [
      "emergency", "warning", "critical", "contrast", "info",
    ];
    return severities[Math.floor(Math.random() * severities.length)];
  }, []);

  // ─── Auto-trigger: first at 5s, dismiss at 10s, cycle every 60s ───
  useEffect(() => {
    if (autoTriggeredRef.current) return;

    const firstTimer = setTimeout(() => {
      autoTriggeredRef.current = true;
      setEmergencySeverity("emergency");
      setSystemStatus("EMERGENCY");
      setAnomalyVisible(true);
      triggerMagiVote();

      setTimeout(() => {
        setSystemStatus("NORMAL");
        setAnomalyVisible(false);
      }, 10000);

      cycleRef.current = setInterval(() => {
        const sev = randomSeverity();
        setEmergencySeverity(sev);
        setSystemStatus("EMERGENCY");
        setAnomalyVisible(true);
        triggerMagiVote();

        setTimeout(() => {
          setSystemStatus("NORMAL");
          setAnomalyVisible(false);
        }, 10000);
      }, 60000);
    }, 5000);

    return () => {
      clearTimeout(firstTimer);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [triggerMagiVote, randomSeverity]);

  // ─── Derived values ───
  const majorFrameBorder = isEmergency ? "border-alert-red" : "border-nerv-orange/45";
  const sectionDivider = isEmergency ? "border-alert-red/60" : "border-nerv-mid-gray/70";
  const avgSync = Math.round(syncValues.reduce((a, b) => a + b, 0) / syncValues.length);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: isEmergency ? "#1A0000" : "#000000" }}
    >
      {/* ═══════════════════════════════════════════
          EMERGENCY BANNER (overlay)
          ═══════════════════════════════════════════ */}
      {isEmergency && (
        <EmergencyBanner
          text="EMERGENCY"
          subtext="PATTERN BLUE DETECTED — ALL PERSONNEL TO BATTLE STATIONS"
          visible
          severity={emergencySeverity}
        >
          <Link
            href="/docs"
            className="inline-block text-xs font-mono uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-80 transition-opacity text-nerv-black"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            VIEW DOCUMENTATION
          </Link>
        </EmergencyBanner>
      )}

      {/* ═══════════════════════════════════════════
          HEADER — Compact command bar
          ═══════════════════════════════════════════ */}
      <header className={`w-full border-b-2 ${majorFrameBorder} bg-bg-base`}>
        <div className="px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Left — Title */}
          <div className="text-center lg:text-left shrink-0">
            <h1
              className="text-white text-3xl sm:text-4xl font-black uppercase leading-none"
              style={{ fontFamily: "var(--font-nerv-display)", letterSpacing: "-0.02em" }}
            >
              NERV-UI
            </h1>
            <p
              className="text-nerv-mid-gray text-xs uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              NERV COMMAND CENTER
            </p>
          </div>

          {/* Center — Install snippet */}
          <code className="text-xs font-mono text-nerv-cyan bg-nerv-black/60 px-3 py-1.5 border border-nerv-cyan/30 select-all whitespace-nowrap">
            npm install @mdrbx/nerv-ui
          </code>

          {/* Right — Clock + buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-end">
            <SegmentDisplay
              value={clockSeconds}
              format="H:MM:SS"
              color="orange"
              size="sm"
            />
            <Link href="/docs">
              <Button variant="primary" size="sm">DOCS</Button>
            </Link>
            <Link href="/examples">
              <Button variant="terminal" size="sm">EXAMPLES</Button>
            </Link>
            <a href="https://www.npmjs.com/package/@mdrbx/nerv-ui" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">NPM</Button>
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          STATUS BAR — Thin info strip
          ═══════════════════════════════════════════ */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between px-4 py-1.5 border-b ${sectionDivider} gap-2 ${
          isEmergency ? "bg-nerv-red/10" : "bg-nerv-dark-gray"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 ${isEmergency ? "bg-nerv-red animate-pulse" : "bg-nerv-orange"}`}
          />
          <span
            className={`text-xs uppercase tracking-[0.2em] font-bold ${
              isEmergency ? "text-nerv-red" : "text-nerv-orange"
            }`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            {isEmergency ? "CONDITION RED" : "COMMAND GRID STABLE"}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center">
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
          ROW 1 — KPI Strip (6 metric cards)
          ═══════════════════════════════════════════ */}
      <section className={`border-b ${sectionDivider} px-4 py-4`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard label="ACTIVE UNITS" value="4" color="text-nerv-cyan" />
          <KpiCard label="SYNC RATE" value={`${avgSync}%`} color="text-nerv-orange" />
          <KpiCard label="THREAT LEVEL" value={isEmergency ? "HIGH" : "LOW"} color={isEmergency ? "text-nerv-red" : "text-nerv-orange"} />
          <KpiCard label="POWER GRID" value="98%" color="text-nerv-orange" />
          <KpiCard label="PERSONNEL" value="847" color="text-nerv-cyan" />
          <KpiCard label="MAGI CONSENSUS" value="2/3" color="text-nerv-magenta" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROW 2 — Main Monitoring (3-column)
          ═══════════════════════════════════════════ */}
      <main className={`grid grid-cols-1 lg:grid-cols-12 gap-0 border-b ${majorFrameBorder}`}>
        {/* ─── LEFT (4 cols): Pilot Sync + Phase Status ─── */}
        <div className={`col-span-full lg:col-span-4 lg:border-r ${sectionDivider} p-3 flex flex-col gap-4`}>
          <h3
            className="text-xs uppercase tracking-[0.2em] font-bold text-nerv-orange"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            PILOT SYNCHRONIZATION
          </h3>

          {pilots.map((p, i) => (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-nerv-mid-gray">
                <span>{p.id}</span>
                <span className="text-nerv-cyan">{p.pilot}</span>
              </div>
              <SyncProgressBar
                value={syncValues[i]}
                label={`${p.id} SYNC`}
                blocks={15}
              />
            </div>
          ))}

          <Divider color="orange" variant="dashed" />

          <PhaseStatusStack
            title="SYSTEM PHASES"
            color="orange"
            phases={[
              { label: "MAGI CORE", status: "ok", value: "ONLINE" },
              { label: "A.T. FIELD", status: "ok", value: "ACTIVE" },
              { label: "ENTRY PLUG", status: "warning", value: "SYNC" },
              { label: "S2 ENGINE", status: "danger", value: "LOCKED" },
              { label: "LCL SYSTEM", status: "ok", value: "NOMINAL" },
              { label: "UMBILICAL", status: "ok", value: "CONNECTED" },
              { label: "DUMMY PLUG", status: "inactive", value: "OFF" },
              { label: "N2 MINES", status: "warning", value: "ARMED" },
            ]}
          />
        </div>

        {/* ─── CENTER (5 cols): Charts ─── */}
        <div className={`col-span-full lg:col-span-5 lg:border-r ${sectionDivider} flex flex-col`}>
          {/* Sync Ratio Chart */}
          <div className={`border-b ${sectionDivider} flex flex-col min-h-[200px] lg:min-h-[280px]`}>
            <div className="flex items-center justify-between px-4 py-1.5 bg-nerv-dark-gray border-b border-nerv-mid-gray/30">
              <span
                className="text-xs uppercase tracking-[0.2em] font-bold text-nerv-orange"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                HARMONIC WAVEFORM
              </span>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-nerv-cyan inline-block" />
                  <span className="text-nerv-cyan">DATA-BLUE</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-nerv-magenta inline-block" />
                  <span className="text-nerv-magenta">MAGENTA</span>
                </span>
              </div>
            </div>
            <div className="flex-1">
              <SyncRatioChart showGrid animated />
            </div>
          </div>

          {/* BarChart — Unit Deployment */}
          <div className={`border-b ${sectionDivider} p-3 min-h-[200px] lg:min-h-[280px]`}>
            <BarChart
              bars={[
                { label: "EVA-00", value: syncValues[0] },
                { label: "EVA-01", value: syncValues[1] },
                { label: "EVA-02", value: syncValues[2] },
                { label: "EVA-03", value: syncValues[3] },
                { label: "EVA-04", value: syncValues[4] },
              ]}
              maxValue={100}
              color="orange"
              title="UNIT DEPLOYMENT STATUS"
              showGrid
              showValues
              segmented
              height={200}
              unit="%"
            />
          </div>

          {/* GradientStatusBar — Threat Assessment */}
          <div className="p-3">
            <GradientStatusBar
              value={isEmergency ? 78 : 22}
              label="THREAT ASSESSMENT"
              sublabel={isEmergency ? "ANGEL DETECTED" : "ALL CLEAR"}
              color={isEmergency ? "red" : "cyan"}
              zones={[
                { start: 0, end: 30, color: "#00FF00", label: "LOW" },
                { start: 30, end: 60, color: "#FF9900", label: "MED" },
                { start: 60, end: 80, color: "#FF4400", label: "HIGH" },
                { start: 80, end: 100, color: "#FF0000", label: "CRIT" },
              ]}
            />
          </div>
        </div>

        {/* ─── RIGHT (3 cols): Gauges + PieChart ─── */}
        <div className="col-span-full lg:col-span-3 p-3 flex flex-col gap-4">
          <h3
            className="text-xs uppercase tracking-[0.2em] font-bold text-nerv-orange"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            SYSTEM GAUGES
          </h3>

          <div className="flex flex-row lg:flex-col items-center justify-around gap-4 flex-wrap">
            <Gauge
              value={avgSync}
              label="SYNC"
              unit="%"
              color="orange"
              size={120}
              showTicks
              threshold={85}
            />
            <Gauge
              value={98}
              label="POWER"
              unit="%"
              color="cyan"
              size={120}
              showTicks
            />
            <Gauge
              value={isEmergency ? 42 : 95}
              label="CONTAINMENT"
              unit="%"
              color={isEmergency ? "red" : "orange"}
              size={120}
              showTicks
            />
          </div>

          <Divider color="cyan" variant="dashed" />

          <PieChart
            slices={[
              { label: "DEFENSE", value: 35 },
              { label: "RESEARCH", value: 25 },
              { label: "OPERATIONS", value: 20 },
              { label: "MEDICAL", value: 12 },
              { label: "ADMIN", value: 8 },
            ]}
            title="RESOURCE ALLOCATION"
            size={160}
            donut
            showLegend
            showLabels
            color="orange"
          />
        </div>
      </main>

      {/* ═══════════════════════════════════════════
          ROW 3 — Extended Display (2 columns)
          ═══════════════════════════════════════════ */}
      <section className={`border-b ${majorFrameBorder}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left — DataGrid with 15 rows */}
          <div className={`col-span-full lg:col-span-7 lg:border-r ${sectionDivider}`}>
            <DataGrid
              columns={[
                { key: "time", header: "TIMESTAMP", width: "130px", sortable: true },
                { key: "operation", header: "OPERATION", sortable: true },
                { key: "priority", header: "PRIORITY", align: "center", sortable: true },
                { key: "operator", header: "OPERATOR", align: "center" },
                { key: "status", header: "STATUS", align: "right" },
              ]}
              data={operationsLog}
              color="cyan"
              title="OPERATIONS LOG"
              showIndex
              pageSize={8}
              maxHeight="420px"
            />
          </div>

          {/* Right — MAGI + PatternAlert */}
          <div className="col-span-full lg:col-span-5 flex flex-col">
            <MagiSystemPanel votes={magiVotes} className="flex-1" />

            <div className={`border-t ${sectionDivider} p-3`}>
              <PatternAlert
                designation="3rd ANGEL"
                pattern="PATTERN"
                bloodType="BLUE"
                visible={anomalyVisible}
                color="red"
                animated
                subtitle="SACHIEL — APPROACHING TOKYO-3"
              />
              {!anomalyVisible && (
                <div className="text-xs font-mono text-nerv-mid-gray/50 text-center py-6 uppercase tracking-wider">
                  NO ANOMALY DETECTED — STANDBY
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROW 4 — Component Showcase
          ═══════════════════════════════════════════ */}
      <section className={`border-b ${majorFrameBorder}`}>
        <TargetingContainer label="NERV HOMAGE DECK" color="orange">
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <h2
                  className="text-2xl uppercase tracking-[0.16em] text-nerv-orange"
                  style={{ fontFamily: "var(--font-nerv-display)" }}
                >
                  GEOFRONT DEPLOYMENT DECK
                </h2>
                <p className="mt-2 font-mono text-xs leading-relaxed text-nerv-white/65">
                  A denser showcase built as a small homage to the NERV control
                  rooms: MAGI routing, Dogma access rails, launch telemetry,
                  containment states, and operator tooling living on the same
                  command surface.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge label="MAGI TEXT" variant="default" size="sm" />
                <Badge label="LAUNCH RAILS" variant="warning" size="sm" />
                <Badge label="DOGMA ACCESS" variant="danger" size="sm" />
                <Badge label="BATTLE WORKFLOWS" variant="info" size="sm" />
                <Badge label="LIVE TELEMETRY" variant="success" size="sm" />
                <Badge label="AUTH LAYERS" variant="info" size="sm" />
              </div>
            </div>

            <NavigationTabs
              tabs={showcaseTabs}
              activeTab={showcaseTab}
              onTabChange={setShowcaseTab}
              color="cyan"
              className="overflow-x-auto"
            />

            {showcaseTab === "mission" && (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_20rem]">
                <Card title="MAGI ROUTER" eyebrow="GEOFRONT CONTROL RAIL" className="h-full">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="OPERATOR ID"
                        defaultValue="NERV-HQ / CAGE-07"
                        color="orange"
                        hint="Launch relay bound to the primary MAGI deck"
                      />
                      <SelectMenu
                        label="DEPLOYMENT MODE"
                        options={missionModeOptions}
                        defaultValue="synced"
                        color="orange"
                      />
                    </div>

                    <Textarea
                      label="BRIEFING PACKET"
                      color="orange"
                      defaultValue="Deploy EVA-01 to Sector 7G, maintain shield parity, and stream all telemetry to the MAGI routing lattice."
                      hint="Mission text can be staged inline with the rest of the command surface."
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Checkbox
                        label="LOCK CLASSIFICATION"
                        checked={classificationLockEnabled}
                        onChange={(event) => setClassificationLockEnabled(event.target.checked)}
                        color="orange"
                      />
                      <Toggle
                        label="AUTO-ROUTE"
                        checked={autoRouteEnabled}
                        onChange={setAutoRouteEnabled}
                        color="cyan"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">TRANSMIT TO CAGE</Button>
                      <Button variant="ghost">SAVE DRAFT</Button>
                    </div>
                  </div>
                </Card>

                <Card title="OPERATIONS TERMINAL" eyebrow="LIVE MAGI TEXT" className="h-full">
                  <TerminalDisplay
                    lines={showcaseLog}
                    title="BATTLE STATIONS // MAGI STREAM"
                    color="green"
                    typewriter
                    typeSpeed={18}
                    lineDelay={80}
                    maxHeight="360px"
                    showLineNumbers
                  />
                </Card>

                <div className="flex flex-col gap-4">
                  <Card
                    title="CLEARANCE MARKER"
                    variant="video"
                    rounded
                    className="shrink-0"
                  >
                    <div className="flex min-h-[22.5rem] items-center justify-center overflow-visible py-3">
                      <StatusStamp
                        text={autoRouteEnabled ? "LAUNCH READY" : "STAND BY"}
                        color={autoRouteEnabled ? "green" : "orange"}
                        bordered
                        rotation={-7}
                      />
                    </div>
                  </Card>

                  <Card title="DEPLOYMENT TRACK" eyebrow="INSTALL TO LAUNCH" className="h-full">
                    <Stepper
                      steps={[
                        { label: "BOOT", description: "Install the command surface package" },
                        { label: "SYNC", description: "Compose MAGI forms, telemetry, and alerts" },
                        { label: "LAUNCH", description: "Deploy a NERV-grade interface" },
                      ]}
                      activeStep={2}
                      color="cyan"
                      direction="vertical"
                    />
                  </Card>
                </div>
              </div>
            )}

            {showcaseTab === "access" && (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <Card title="DOGMA ACCESS RAIL" eyebrow="NAVIGATION / INPUT / ACTIONS" className="h-full">
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <SelectMenu
                        label="CLEARANCE BAND"
                        options={clearanceBandOptions}
                        defaultValue="lattice"
                        color="cyan"
                      />
                      <InputField
                        label="SIGNATURE HASH"
                        defaultValue="B7-22 / MELCHIOR"
                        color="cyan"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Checkbox
                        label="DUAL AUTHORIZATION"
                        checked={dualAuthorizationEnabled}
                        onChange={(event) => setDualAuthorizationEnabled(event.target.checked)}
                        color="cyan"
                      />
                      <Toggle
                        label="MAGI AUTOVOTE"
                        checked={magiAutovoteEnabled}
                        onChange={setMagiAutovoteEnabled}
                        color="green"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge label="TERMINAL DOGMA" variant="danger" size="sm" />
                      <Badge label="CHAIN OF CUSTODY" variant="warning" size="sm" />
                      <Badge label="MAGI VERIFIED" variant="success" size="sm" />
                    </div>

                    <Divider color="cyan" variant="dashed" />

                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">REQUEST CONSENSUS</Button>
                      <Button variant="terminal">OPEN RELAY</Button>
                      <Button variant="ghost">ARCHIVE TRACE</Button>
                    </div>
                  </div>
                </Card>

                <div className="grid gap-4">
                  <PatternAlert
                    designation="TERMINAL DOGMA"
                    pattern="ACCESS"
                    bloodType="ORANGE"
                    visible
                    color="orange"
                    animated
                    subtitle="CLEARANCE ESCALATION REQUIRES MAGI CONSENSUS"
                  />

                  <PhaseStatusStack
                    title="DOGMA AUTH STATES"
                    color="cyan"
                    phases={[
                      { label: "PRIMARY KEY", status: "ok", value: "VALID" },
                      { label: "SECONDARY SIGN", status: "warning", value: "PENDING" },
                      { label: "MAGI ROUTE", status: magiAutovoteEnabled ? "ok" : "inactive", value: magiAutovoteEnabled ? "AUTO" : "MANUAL" },
                      { label: "CHAIN LOCK", status: "ok", value: "TRACKED" },
                    ]}
                  />
                </div>
              </div>
            )}

            {showcaseTab === "containment" && (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
                <Card title="CAGE CONTAINMENT WATCH" eyebrow="STATUS BARS / BADGES" className="h-full">
                  <div className="space-y-5">
                    <GradientStatusBar
                      label="A.T. FIELD STABILITY"
                      sublabel="NOMINAL DURING RAPID DEPLOYMENT"
                      value={82}
                      color="cyan"
                      zones={[
                        { start: 0, end: 30, color: "#FF0000", label: "CRIT" },
                        { start: 30, end: 55, color: "#FF9900", label: "WARN" },
                        { start: 55, end: 80, color: "#FFFF00", label: "SYNC" },
                        { start: 80, end: 100, color: "#00FF00", label: "STABLE" },
                      ]}
                    />

                    <GradientStatusBar
                      label="CAGE PRESSURE"
                      sublabel="HARD LIMITS HOLDING ACROSS ALL LOCKS"
                      value={68}
                      color="orange"
                      zones={[
                        { start: 0, end: 20, color: "#00FF00", label: "LOW" },
                        { start: 20, end: 50, color: "#FFFF00", label: "MED" },
                        { start: 50, end: 75, color: "#FF9900", label: "HIGH" },
                        { start: 75, end: 100, color: "#FF0000", label: "CRIT" },
                      ]}
                    />

                    <div className="flex flex-wrap gap-2">
                      <Badge label="A.T. FIELD" variant="warning" size="sm" />
                      <Badge label="CAGE LOCKS" variant="success" size="sm" />
                      <Badge label="MANUAL OVERRIDE" variant="default" size="sm" />
                    </div>
                  </div>
                </Card>

                <Card title="ESCALATION READY" variant="alert" rounded className="h-full">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <div className="flex min-h-[10rem] items-center justify-center overflow-visible">
                      <StatusStamp
                        text={magiAutovoteEnabled ? "DOGMA LOCK" : "STANDBY"}
                        color={magiAutovoteEnabled ? "red" : "orange"}
                        bordered
                        rotation={-6}
                      />
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-mono leading-relaxed text-nerv-white/72">
                        The stamps, cards, and gauge rails stay compact enough to
                        feel like a command panel homage rather than a detached
                        marketing block, even when containment flips into alert.
                      </p>
                      <Button variant="danger" fullWidth>
                        ENGAGE DOGMA LOCK
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </TargetingContainer>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer
        className={`px-4 py-3 border-t-2 ${majorFrameBorder} ${
          isEmergency ? "bg-nerv-red/5" : "bg-nerv-dark-gray"
        } flex flex-col gap-3 text-xs font-mono text-nerv-mid-gray`}
      >
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/docs" className="text-nerv-cyan hover:text-nerv-orange transition-colors uppercase tracking-wider">
            DOCUMENTATION
          </Link>
          <span className="text-nerv-mid-gray/30">|</span>
          <Link href="/examples" className="text-nerv-cyan hover:text-nerv-orange transition-colors uppercase tracking-wider">
            EXAMPLES
          </Link>
          <span className="text-nerv-mid-gray/30">|</span>
          <a href="https://github.com/mdrbx/nerv-ui" target="_blank" rel="noopener noreferrer" className="text-nerv-cyan hover:text-nerv-orange transition-colors uppercase tracking-wider">
            GITHUB
          </a>
          <span className="text-nerv-mid-gray/30">|</span>
          <a href="https://www.npmjs.com/package/@mdrbx/nerv-ui" target="_blank" rel="noopener noreferrer" className="text-nerv-cyan hover:text-nerv-orange transition-colors uppercase tracking-wider">
            NPM
          </a>
        </div>

        {/* Attribution + quote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            MADE WITH [REDACTED] BY{" "}
            <span className="text-nerv-orange">mdrbx</span>
          </span>
          <span className="text-nerv-mid-gray/50 italic">
            &ldquo;GOD&apos;S IN HIS HEAVEN. ALL&apos;S RIGHT WITH THE WORLD.&rdquo;
          </span>
        </div>
      </footer>
    </div>
  );
}

// ─── KPI Card helper component ───
function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <Card variant="hud" className="border-nerv-mid-gray/70">
      <div className="text-center py-2 px-1">
        <div className={`text-xl sm:text-2xl font-black font-mono ${color}`}>{value}</div>
        <div
          className="text-xs text-nerv-mid-gray uppercase tracking-wider mt-1"
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          {label}
        </div>
      </div>
    </Card>
  );
}
