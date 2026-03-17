"use client";

import { useEffect, useState } from "react";
import { MonitorOverlay } from "@/components/MonitorOverlay";
import { TargetingContainer } from "@/components/TargetingContainer";
import { DataGrid } from "@/components/DataGrid";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { BarChart } from "@/components/BarChart";
import { Gauge } from "@/components/Gauge";
import { PieChart } from "@/components/PieChart";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Card } from "@/components/Card";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { SurveillanceGrid } from "@/components/SurveillanceGrid";

const deploymentRows = [
  { tier: "PROTOTYPE", nodes: 4, storage: "1 TB", sync: "60 HZ", price: 499, response: "24H" },
  { tier: "PRODUCTION", nodes: 16, storage: "10 TB", sync: "120 HZ", price: 1999, response: "12H" },
  { tier: "ENTERPRISE", nodes: 64, storage: "100 TB", sync: "240 HZ", price: 7999, response: "2H" },
  { tier: "NERV-CLASS", nodes: 256, storage: "1 PB", sync: "∞", price: 29999, response: "LIVE" },
];

export default function SaasLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [featureTab, setFeatureTab] = useState("sync");
  const [gaugeVal, setGaugeVal] = useState(73);

  useEffect(() => {
    const interval = setInterval(() => {
      setGaugeVal((value) => Math.max(24, Math.min(98, value + (Math.random() - 0.45) * 6)));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-nerv-black">
      <section className="relative overflow-hidden border-b border-nerv-orange/30">
        <MonitorOverlay
          color="green"
          opacity={0.28}
          density="sparse"
          label="GENESIS MONITOR"
          secondaryLabel="SYNC SURFACE"
          className="absolute inset-0"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_22rem]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-nerv-green">
                <span>DEPLOYMENT BRIEF</span>
                <span className="text-nerv-white/30">/</span>
                <span className="text-nerv-orange">GENESIS PROGRAM</span>
              </div>

              <div>
                <h1
                  className="text-4xl font-black uppercase tracking-[0.14em] text-nerv-white sm:text-5xl"
                  style={{ fontFamily: "var(--font-nerv-display)" }}
                >
                  GENESIS DEPLOYMENT BOARD
                </h1>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-nerv-white/70">
                  Procurement and monitoring interface for a NERV-adjacent neural
                  infrastructure platform. The page is intentionally framed like an
                  incident-ready command terminal instead of a consumer SaaS landing.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  { label: "THROUGHPUT", value: "94.7%", color: "text-nerv-green" },
                  { label: "SYNC LATENCY", value: "0.3MS", color: "text-nerv-cyan" },
                  { label: "SEQUENCE LOAD", value: "12.4M", color: "text-nerv-orange" },
                  { label: "UPTIME", value: "99.99%", color: "text-nerv-green" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="border border-nerv-mid-gray/40 bg-nerv-dark-gray/70 px-3 py-3"
                  >
                    <div
                      className="text-[9px] uppercase tracking-[0.22em] text-nerv-white/40"
                      style={{ fontFamily: "var(--font-nerv-display)" }}
                    >
                      {metric.label}
                    </div>
                    <div
                      className={`mt-2 font-mono text-2xl ${metric.color}`}
                    >
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => document.getElementById("access-request")?.scrollIntoView({ behavior: "smooth" })}
                >
                  REQUEST ACCESS
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => document.getElementById("live-systems")?.scrollIntoView({ behavior: "smooth" })}
                >
                  OPEN LIVE SYSTEMS
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card title="PROGRAM STATUS">
                <div className="space-y-3">
                  <div className="flex justify-center border border-nerv-green/20 bg-nerv-black/80 py-4">
                    <SegmentDisplay value={8547} format="raw" digits={5} color="orange" size="md" />
                  </div>
                  <div className="space-y-2 font-mono text-xs text-nerv-white/70">
                    <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                      <span>PROCUREMENT CLASS</span>
                      <span className="text-nerv-green">APPROVED</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                      <span>FIELD RISK</span>
                      <span className="text-nerv-orange">MANAGED</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                      <span>AUTH CHANNEL</span>
                      <span className="text-nerv-cyan">MAGI VERIFIED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ESCALATION</span>
                      <span className="text-nerv-red">NERV-CLASS</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="PURCHASE DIRECTIVES">
                <div className="space-y-3 font-mono text-xs leading-relaxed text-nerv-white/75">
                  <p>Deployments are evaluated like operational programs, not like self-serve subscriptions.</p>
                  <p>Every tier exposes compute, storage and sync characteristics as part of the decision rail.</p>
                  <p>NERV-CLASS remains visible as a controlled escalation target rather than a marketing upsell.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="live-systems" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-8">
            <TargetingContainer
              label="LIVE SYSTEM MONITORING"
              color="cyan"
              className="h-full overflow-hidden"
            >
              <div className="h-[252px] overflow-hidden">
                <SyncRatioChart
                  className="h-full"
                  showGrid
                  animated
                  speed={2}
                  frequencyA={0.06}
                  frequencyB={0.09}
                />
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-full lg:col-span-4">
            <TargetingContainer label="SYNC INSTRUMENT" color="green">
              <div className="flex justify-center py-4">
                <Gauge value={Math.round(gaugeVal)} label="PILOT-01" color="green" size={190} threshold={90} />
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-full lg:col-span-7">
            <TargetingContainer label="SUBSYSTEM PERFORMANCE" color="orange">
              <div className="p-4">
                <BarChart
                  title="MODULE STATUS"
                  direction="horizontal"
                  bars={[
                    { label: "NEURAL I/O", value: 94 },
                    { label: "GENOME PROC", value: 78 },
                    { label: "A.T. FIELD", value: 100 },
                    { label: "TELEMETRY", value: 86 },
                    { label: "BIO-SYNC", value: 71 },
                  ]}
                  unit="%"
                  color="green"
                  segmented
                />
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-full lg:col-span-5">
            <TargetingContainer label="RESOURCE SHUNT" color="cyan">
              <div className="flex justify-center p-4">
                <PieChart
                  slices={[
                    { label: "COMPUTE", value: 45 },
                    { label: "MEMORY", value: 25 },
                    { label: "NETWORK", value: 20 },
                    { label: "STORAGE", value: 10 },
                  ]}
                  size={160}
                  donut
                  color="cyan"
                />
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-full lg:col-span-12">
            <SurveillanceGrid
              title="DATACENTER FEEDS"
              color="cyan"
              columns={3}
              feeds={[
                { id: "DC-01", label: "RACK A-1", status: "active" },
                { id: "DC-02", label: "RACK A-2", status: "active" },
                { id: "DC-03", label: "RACK B-1", status: "warning" },
                { id: "DC-04", label: "COOLING SYS", status: "active" },
                { id: "DC-05", label: "POWER DIST", status: "active" },
                { id: "DC-06", label: "BACKUP GEN", status: "offline" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-nerv-orange/20 bg-nerv-dark-gray/30 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h2
              className="text-xl uppercase tracking-[0.22em] text-nerv-orange"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              OPERATIONAL PILLARS
            </h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-nerv-white/35">
              SELECT A SUBSYSTEM TO REVIEW ITS DEPLOYMENT VALUE
            </p>
          </div>

          <NavigationTabs
            tabs={[
              { id: "sync", label: "NEURAL SYNC" },
              { id: "genome", label: "GENOME PROCESSOR" },
              { id: "security", label: "A.T. FIELD SECURITY" },
            ]}
            activeTab={featureTab}
            onTabChange={setFeatureTab}
            color="orange"
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_20rem]">
            {featureTab === "sync" && (
              <>
                <Card title="NEURAL SYNC ENGINE" className="h-full">
                  <div className="space-y-4">
                    <p className="font-mono text-xs leading-relaxed text-nerv-white/75">
                      Real-time neural pattern synchronization with sub-millisecond
                      latency, monitored as an operational subsystem instead of a
                      showroom animation. The module is tuned for incident response,
                      concurrency and operator trust.
                    </p>
                    <div className="h-[176px] overflow-hidden">
                      <SyncRatioChart
                        className="h-full"
                        showGrid
                        animated
                        speed={2}
                        frequencyA={0.06}
                        frequencyB={0.09}
                      />
                    </div>
                  </div>
                </Card>
                <Card title="SYNC METRICS" className="h-full">
                  <div className="space-y-3 font-mono text-xs text-nerv-white/75">
                    <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                      <span>LATENCY</span>
                      <span className="text-nerv-cyan">0.3MS</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                      <span>STREAMS</span>
                      <span className="text-nerv-green">256</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ACCURACY</span>
                      <span className="text-nerv-orange">99.9%</span>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {featureTab === "genome" && (
              <>
                <Card title="GENOME PROCESSOR">
                  <div className="space-y-4">
                    <p className="font-mono text-xs leading-relaxed text-nerv-white/75">
                      Parallel genomic analysis routed like a live compute plant.
                      The emphasis is on monitored throughput and control surfaces,
                      not on lifestyle-product storytelling.
                    </p>
                    <BarChart
                      bars={[
                        { label: "DNA SEQ", value: 92 },
                        { label: "PROTEIN", value: 78 },
                        { label: "GENE EXP", value: 85 },
                        { label: "MUTATION", value: 63 },
                        { label: "FOLDING", value: 91 },
                      ]}
                      unit="%"
                      color="green"
                      direction="horizontal"
                      segmented
                    />
                  </div>
                </Card>
                <Card title="PROCESS MIX">
                  <div className="flex justify-center py-4">
                    <PieChart
                      slices={[
                        { label: "HUMAN", value: 45 },
                        { label: "ANGEL", value: 30 },
                        { label: "HYBRID", value: 15 },
                        { label: "UNKNOWN", value: 10 },
                      ]}
                      size={160}
                      donut
                      color="green"
                    />
                  </div>
                </Card>
              </>
            )}

            {featureTab === "security" && (
              <>
                <Card title="A.T. FIELD SECURITY">
                  <div className="space-y-3 font-mono text-xs text-nerv-white/75">
                    {[
                      { name: "PERIMETER SHIELD", status: "ACTIVE", color: "text-nerv-green" },
                      { name: "DATA ENCRYPTION", status: "AES-256", color: "text-nerv-cyan" },
                      { name: "INTRUSION DETECT", status: "ARMED", color: "text-nerv-green" },
                      { name: "BIO-AUTH LAYER", status: "ENABLED", color: "text-nerv-orange" },
                      { name: "QUANTUM TUNNEL", status: "LOCKED", color: "text-nerv-cyan" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                        <span>{item.name}</span>
                        <span className={item.color}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card title="SHIELD INTEGRITY">
                  <div className="flex flex-col items-center gap-4 py-2">
                    <Gauge value={100} label="FIELD" color="green" size={180} />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-nerv-green">
                      ZERO BREACHES SINCE INITIALIZATION
                    </p>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="space-y-6">
          <div>
            <h2
              className="text-xl uppercase tracking-[0.22em] text-nerv-orange"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              PROCUREMENT MATRIX
            </h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-nerv-white/35">
              INFRASTRUCTURE TIERS TREATED AS OPERATIONAL PROGRAMS
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {deploymentRows.map((row) => (
              <Card key={row.tier} title={row.tier} variant={row.tier === "NERV-CLASS" ? "alert" : "default"}>
                <div className="space-y-3">
                  <div
                    className={`font-mono text-3xl ${row.tier === "NERV-CLASS" ? "text-nerv-red" : "text-nerv-cyan"}`}
                  >
                    ${row.price.toLocaleString()}
                  </div>
                  <div className="space-y-2 font-mono text-xs text-nerv-white/70">
                    <div className="flex justify-between"><span>NODES</span><span className="text-nerv-green">{row.nodes}</span></div>
                    <div className="flex justify-between"><span>STORAGE</span><span className="text-nerv-cyan">{row.storage}</span></div>
                    <div className="flex justify-between"><span>SYNC</span><span className="text-nerv-orange">{row.sync}</span></div>
                    <div className="flex justify-between"><span>RESPONSE</span><span className="text-nerv-white">{row.response}</span></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <DataGrid
            columns={[
              { key: "tier", header: "TIER", sortable: true },
              { key: "nodes", header: "COMPUTE NODES", align: "center", sortable: true, type: "int" },
              { key: "storage", header: "STORAGE", align: "center" },
              { key: "sync", header: "SYNC RATE", align: "center" },
              { key: "response", header: "RESPONSE", align: "center" },
              { key: "price", header: "COST/MO", align: "right", sortable: true, type: "int" },
            ]}
            data={deploymentRows}
            color="orange"
            title="FULL COMPARISON MATRIX"
          />
        </div>
      </section>

      <section id="access-request" className="border-t border-nerv-green/20 bg-nerv-dark-gray/20 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Card title="ACCESS REQUEST TERMINAL">
            <div className="space-y-5">
              <p className="font-mono text-xs leading-relaxed text-nerv-white/70">
                Request a deployment key through the same briefing grammar as the
                rest of the page. This stays closer to procurement control software
                than to a conversion-optimized marketing CTA.
              </p>

              {submitted ? (
                <div className="space-y-4 border border-nerv-green/25 bg-nerv-black/80 p-4 text-center">
                  <div className="font-mono text-sm uppercase tracking-[0.18em] text-nerv-green">
                    ACCESS REQUEST TRANSMITTED
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-nerv-white/40">
                    MAGI VERIFICATION WINDOW: 24 HOURS
                  </div>
                  <div className="flex justify-center">
                    <CountdownTimer initialSeconds={86400} />
                  </div>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem]">
                  <InputField
                    label="CONTACT ID"
                    placeholder="operator@nerv.gov"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    color="green"
                    type="email"
                  />
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      if (email.trim()) {
                        setSubmitted(true);
                      }
                    }}
                  >
                    TRANSMIT
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
