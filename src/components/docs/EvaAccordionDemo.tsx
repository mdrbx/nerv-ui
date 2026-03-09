"use client";

import { EvaAccordion, EvaAccordionItem } from "@/components";

export function AccordionBasicDemo() {
  return (
    <EvaAccordion defaultOpen={["status"]}>
      <EvaAccordionItem id="status" title="SYSTEM STATUS">
        <div className="text-xs text-eva-green font-mono space-y-1">
          <div>MAGI-01 MELCHIOR .... ONLINE</div>
          <div>MAGI-02 BALTHASAR .. ONLINE</div>
          <div>MAGI-03 CASPER ..... STANDBY</div>
        </div>
      </EvaAccordionItem>
      <EvaAccordionItem id="logs" title="RECENT LOGS">
        <div className="text-xs text-eva-white/80 font-mono space-y-1">
          <div>[14:22:01] Telemetry sync complete</div>
          <div>[14:22:03] A.T. Field nominal</div>
          <div>[14:22:07] Entry plug pressure stable</div>
        </div>
      </EvaAccordionItem>
      <EvaAccordionItem id="config" title="CONFIGURATION">
        <div className="text-xs text-eva-orange font-mono">
          Pilot: IKARI, SHINJI — Unit: EVA-01 — Mode: BERSERKER
        </div>
      </EvaAccordionItem>
    </EvaAccordion>
  );
}

export function AccordionMultiDemo() {
  return (
    <EvaAccordion multiple defaultOpen={["alpha", "beta"]}>
      <EvaAccordionItem id="alpha" title="SECTOR ALPHA" color="orange">
        <div className="text-xs text-eva-white/80 font-mono">
          Pattern analysis running... 47% complete
        </div>
      </EvaAccordionItem>
      <EvaAccordionItem id="beta" title="SECTOR BETA" color="orange">
        <div className="text-xs text-eva-white/80 font-mono">
          No anomalies detected in last 24h cycle
        </div>
      </EvaAccordionItem>
      <EvaAccordionItem id="gamma" title="SECTOR GAMMA" color="orange">
        <div className="text-xs text-eva-red font-mono">
          WARNING: Unidentified energy signature detected
        </div>
      </EvaAccordionItem>
    </EvaAccordion>
  );
}
