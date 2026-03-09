"use client";

import { useState, useEffect } from "react";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DataGrid } from "@/components/DataGrid";
import { TargetingContainer } from "@/components/TargetingContainer";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { EvaBarChart } from "@/components/EvaBarChart";
import { EvaGauge } from "@/components/EvaGauge";
import { EvaPieChart } from "@/components/EvaPieChart";
import { NavigationTabs } from "@/components/NavigationTabs";
import { SurveillanceGrid } from "@/components/SurveillanceGrid";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { PatternAlert } from "@/components/PatternAlert";
import { TargetingReticle } from "@/components/TargetingReticle";

// ─── Simulated sensor data ───
const sensorNames = ["THERMAL", "PRESSURE", "RADIATION", "EM-FIELD", "BIO-METRIC"];

const initialEvents = [
  { time: "14:30:00.000", sensor: "THERMAL", value: "312.4", status: "NOMINAL" },
  { time: "14:30:01.102", sensor: "PRESSURE", value: "1.02", status: "NOMINAL" },
  { time: "14:30:02.445", sensor: "RADIATION", value: "0.03", status: "LOW" },
];

export default function RealtimeDashboard() {
  const [sensorValues, setSensorValues] = useState([72, 45, 88, 33, 61]);
  const [events, setEvents] = useState(initialEvents);
  const [tick, setTick] = useState(0);
  const [viewTab, setViewTab] = useState("overview");

  // ─── Fluctuate sensor values ───
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues((prev) =>
        prev.map((v) =>
          Math.max(5, Math.min(99, v + (Math.random() - 0.5) * 8))
        )
      );
      setTick((t) => t + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // ─── Accumulate events ───
  useEffect(() => {
    if (tick === 0 || tick > 20) return;
    const statuses = ["NOMINAL", "WARNING", "CRITICAL", "LOW"];
    const newEvent = {
      time: `14:30:${String(tick * 2).padStart(2, "0")}.${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
      sensor: sensorNames[Math.floor(Math.random() * sensorNames.length)],
      value: (Math.random() * 500).toFixed(1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    setEvents((prev) => [...prev, newEvent]);
  }, [tick]);

  // Derived bar chart data
  const barChartBars = sensorNames.map((name, i) => ({
    label: name,
    value: Math.round(sensorValues[i]),
    color: sensorValues[i] > 80 ? "#FF0000" : sensorValues[i] > 60 ? "#FF9900" : "#00FF00",
  }));

  // Derived pie data
  const statusCounts = events.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const pieSlices = Object.entries(statusCounts).map(([label, value]) => ({
    label,
    value,
    color:
      label === "NOMINAL"
        ? "#00FF00"
        : label === "WARNING"
          ? "#FF9900"
          : label === "CRITICAL"
            ? "#FF0000"
            : "#00FFFF",
  }));

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Header */}
      <div className="border-b border-eva-green px-6 py-3">
        <h1
          className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          REAL-TIME MONITORING STATION
        </h1>
        <p className="text-[10px] font-mono text-eva-white/50 mt-1">
          LIVE SENSOR FEEDS — NERV GEOFRONT — LEVEL B-06
        </p>
      </div>

      {/* Alert bar */}
      {tick > 12 && (
        <EmergencyBanner
          text="ANOMALY DETECTED"
          subtext="SENSOR READINGS EXCEEDING THRESHOLD — INVESTIGATION REQUIRED"
          visible
          severity="warning"
        />
      )}

      {/* Pattern Alert on anomaly */}
      {tick > 12 && (
        <div className="px-6 py-2">
          <PatternAlert
            designation="UNKNOWN TARGET"
            bloodType="ORANGE"
            color="red"
            subtitle="PATTERN ANALYSIS IN PROGRESS — MAGI CONSENSUS REQUIRED"
          />
        </div>
      )}

      {/* Tab navigation */}
      <NavigationTabs
        tabs={[
          { id: "overview", label: "OVERVIEW" },
          { id: "charts", label: "CHART ANALYSIS" },
          { id: "events", label: "EVENT FEED" },
        ]}
        activeTab={viewTab}
        onTabChange={setViewTab}
        color="cyan"
      />

      {viewTab === "overview" && (
        <div className="grid grid-cols-12 gap-0">
          {/* Left: Sensor Bars */}
          <div className="col-span-3 border-r border-eva-green p-4">
            <h2
              className="text-xs uppercase tracking-[0.2em] text-eva-orange font-bold mb-4"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              SENSOR ARRAY
            </h2>
            <div className="space-y-4">
              {sensorNames.map((name, i) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-eva-white/50">
                    <span>{name}</span>
                    <span className="text-eva-cyan">
                      {sensorValues[i].toFixed(1)}%
                    </span>
                  </div>
                  <SyncProgressBar
                    value={sensorValues[i]}
                    label={name}
                    blocks={12}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-eva-white/10 pt-4">
              <SegmentDisplay value={600} countdown format="MM:SS" size="md" label="ACTIVE TIME REMAINING" color="orange" />
            </div>
          </div>

          {/* Center: Dual waveforms */}
          <div className="col-span-5 flex flex-col">
            <TargetingContainer label="WAVEFORM A — PRIMARY" color="cyan">
              <div style={{ height: "200px" }}>
                <SyncRatioChart
                  showGrid
                  animated
                  frequencyA={0.04}
                  frequencyB={0.06}
                  speed={1.5}
                />
              </div>
            </TargetingContainer>

            <TargetingContainer label="WAVEFORM B — SECONDARY" color="orange">
              <div style={{ height: "200px" }}>
                <SyncRatioChart
                  showGrid
                  animated
                  frequencyA={0.08}
                  frequencyB={0.12}
                  amplitudeA={35}
                  amplitudeB={25}
                  speed={2}
                />
              </div>
            </TargetingContainer>
          </div>

          {/* Right: Gauges + mini pie */}
          <div className="col-span-4 border-l border-eva-green p-4 space-y-4">
            <h2
              className="text-xs uppercase tracking-[0.2em] text-eva-orange font-bold"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              SYSTEM GAUGES
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <EvaGauge
                value={Math.round(sensorValues[0])}
                label="THERMAL"
                color="orange"
                size={130}
                threshold={85}
              />
              <EvaGauge
                value={Math.round(sensorValues[2])}
                label="RADIATION"
                color="green"
                size={130}
                threshold={90}
              />
              <EvaGauge
                value={Math.round(sensorValues[3])}
                label="EM-FIELD"
                color="cyan"
                size={130}
              />
              <EvaGauge
                value={Math.round(sensorValues[4])}
                label="BIO-METRIC"
                color="magenta"
                size={130}
              />
            </div>

            <div className="border-t border-eva-white/10 pt-3">
              <EvaPieChart
                title="EVENT STATUS"
                slices={pieSlices}
                size={120}
                donut
                showLegend
              />
            </div>
          </div>
        </div>
      )}

      {viewTab === "charts" && (
        <div className="grid grid-cols-12 gap-0">
          {/* Left: Vertical bar chart */}
          <div className="col-span-6 p-4 border-r border-eva-green">
            <TargetingContainer label="SENSOR LEVELS — VERTICAL" color="cyan">
              <div className="p-4">
                <EvaBarChart
                  title="CURRENT READINGS"
                  bars={barChartBars}
                  unit="%"
                  color="cyan"
                  height={240}
                />
              </div>
            </TargetingContainer>
          </div>

          {/* Right: Horizontal bar chart */}
          <div className="col-span-6 p-4">
            <TargetingContainer label="SENSOR LEVELS — HORIZONTAL" color="orange">
              <div className="p-4">
                <EvaBarChart
                  title="CURRENT READINGS"
                  bars={barChartBars}
                  unit="%"
                  color="orange"
                  direction="horizontal"
                />
              </div>
            </TargetingContainer>
          </div>

          {/* Bottom: Gauges row + Pie */}
          <div className="col-span-8 p-4 border-t border-eva-green">
            <TargetingContainer label="GAUGE ARRAY" color="green">
              <div className="flex flex-wrap items-center justify-center gap-4 p-4">
                {sensorNames.map((name, i) => (
                  <EvaGauge
                    key={name}
                    value={Math.round(sensorValues[i])}
                    label={name}
                    color={
                      (["cyan", "green", "orange", "red", "magenta"] as const)[i]
                    }
                    size={120}
                    threshold={85}
                  />
                ))}
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-4 p-4 border-t border-l border-eva-green">
            <TargetingContainer label="STATUS DISTRIBUTION" color="orange">
              <div className="flex justify-center p-4">
                <EvaPieChart
                  title="EVENT BREAKDOWN"
                  slices={pieSlices}
                  size={180}
                  donut
                />
              </div>
            </TargetingContainer>

            <div className="mt-4">
              <TargetingContainer label="THREAT ASSESSMENT" color="red">
                <div className="flex justify-center p-4">
                  <EvaPieChart
                    slices={[
                      { label: "SAFE", value: 60 },
                      { label: "MONITOR", value: 25 },
                      { label: "DANGER", value: 15 },
                    ]}
                    size={140}
                    color="mixed"
                  />
                </div>
              </TargetingContainer>
            </div>
          </div>

          {/* Waveforms at bottom */}
          <div className="col-span-12 border-t border-eva-green">
            <TargetingContainer label="HARMONIC ANALYSIS" color="cyan">
              <div style={{ height: "200px" }}>
                <SyncRatioChart
                  showGrid
                  animated
                  frequencyA={0.03}
                  frequencyB={0.05}
                  speed={1}
                />
              </div>
            </TargetingContainer>
          </div>

          {/* Targeting + Surveillance row */}
          <div className="col-span-4 p-4 border-t border-eva-green flex items-center justify-center">
            <TargetingReticle
              size={250}
              mode="TRACK:AUTO"
              color="cyan"
              targetLabel="SENSOR ARRAY"
              coordinates={{ x: "135.221", y: "035.445" }}
              readouts={[
                { label: "RANGE", value: "4.2km" },
                { label: "BEARING", value: "N/NW" },
              ]}
            />
          </div>
          <div className="col-span-8 border-t border-l border-eva-green">
            <SurveillanceGrid
              title="GEOFRONT MONITORING"
              color="green"
              columns={3}
              feeds={[
                { id: "CAM-01", label: "SECTOR 7-A", subLabel: "Level B-06", status: "active" },
                { id: "CAM-02", label: "CAGE-01", subLabel: "EVA-01 Bay", status: "active" },
                { id: "CAM-03", label: "CENTRAL DOGMA", subLabel: "Main Hall", status: "warning" },
                { id: "CAM-04", label: "TERMINAL DOGMA", subLabel: "Restricted", status: "signal-lost" },
                { id: "CAM-05", label: "LCL PLANT", subLabel: "Processing", status: "active" },
                { id: "CAM-06", label: "GATE 7 NORTH", subLabel: "Perimeter", status: "active" },
              ]}
            />
          </div>
        </div>
      )}

      {viewTab === "events" && (
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12">
            <DataGrid
              columns={[
                { key: "time", header: "TIME", width: "140px", sortable: true },
                { key: "sensor", header: "SENSOR", sortable: true },
                { key: "value", header: "VALUE", align: "right", sortable: true, type: "float" },
                { key: "status", header: "STATUS", align: "center", sortable: true },
              ]}
              data={events}
              color="green"
              title="LIVE EVENT FEED"
              showIndex
              pageSize={15}
              maxHeight="600px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
