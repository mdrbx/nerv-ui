"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DataGrid } from "@/components/DataGrid";
import { Divider } from "@/components/Divider";
import { GradientStatusBar } from "@/components/GradientStatusBar";
import { StatusStamp } from "@/components/StatusStamp";

const expenditureColumns = [
  { key: "item", header: "ITEM", width: "1fr" },
  { key: "category", header: "CATEGORY", width: "120px" },
  { key: "qty", header: "QTY", width: "60px", align: "right" as const },
  { key: "unitCost", header: "UNIT COST (¥M)", width: "110px", align: "right" as const },
  { key: "total", header: "TOTAL (¥M)", width: "100px", align: "right" as const },
];

const expenditureData = [
  { item: "Positron Rifle charges", category: "ORDNANCE", qty: 8, unitCost: "12.5", total: "100.0" },
  { item: "LCL consumption", category: "BIOLOGICAL", qty: 4200, unitCost: "0.003", total: "12.6" },
  { item: "Power cable replacement (set)", category: "LOGISTICS", qty: 2, unitCost: "8.0", total: "16.0" },
  { item: "External battery packs", category: "POWER", qty: 6, unitCost: "45.0", total: "270.0" },
  { item: "Structural repair — left pylon", category: "REPAIR", qty: 1, unitCost: "340.0", total: "340.0" },
  { item: "Armor plate replacement — torso", category: "REPAIR", qty: 1, unitCost: "185.0", total: "185.0" },
  { item: "Personnel overtime (hours)", category: "PERSONNEL", qty: 1480, unitCost: "0.008", total: "11.8" },
  { item: "Civilian evacuation operations", category: "LOGISTICS", qty: 1, unitCost: "52.0", total: "52.0" },
  { item: "Infrastructure damage assessment", category: "ADMIN", qty: 1, unitCost: "3.2", total: "3.2" },
];

const totalCost = "990.6";

const integrityZones = [
  { start: 0, end: 30, color: "#FF0000", label: "CRITICAL" },
  { start: 30, end: 60, color: "#FF9900", label: "DEGRADED" },
  { start: 60, end: 85, color: "#FFFF00", label: "OPERATIONAL" },
  { start: 85, end: 100, color: "#00FF00", label: "NOMINAL" },
];

const contaminationZones = [
  { start: 0, end: 15, color: "#00FF00", label: "SAFE" },
  { start: 15, end: 40, color: "#FFFF00", label: "ELEVATED" },
  { start: 40, end: 70, color: "#FF9900", label: "HAZARDOUS" },
  { start: 70, end: 100, color: "#FF0000", label: "CRITICAL" },
];

function MetadataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-1 border-b border-eva-mid-gray/20">
      <span
        className="text-[10px] uppercase tracking-[0.15em] text-eva-mid-gray font-bold"
        style={{ fontFamily: "var(--font-eva-display)" }}
      >
        {label}
      </span>
      <span className="text-sm font-mono text-eva-orange">{value}</span>
    </div>
  );
}

export default function ReportExample() {
  return (
    <div className="min-h-screen bg-eva-black nerv-page-shell">
      <div className="nerv-page-frame max-w-5xl py-6 space-y-6">
        {/* Header */}
        <div className="border-b border-eva-orange/24 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="nerv-section-label mb-3">After Action</span>
              <h1
                className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                AFTER-ACTION REPORT
              </h1>
              <p
                className="text-lg uppercase tracking-[0.15em] text-eva-cyan mt-1"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                OPERATION YASHIMA
              </p>
              <p className="text-[10px] font-mono text-eva-mid-gray mt-1">
                NERV TACTICAL OPERATIONS DIVISION — DOCUMENT REF: AAR-2015-006
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge label="CLASSIFIED" variant="danger" size="lg" />
              <div className="relative h-24 w-32 overflow-hidden">
                <StatusStamp
                  text="APPROVED"
                  color="green"
                  bordered
                  rotation={-8}
                  className="!min-h-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Metadata */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="nerv-panel space-y-1 px-3 py-3">
            <MetadataField label="Report ID" value="AAR-2015-006" />
            <MetadataField label="Date" value="2015.06.12 — 04:32 JST" />
            <MetadataField label="Classification" value="LEVEL-4 RESTRICTED" />
            <MetadataField label="Authorizing Officer" value="KATSURAGI, M." />
          </div>
          <div className="nerv-panel space-y-1 px-3 py-3">
            <MetadataField label="Unit Deployed" value="EVA-01 TEST TYPE" />
            <MetadataField label="Pilot" value="IKARI, SHINJI" />
            <MetadataField label="Duration" value="00:12:47 (ACTIVE)" />
            <MetadataField label="Location" value="MT. FUTAGO — SECTOR 7G" />
          </div>
        </div>

        {/* Mission Summary */}
        <Divider label="MISSION SUMMARY" color="cyan" />

        <Card title="OPERATION YASHIMA — TACTICAL SUMMARY">
          <div className="px-1 py-1 space-y-4 font-mono text-sm text-eva-white/80 leading-relaxed">
            <p>
              At 23:45 JST, 5th Angel RAMIEL was confirmed stationary above the
              GeoFront access shaft, deploying a high-energy particle beam to
              bore through 22 armor layers. MAGI consensus classified the threat
              as ALPHA-PRIORITY. Commander Ikari authorized Operation Yashima:
              a long-range positron sniper engagement utilizing the entire
              electrical output of Japan.
            </p>
            <p>
              EVA-01 was deployed to Mt. Futago with a prototype positron rifle
              adapted from the JSSDF&apos;s strategic self-defense arsenal.
              EVA-00 was assigned shield duty using a re-purposed SDF shuttle
              heat shield. Power was routed via emergency protocols from all
              sectors of the Japanese power grid. Civilian evacuation of the
              surrounding 50km radius was completed at 23:12 JST.
            </p>
            <p>
              First shot at 00:04 JST refracted off RAMIEL&apos;s AT Field. The
              Angel immediately returned fire, inflicting critical damage to
              EVA-00&apos;s shield assembly. Second shot at 00:07 JST achieved
              direct core penetration. RAMIEL ceased all activity at 00:07:22
              JST. Angel confirmed neutralized by MAGI at 00:08:01 JST. EVA-00
              pilot Ayanami recovered from entry plug in critical condition.
              Operation declared successful.
            </p>
          </div>
        </Card>

        {/* Resource Expenditure */}
        <Divider label="RESOURCE EXPENDITURE" color="orange" />

        <DataGrid
          columns={expenditureColumns}
          data={expenditureData}
          color="orange"
          title="MISSION COSTS"
          showIndex
        />

        <div className="flex justify-end border-t border-eva-orange/18 pt-3">
          <div className="flex items-baseline gap-4">
            <span
              className="text-[10px] uppercase tracking-[0.2em] text-eva-mid-gray font-bold"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              TOTAL EXPENDITURE
            </span>
            <span
              className="text-2xl font-bold text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              ¥{totalCost}M
            </span>
          </div>
        </div>

        {/* Damage Assessment */}
        <Divider label="DAMAGE ASSESSMENT" color="cyan" />

        <div className="space-y-5 nerv-panel px-3 py-4">
          <GradientStatusBar
            label="EVA-01 STRUCTURAL INTEGRITY"
            sublabel="POST-OPERATION STATUS — LEFT PYLON COMPROMISED"
            value={62}
            zones={integrityZones}
            color="cyan"
          />

          <GradientStatusBar
            label="PILOT NEURAL CONTAMINATION"
            sublabel="IKARI, S. — SYNC RATIO DEVIATION WITHIN TOLERANCE"
            value={18}
            zones={contaminationZones}
            color="orange"
          />
        </div>

        {/* Authorization */}
        <Divider label="AUTHORIZATION" color="green" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-28 w-full overflow-hidden">
              <StatusStamp
                text="REVIEWED"
                color="orange"
                bordered
                rotation={-5}
                className="!min-h-0"
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-eva-mid-gray uppercase tracking-wider">
                Tactical Operations Review
              </p>
              <p className="text-sm font-mono text-eva-orange mt-1">
                KATSURAGI, Misato — Capt.
              </p>
              <p className="text-[10px] font-mono text-eva-mid-gray mt-0.5">
                2015.06.12 — 06:15 JST
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative h-28 w-full overflow-hidden">
              <StatusStamp
                text="APPROVED"
                color="green"
                bordered
                rotation={3}
                className="!min-h-0"
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-eva-mid-gray uppercase tracking-wider">
                Commander Authorization
              </p>
              <p className="text-sm font-mono text-eva-orange mt-1">
                IKARI, Gendo — Cmdr.
              </p>
              <p className="text-[10px] font-mono text-eva-mid-gray mt-0.5">
                2015.06.12 — 08:00 JST
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-4 border-t border-eva-mid-gray/30">
          <Button variant="primary" onClick={() => window.print()}>
            PRINT REPORT
          </Button>
          <Button variant="ghost">ARCHIVE</Button>
        </div>
      </div>
    </div>
  );
}
