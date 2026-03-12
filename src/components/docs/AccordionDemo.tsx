"use client";

import { Accordion, AccordionItem } from "@/components";

export function AccordionBasicDemo() {
  return (
    <Accordion defaultOpen={["status"]}>
      <AccordionItem id="status" title="SYSTEM STATUS">
        <div className="text-xs text-eva-green font-mono space-y-1">
          <div>MAGI-01 MELCHIOR .... ONLINE</div>
          <div>MAGI-02 BALTHASAR .. ONLINE</div>
          <div>MAGI-03 CASPER ..... STANDBY</div>
        </div>
      </AccordionItem>
      <AccordionItem id="logs" title="RECENT LOGS">
        <div className="text-xs text-eva-white/80 font-mono space-y-1">
          <div>[14:22:01] Telemetry sync complete</div>
          <div>[14:22:03] A.T. Field nominal</div>
          <div>[14:22:07] Entry plug pressure stable</div>
        </div>
      </AccordionItem>
      <AccordionItem id="config" title="CONFIGURATION">
        <div className="text-xs text-eva-orange font-mono">
          Pilot: IKARI, SHINJI — Unit: EVA-01 — Mode: BERSERKER
        </div>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionMultiDemo() {
  return (
    <Accordion multiple defaultOpen={["alpha", "beta"]}>
      <AccordionItem id="alpha" title="SECTOR ALPHA" color="orange">
        <div className="text-xs text-eva-white/80 font-mono">
          Pattern analysis running... 47% complete
        </div>
      </AccordionItem>
      <AccordionItem id="beta" title="SECTOR BETA" color="orange">
        <div className="text-xs text-eva-white/80 font-mono">
          No anomalies detected in last 24h cycle
        </div>
      </AccordionItem>
      <AccordionItem id="gamma" title="SECTOR GAMMA" color="orange">
        <div className="text-xs text-eva-red font-mono">
          WARNING: Unidentified energy signature detected
        </div>
      </AccordionItem>
    </Accordion>
  );
}
