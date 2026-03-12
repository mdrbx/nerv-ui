"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TitleScreen } from "@/components/TitleScreen";
import { HexGridBackground } from "@/components/HexGridBackground";
import { TargetingContainer } from "@/components/TargetingContainer";
import { DataGrid } from "@/components/DataGrid";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { SystemDialog } from "@/components/SystemDialog";
import { SeeleMonolith } from "@/components/SeeleMonolith";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { BarChart } from "@/components/BarChart";
import { Gauge } from "@/components/Gauge";
import { PieChart } from "@/components/PieChart";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Card } from "@/components/Card";
import { WireframeLoader } from "@/components/WireframeLoader";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Accordion, AccordionItem } from "@/components/Accordion";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { TargetingReticle } from "@/components/TargetingReticle";
import { SurveillanceGrid } from "@/components/SurveillanceGrid";

export default function SaasLandingPage() {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [featureTab, setFeatureTab] = useState("sync");
  const [gaugeVal, setGaugeVal] = useState(73);

  // Animate gauge
  useEffect(() => {
    const interval = setInterval(() => {
      setGaugeVal((v) => Math.max(20, Math.min(98, v + (Math.random() - 0.45) * 6)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[600px] overflow-hidden">
        <HexGridBackground color="green" />
        <div className="absolute inset-0 z-10">
          <TitleScreen
            title="GENESIS"
            subtitle="NEURAL INTERFACE PLATFORM"
            align="center"
            className="!min-h-0 !h-full"
          />
        </div>
        <div className="absolute bottom-12 left-0 right-0 z-20 text-center space-y-4">
          <p className="text-eva-white/60 font-mono text-sm uppercase tracking-[0.3em]">
            NEXT-GENERATION ROBOTICS &amp; GENOMICS INFRASTRUCTURE
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
              REQUEST ACCESS
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              EXPLORE →
            </Button>
          </div>
        </div>

        {/* Decorative loaders */}
        <div className="absolute top-6 left-6 z-20 opacity-50">
          <WireframeLoader size={40} color="green" label="" speed={4} />
        </div>
        <div className="absolute top-6 right-6 z-20 opacity-50">
          <WireframeLoader size={40} color="cyan" label="" speed={3} />
        </div>
      </section>

      {/* ═══════ METRICS BAR ═══════ */}
      <section className="border-y border-eva-orange bg-eva-dark-gray">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { label: "NEURAL THROUGHPUT", value: "94.7%", color: "text-eva-green" },
            { label: "SYNC LATENCY", value: "0.3ms", color: "text-eva-cyan" },
            { label: "GENOME SEQUENCES", value: "12.4M", color: "text-eva-orange" },
            { label: "UPTIME", value: "99.99%", color: "text-eva-green" },
          ].map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-6 py-5 border-r border-eva-orange/20 last:border-r-0 text-center"
            >
              <div
                className={`text-3xl font-bold ${metric.color}`}
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {metric.value}
              </div>
              <div
                className="text-[10px] text-eva-white/40 uppercase tracking-[0.15em] mt-1"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ LIVE DEMO SECTION ═══════ */}
      <section className="max-w-6xl mx-auto py-14 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl uppercase tracking-[0.2em] text-eva-orange font-bold text-center mb-2"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          LIVE SYSTEM DEMONSTRATION
        </motion.h2>
        <p className="text-center text-eva-white/40 text-xs font-mono mb-8">
          REAL-TIME DATA VISUALIZATION — ALL INDICATORS ACTIVE
        </p>

        <div className="grid grid-cols-12 gap-4">
          {/* Waveform */}
          <div className="col-span-8">
            <TargetingContainer label="NEURAL SYNC WAVEFORM" color="cyan">
              <div style={{ height: "200px" }}>
                <SyncRatioChart showGrid animated speed={2} frequencyA={0.06} frequencyB={0.09} />
              </div>
            </TargetingContainer>
          </div>

          {/* Gauge */}
          <div className="col-span-4">
            <TargetingContainer label="SYNC RATE" color="green">
              <div className="flex justify-center py-4">
                <Gauge value={Math.round(gaugeVal)} label="PILOT-01" color="green" size={180} threshold={90} />
              </div>
            </TargetingContainer>
          </div>

          {/* Bar Chart + Pie */}
          <div className="col-span-7">
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
                />
              </div>
            </TargetingContainer>
          </div>

          <div className="col-span-5">
            <TargetingContainer label="RESOURCE ALLOCATION" color="cyan">
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

          {/* New row: SegmentDisplay + TargetingReticle + Surveillance */}
          <div className="col-span-3">
            <TargetingContainer label="UPTIME COUNTER" color="orange">
              <div className="flex justify-center p-4">
                <SegmentDisplay value={8547} format="raw" digits={5} color="orange" label="HOURS ACTIVE" size="md" />
              </div>
            </TargetingContainer>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <TargetingReticle size={200} mode="SCAN:NET" color="cyan" targetLabel="NODE-01" animated />
          </div>
          <div className="col-span-6">
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

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="border-t border-eva-orange bg-eva-dark-gray/30 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl uppercase tracking-[0.2em] text-eva-orange font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            CORE CAPABILITIES
          </motion.h2>
          <p className="text-center text-eva-white/40 text-xs font-mono mb-8">
            THREE OPERATIONAL PILLARS — SELECT MODULE FOR DETAILS
          </p>

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

          <div className="mt-6 grid grid-cols-12 gap-6">
            {featureTab === "sync" && (
              <>
                <div className="col-span-7">
                  <Card title="NEURAL SYNC ENGINE">
                    <div className="space-y-4">
                      <p className="text-eva-white/80 text-xs font-mono leading-relaxed">
                        Real-time neural pattern synchronization with sub-millisecond
                        latency. Bio-compatible interface for direct cortex-to-machine
                        communication. Supports up to 256 concurrent neural streams
                        with adaptive frequency modulation.
                      </p>
                      <div style={{ height: "120px" }}>
                        <SyncRatioChart showGrid animated speed={2} frequencyA={0.06} frequencyB={0.09} />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="text-2xl text-eva-cyan font-bold" style={{ fontFamily: "var(--font-eva-mono)" }}>0.3ms</div>
                          <div className="text-[9px] text-eva-white/40">LATENCY</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-eva-green font-bold" style={{ fontFamily: "var(--font-eva-mono)" }}>256</div>
                          <div className="text-[9px] text-eva-white/40">STREAMS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-eva-orange font-bold" style={{ fontFamily: "var(--font-eva-mono)" }}>99.9%</div>
                          <div className="text-[9px] text-eva-white/40">ACCURACY</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-span-5 space-y-4">
                  <Gauge value={94} label="THROUGHPUT" color="cyan" size={180} />
                  <SyncProgressBar value={94} label="NEURAL I/O" blocks={15} />
                  <SyncProgressBar value={87} label="BANDWIDTH" blocks={15} />
                  <SyncProgressBar value={99} label="STABILITY" blocks={15} />
                </div>
              </>
            )}

            {featureTab === "genome" && (
              <>
                <div className="col-span-7">
                  <Card title="GENOME PROCESSOR">
                    <div className="space-y-4">
                      <p className="text-eva-white/80 text-xs font-mono leading-relaxed">
                        Massively parallel genomic analysis powered by quantum-biological
                        compute clusters. Process 12.4M sequences per cycle with
                        automated mutation detection and protein folding simulation.
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
                        height={140}
                      />
                    </div>
                  </Card>
                </div>
                <div className="col-span-5">
                  <Card title="SEQUENCE DISTRIBUTION">
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
                </div>
              </>
            )}

            {featureTab === "security" && (
              <>
                <div className="col-span-7">
                  <Card title="A.T. FIELD SECURITY">
                    <div className="space-y-4">
                      <p className="text-eva-white/80 text-xs font-mono leading-relaxed">
                        Multi-layered defensive architecture inspired by Absolute Terror
                        Field technology. Zero-breach guarantee with quantum encryption
                        and bio-authentication.
                      </p>
                      <div className="space-y-2 text-[10px] font-mono">
                        {[
                          { name: "PERIMETER SHIELD", status: "ACTIVE", c: "text-eva-green" },
                          { name: "DATA ENCRYPTION", status: "AES-256", c: "text-eva-cyan" },
                          { name: "INTRUSION DETECT", status: "ARMED", c: "text-eva-green" },
                          { name: "BIO-AUTH LAYER", status: "ENABLED", c: "text-eva-orange" },
                          { name: "QUANTUM TUNNEL", status: "LOCKED", c: "text-eva-cyan" },
                          { name: "PATTERN SCAN", status: "REALTIME", c: "text-eva-green" },
                        ].map((item) => (
                          <div key={item.name} className="flex justify-between py-1.5 border-b border-eva-white/10">
                            <span className="text-eva-white/80">{item.name}</span>
                            <span className={item.c}>{item.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-span-5 flex flex-col items-center justify-center gap-4">
                  <Gauge value={100} label="SHIELD INTEGRITY" color="green" size={180} />
                  <div className="text-center text-[10px] font-mono text-eva-green">
                    ■ ZERO BREACHES SINCE INITIALIZATION
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section className="border-t border-eva-orange py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl uppercase tracking-[0.2em] text-eva-orange font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            DEPLOYMENT TIERS
          </motion.h2>
          <p className="text-center text-eva-white/40 text-xs font-mono mb-8">
            SELECT THE INFRASTRUCTURE THAT MATCHES YOUR OPERATIONAL REQUIREMENTS
          </p>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { tier: "PROTOTYPE", nodes: 4, storage: "1 TB", sync: "60 Hz", price: "$499", variant: "default" as const },
              { tier: "PRODUCTION", nodes: 16, storage: "10 TB", sync: "120 Hz", price: "$1,999", variant: "default" as const },
              { tier: "ENTERPRISE", nodes: 64, storage: "100 TB", sync: "240 Hz", price: "$7,999", variant: "default" as const },
              { tier: "NERV-CLASS", nodes: 256, storage: "1 PB", sync: "∞", price: "$29,999", variant: "alert" as const },
            ].map((plan) => (
              <Card key={plan.tier} title={plan.tier} variant={plan.variant}>
                <div className="space-y-3 text-center">
                  <div
                    className={`text-3xl font-bold ${plan.variant === "alert" ? "text-eva-red" : "text-eva-cyan"}`}
                    style={{ fontFamily: "var(--font-eva-mono)" }}
                  >
                    {plan.price}
                  </div>
                  <div className="text-[9px] text-eva-white/40 font-mono">PER MONTH</div>
                  <div className="space-y-1.5 text-[10px] font-mono text-left">
                    <div className="flex justify-between text-eva-white/60">
                      <span>COMPUTE NODES</span>
                      <span className="text-eva-green">{plan.nodes}</span>
                    </div>
                    <div className="flex justify-between text-eva-white/60">
                      <span>STORAGE</span>
                      <span className="text-eva-cyan">{plan.storage}</span>
                    </div>
                    <div className="flex justify-between text-eva-white/60">
                      <span>SYNC RATE</span>
                      <span className="text-eva-orange">{plan.sync}</span>
                    </div>
                  </div>
                  <Button
                    variant={plan.variant === "alert" ? "danger" : "primary"}
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setEmail("");
                      document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    SELECT
                  </Button>
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
              { key: "price", header: "COST/MO", align: "right", sortable: true, type: "int" },
            ]}
            data={[
              { tier: "PROTOTYPE", nodes: 4, storage: "1 TB", sync: "60 Hz", price: 499 },
              { tier: "PRODUCTION", nodes: 16, storage: "10 TB", sync: "120 Hz", price: 1999 },
              { tier: "ENTERPRISE", nodes: 64, storage: "100 TB", sync: "240 Hz", price: 7999 },
              { tier: "NERV-CLASS", nodes: 256, storage: "1 PB", sync: "∞", price: 29999 },
            ]}
            color="orange"
            title="FULL COMPARISON MATRIX"
          />
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="border-t border-eva-green py-14 px-6 bg-eva-dark-gray/30">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-xl uppercase tracking-[0.2em] text-eva-green font-bold text-center mb-8"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            FREQUENTLY ASKED
          </h2>

          <Accordion defaultOpen={["deploy"]}>
            <AccordionItem id="deploy" title="HOW DO I DEPLOY?" color="green">
              <p className="text-xs font-mono text-eva-white/70 leading-relaxed">
                Run the initialization sequence from your NERV-certified terminal.
                Deployment takes approximately 3 minutes for PROTOTYPE tier and up to 15 minutes for NERV-CLASS infrastructure.
              </p>
            </AccordionItem>
            <AccordionItem id="security" title="IS MY DATA SECURE?" color="green">
              <p className="text-xs font-mono text-eva-white/70 leading-relaxed">
                All data is encrypted with AES-256 and protected by our A.T. Field security layer.
                We maintain a zero-breach record since system initialization.
              </p>
            </AccordionItem>
            <AccordionItem id="support" title="WHAT SUPPORT IS INCLUDED?" color="green">
              <p className="text-xs font-mono text-eva-white/70 leading-relaxed">
                All tiers include 24/7 MAGI-assisted support. ENTERPRISE and NERV-CLASS tiers
                receive dedicated personnel and priority incident response.
              </p>
            </AccordionItem>
            <AccordionItem id="scale" title="CAN I SCALE DYNAMICALLY?" color="green">
              <p className="text-xs font-mono text-eva-white/70 leading-relaxed">
                Yes. Auto-scaling is enabled by default across all tiers. Compute nodes
                expand automatically based on load patterns detected by the MAGI consensus engine.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section id="cta" className="border-t border-eva-green py-14 px-6">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2
            className="text-xl uppercase tracking-[0.2em] text-eva-green font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            REQUEST ACCESS
          </h2>
          <p className="text-eva-white/40 font-mono text-xs">
            ENTER YOUR CREDENTIALS TO REQUEST A DEPLOYMENT KEY
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <div className="text-eva-green font-mono text-sm uppercase tracking-wider">
                ✓ ACCESS REQUEST TRANSMITTED
              </div>
              <div className="text-eva-white/40 font-mono text-[10px] mt-2">
                MAGI VERIFICATION IN PROGRESS — EXPECT RESPONSE WITHIN 24H
              </div>
              <div className="mt-4">
                <CountdownTimer initialSeconds={86400} />
              </div>
            </motion.div>
          ) : (
            <div className="flex gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <InputField
                  label="CONTACT ID"
                  placeholder="operator@nerv.gov"
                  color="green"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pt-5">
                <Button
                  variant="primary"
                  onClick={() => {
                    if (email.trim()) setShowDialog(true);
                  }}
                >
                  DEPLOY
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-eva-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <SeeleMonolith id="01" isSpeaking={false} className="w-20 min-h-[50px]" />
            <SeeleMonolith id="02" isSpeaking={false} className="w-20 min-h-[50px]" />
            <SeeleMonolith id="03" isSpeaking={false} className="w-20 min-h-[50px]" />
            <SeeleMonolith id="04" isSpeaking={false} className="w-20 min-h-[50px]" />
            <SeeleMonolith id="05" isSpeaking={false} className="w-20 min-h-[50px]" />
          </div>
          <div className="text-center text-[10px] font-mono text-eva-white/30 space-y-1">
            <div>GENESIS PLATFORM — A DIVISION OF NERV</div>
            <div>BUILT WITH EVAUI — TOKYO-3, JAPAN</div>
            <div>© 2015 GEHIRN CORP. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </footer>

      {/* Confirmation Dialog */}
      <SystemDialog
        open={showDialog}
        title="CONFIRM DEPLOYMENT REQUEST"
        severity="normal"
        acceptText="TRANSMIT"
        declineText="CANCEL"
        onAccept={() => {
          setShowDialog(false);
          setSubmitted(true);
        }}
        onDecline={() => setShowDialog(false)}
        onClose={() => setShowDialog(false)}
      >
        <div className="text-eva-white font-mono text-sm space-y-2">
          <p>
            Requesting deployment key for:{" "}
            <span className="text-eva-cyan">{email}</span>
          </p>
          <p className="text-eva-white/40 text-xs">
            Your request will be verified by MAGI consensus protocol.
          </p>
        </div>
      </SystemDialog>
    </div>
  );
}
