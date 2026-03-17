"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MonitorOverlay } from "@/components/MonitorOverlay";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { Card } from "@/components/Card";
import { TargetingContainer } from "@/components/TargetingContainer";
import { BarChart } from "@/components/BarChart";
import { Gauge } from "@/components/Gauge";
import { Button } from "@/components/Button";

const briefingCards = [
  {
    title: "MISSION PROFILE",
    lines: [
      "Industrial React library for alert consoles, monitoring panes and terminal-grade interfaces.",
      "Built for dense operation screens rather than showroom marketing surfaces.",
    ],
  },
  {
    title: "VISUAL DISCIPLINE",
    lines: [
      "Condensed headings, mono data rails, hairline dividers and hard-edged compartment panels.",
      "No soft card language, no decorative hero whitespace, no startup gloss.",
    ],
  },
  {
    title: "DEPLOYMENT INTENT",
    lines: [
      "Use NERV-UI when the product should read like command software, tactical tooling or incident control.",
      "Primary use cases: dashboards, help desks, auth gates, file systems and mission logs.",
    ],
  },
];

const readinessBars = [
  { label: "LAYOUT PANELS", value: 100, color: "#FF9900" },
  { label: "FORM CONTROLS", value: 94, color: "#00FFFF" },
  { label: "STATUS HUD", value: 96, color: "#00FF00" },
  { label: "DOCS SYSTEM", value: 88, color: "#FF3300" },
];

const tacticalNotes = [
  { label: "COMPONENT SET", value: "42 ACTIVE" },
  { label: "MOTION POLICY", value: "CONTROLLED" },
  { label: "RADIUS", value: "0PX" },
  { label: "STATE", value: "READY" },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-nerv-black">
      <section className="relative overflow-hidden border-b border-nerv-orange/30">
        <MonitorOverlay
          color="orange"
          opacity={0.28}
          density="sparse"
          label="MISSION SURFACE"
          secondaryLabel="TACTICAL BRIEF"
          className="absolute inset-0"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_20rem]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-nerv-orange">
                <span>LIBRARY DOSSIER</span>
                <span className="text-nerv-white/30">/</span>
                <span className="text-nerv-cyan">TACTICAL UI SYSTEM</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
                <div>
                  <h1
                    className="text-4xl font-black uppercase tracking-[0.18em] text-nerv-orange sm:text-5xl lg:text-6xl"
                    style={{ fontFamily: "var(--font-nerv-display)" }}
                  >
                    NERV-UI SYSTEM BRIEF
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm font-mono leading-relaxed text-nerv-white/70 sm:text-[15px]">
                    NERV-UI is a NERV-leaning interface library for control rooms,
                    alert states and mission software. The target is not a glossy
                    marketing shell; it is a dense operational surface with strict
                    spacing, strong rails and unmistakable urgency.
                  </p>
                </div>

                <div className="border border-nerv-orange/25 bg-nerv-dark-gray/75 p-3">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-nerv-white/45">
                    ACTIVE MODULES
                  </div>
                  <div className="mt-3 flex justify-center">
                    <SegmentDisplay
                      value={42}
                      format="raw"
                      digits={3}
                      color="orange"
                      size="md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {tacticalNotes.map((note) => (
                  <div
                    key={note.label}
                    className="border border-nerv-mid-gray/40 bg-nerv-dark-gray/60 px-3 py-2"
                  >
                    <div
                      className="text-[9px] uppercase tracking-[0.22em] text-nerv-white/40"
                      style={{ fontFamily: "var(--font-nerv-display)" }}
                    >
                      {note.label}
                    </div>
                    <div className="mt-2 font-mono text-sm text-nerv-cyan">{note.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button variant="primary" onClick={() => router.push("/docs")}>
                  OPEN DOCUMENTATION
                </Button>
                <Button variant="ghost" onClick={() => router.push("/examples")}>
                  OPEN EXAMPLE INDEX
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="space-y-4"
            >
              <Card title="COMMAND DIRECTIVES">
                <div className="space-y-3">
                  <div className="border-b border-nerv-mid-gray/30 pb-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-nerv-white/35">
                      DIRECTIVE 01
                    </div>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-nerv-white/75">
                      Treat the library as a command surface. Default to left-aligned,
                      panel-based compositions over centered hero blocks.
                    </p>
                  </div>
                  <div className="border-b border-nerv-mid-gray/30 pb-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-nerv-white/35">
                      DIRECTIVE 02
                    </div>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-nerv-white/75">
                      Prefer stacked status, segmented bars and inspection panels over
                      generic dashboard widgets.
                    </p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-nerv-white/35">
                      DIRECTIVE 03
                    </div>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-nerv-white/75">
                      Reserve title-card theatrics for explicit ceremonial screens,
                      not the base product grammar.
                    </p>
                  </div>
                </div>
              </Card>

              <Card title="DEPLOYMENT CHANNEL">
                <div className="space-y-2 font-mono text-xs text-nerv-white/70">
                  <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                    <span>PACKAGE</span>
                    <span className="text-nerv-green">@mdrbx/nerv-ui</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-nerv-mid-gray/20 pb-2">
                    <span>DISTRIBUTION</span>
                    <span className="text-nerv-cyan">NPM / STATIC DOCS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>EXPORT STATE</span>
                    <span className="text-nerv-orange">UNDER REVIEW</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-nerv-green/20 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                className="text-xl uppercase tracking-[0.24em] text-nerv-green"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                OPERATING DOCTRINE
              </h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-nerv-white/35">
                PANELS, LABEL RAILS, STATUS DENSITY, INCIDENT READABILITY
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {briefingCards.map((card) => (
              <Card key={card.title} title={card.title}>
                <div className="space-y-3">
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="font-mono text-xs leading-relaxed text-nerv-white/75"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.3fr)_20rem]">
          <TargetingContainer label="READINESS BOARD" color="green">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem]">
              <BarChart
                title="MODULE READINESS"
                direction="horizontal"
                bars={readinessBars}
                unit="%"
                color="green"
                segmented
              />
              <div className="flex items-center justify-center border-l border-nerv-mid-gray/20 pl-4">
                <Gauge value={96} label="SYSTEM STATUS" color="cyan" size={180} threshold={92} />
              </div>
            </div>
          </TargetingContainer>

          <Card title="ACTIVATION NOTE">
            <div className="space-y-4">
              <p className="font-mono text-xs leading-relaxed text-nerv-white/75">
                The library should feel like software already deployed inside a
                control room. The examples are not decorative landing pages; they
                are operator briefings, access terminals and monitoring consoles.
              </p>
              <div className="border border-nerv-orange/30 bg-nerv-black px-3 py-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-nerv-orange">
                  INSTALL SEQUENCE
                </div>
                <code className="mt-2 block font-mono text-xs text-nerv-green">
                  npm install @mdrbx/nerv-ui
                </code>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
