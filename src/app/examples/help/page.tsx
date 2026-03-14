"use client";

import { useState } from "react";
import { Badge } from "@/components/Badge";
import { InputField } from "@/components/InputField";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Accordion, AccordionItem } from "@/components/Accordion";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import { Button } from "@/components/Button";

const categories = [
  { id: "getting-started", label: "GETTING STARTED" },
  { id: "operations", label: "OPERATIONS" },
  { id: "technical", label: "TECHNICAL" },
  { id: "security", label: "SECURITY" },
  { id: "contact", label: "CONTACT" },
];

const faqData: Record<string, { id: string; question: string; answer: string }[]> = {
  "getting-started": [
    { id: "gs-1", question: "How do I initiate an Eva unit?", answer: "Eva unit activation requires Level 3 clearance and a confirmed sync rate above 40%. Submit Form E-7 to the Operations Director and await approval from at least two MAGI subsystems." },
    { id: "gs-2", question: "What are the sync rate requirements?", answer: "Minimum operational sync rate is 40% for standard deployment. Combat sorties require 60% or higher. Pilots below threshold will be placed on mandatory re-calibration protocol." },
    { id: "gs-3", question: "How to report a Pattern Blue detection?", answer: "Immediately notify Command via the priority alert channel. File incident report PB-01 within 30 minutes. All non-essential personnel must evacuate to designated shelters upon confirmation." },
    { id: "gs-4", question: "Emergency ejection procedures", answer: "Entry plug ejection is initiated via the red toggle on the command console. Backup manual release is located behind panel C-12. LCL drainage begins automatically upon surface breach." },
    { id: "gs-5", question: "LCL purification schedule", answer: "LCL fluid is purified on a 48-hour cycle during standby and a 12-hour cycle during active operations. Contamination levels are monitored by MAGI in real-time. Report any discoloration immediately." },
    { id: "gs-6", question: "Access level clearance requests", answer: "Submit clearance upgrade requests through the Personnel Division portal. Processing takes 5-7 business days. Expedited requests require Commander-level authorization and a valid operational justification." },
  ],
  operations: [
    { id: "op-1", question: "How do I schedule a sortie?", answer: "Sorties are scheduled through the Operations Planning Terminal. Submit a deployment request at least 24 hours in advance. Emergency deployments bypass standard scheduling protocols." },
    { id: "op-2", question: "What is the standard patrol formation?", answer: "Standard patrol uses a triangular formation with Unit-01 at point. Spacing is maintained at 500 meters minimum. Formation adjustments require real-time approval from tactical command." },
    { id: "op-3", question: "How to file an after-action report?", answer: "After-action reports must be submitted within 6 hours of mission completion. Use form AAR-03 and include sync rate logs, ammunition expenditure, and damage assessment data." },
    { id: "op-4", question: "Communication protocols during engagement", answer: "All combat communications use encrypted channel NERV-7. Maintain radio discipline and use designated call signs. Open channels are restricted to emergency broadcasts only." },
    { id: "op-5", question: "Supply requisition procedures", answer: "Standard supplies are requisitioned through the logistics portal. Weapons and specialized equipment require Section 2 approval. Emergency requisitions are processed within 2 hours." },
    { id: "op-6", question: "Shift rotation and duty assignments", answer: "Duty rotations follow a 3-shift cycle. Schedule changes require 48-hour notice. Pilot standby duty is assigned on a weekly rotating basis with mandatory rest periods." },
  ],
  technical: [
    { id: "tc-1", question: "MAGI system diagnostic procedures", answer: "Run diagnostic suite MAGI-DIAG-01 from any Level 4 terminal. Full system checks take approximately 45 minutes. Report anomalies to the Technical Division immediately." },
    { id: "tc-2", question: "Entry plug maintenance schedule", answer: "Entry plugs undergo routine maintenance every 72 hours. Deep cleaning and recalibration occur monthly. All maintenance must be logged in the Technical Maintenance Database." },
    { id: "tc-3", question: "AT Field calibration process", answer: "AT Field generators are calibrated using the Harmonics Test Chamber. Calibration requires a minimum 30-minute session with the designated pilot. Results are cross-referenced with MAGI predictions." },
    { id: "tc-4", question: "Umbilical cable replacement protocol", answer: "Cable replacement follows procedure UC-SWAP-7. Power must be routed through internal batteries during swap. Maximum operation time on internal power is 5 minutes." },
    { id: "tc-5", question: "Neural interface troubleshooting", answer: "Common interface issues include signal drift and harmonic desynchronization. Reset the A-10 nerve clips and recalibrate. Persistent issues require a full neural pathway diagnostic." },
    { id: "tc-6", question: "Facility power grid overview", answer: "NERV HQ operates on a triple-redundant power grid. Primary power comes from the city grid, secondary from dedicated generators, and tertiary from S2 engine backup systems." },
  ],
  security: [
    { id: "sc-1", question: "Reporting security breaches", answer: "All security breaches must be reported to Section 2 within 15 minutes of detection. Use the secure terminal at any checkpoint. Do not discuss breaches on unsecured channels." },
    { id: "sc-2", question: "Visitor access protocols", answer: "All visitors require a Level 1 escort at minimum. Visitor badges must be visible at all times. Restricted areas require additional clearance verified by biometric scan." },
    { id: "sc-3", question: "Data classification guidelines", answer: "NERV data is classified into four tiers: Public, Confidential, Secret, and Eyes Only. Mishandling classified data results in immediate suspension and investigation." },
    { id: "sc-4", question: "Physical security measures", answer: "All personnel must carry ID badges with active RFID chips. Unauthorized access attempts trigger lockdown protocols. Biometric verification is required for all restricted zones." },
    { id: "sc-5", question: "Cybersecurity best practices", answer: "Use unique passwords for each system. Enable two-factor authentication on all terminals. Report suspicious emails or communications to the IT Security Division." },
    { id: "sc-6", question: "Emergency lockdown procedures", answer: "Lockdown is initiated by Command or automatically by MAGI threat assessment. All personnel must proceed to nearest secure zone. Movement between sectors is prohibited until all-clear." },
  ],
  contact: [
    { id: "ct-1", question: "How to reach Operations Command", answer: "Operations Command is available 24/7 on internal line 001. For non-urgent matters, submit a request through the personnel portal. Response time is typically within 4 hours." },
    { id: "ct-2", question: "Technical support hours", answer: "Technical support operates from 0600 to 2200 hours on standard shifts. Emergency technical support is available around the clock. Contact via internal line 042 or terminal request." },
    { id: "ct-3", question: "Medical division contact", answer: "The Medical Division is located on Level B-3. Walk-in hours are 0800-1700. Emergency medical response is available at all times via internal line 099." },
    { id: "ct-4", question: "Personnel division inquiries", answer: "Personnel Division handles all HR-related matters including transfers, leave requests, and benefits. Office hours are 0900-1700, Monday through Friday. Submit requests via the HR portal." },
    { id: "ct-5", question: "Reporting facility issues", answer: "Facility maintenance requests are submitted through the Building Management System. Emergency repairs (flooding, power loss, structural damage) should be reported via internal line 055." },
    { id: "ct-6", question: "Filing formal complaints", answer: "Formal complaints are submitted through the Personnel Division using form FC-01. Anonymous submissions are accepted via the secure dropbox on Level B-1. Investigation begins within 48 hours." },
  ],
};

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [search, setSearch] = useState("");

  const currentFaqs = faqData[activeCategory] ?? [];

  const filteredFaqs = search.trim()
    ? currentFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase())
      )
    : currentFaqs;

  return (
    <div className="min-h-screen bg-eva-black px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1
                className="text-2xl font-black uppercase tracking-[0.2em] text-eva-orange sm:text-3xl"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                NERV SUPPORT TERMINAL
              </h1>
              <Badge label="HELP DESK" variant="info" size="sm" />
            </div>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-eva-white/40">
              KNOWLEDGE BASE / INCIDENT PROCEDURES / AUTHORIZED PERSONNEL
            </p>
          </div>

          <Card title="QUEUE STATUS">
            <div className="space-y-2 font-mono text-xs text-eva-white/70">
              <div className="flex items-center justify-between border-b border-eva-mid-gray/20 pb-2">
                <span>ACTIVE SECTION</span>
                <span className="text-eva-cyan">{activeCategory.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-eva-mid-gray/20 pb-2">
                <span>MATCHES</span>
                <span className="text-eva-green">{String(filteredFaqs.length).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SEARCH FILTER</span>
                <span className={search.trim() ? "text-eva-orange" : "text-eva-white/40"}>
                  {search.trim() ? "ENGAGED" : "CLEAR"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="space-y-4">
            <Card title="QUERY TERMINAL">
              <InputField
                label="SEARCH"
                placeholder="Search knowledge base..."
                color="orange"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Card>

            <Card title="SECTION INDEX">
              <NavigationTabs
                tabs={categories}
                activeTab={activeCategory}
                onTabChange={(id) => {
                  setActiveCategory(id);
                  setSearch("");
                }}
                direction="vertical"
                color="orange"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card
              title={`ENTRY SET // ${String(filteredFaqs.length).padStart(2, "0")} MATCHES`}
            >
              {filteredFaqs.length > 0 ? (
                <Accordion>
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} id={faq.id} title={faq.question} color="orange">
                      <Card variant="hud" className="mt-1">
                        <p className="text-eva-white/80 text-xs font-mono leading-relaxed">
                          {faq.answer}
                        </p>
                      </Card>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="border border-eva-mid-gray/30 bg-eva-black/70 p-6 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-eva-mid-gray">
                    NO MATCHING ENTRIES FOUND
                  </p>
                </div>
              )}
            </Card>

            <Divider color="orange" variant="dashed" />

            <Card title="ESCALATION CHANNELS">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className="text-xs uppercase tracking-[0.18em] text-eva-white/45"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  Need more help?
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="md">
                    CONTACT SUPPORT
                  </Button>
                  <Button variant="ghost" size="md">
                    SUBMIT TICKET
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
