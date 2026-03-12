"use client";

import { useState } from "react";
import { NavigationTabs } from "@/components/NavigationTabs";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PilotCard } from "@/components/PilotCard";
import { StatusStamp } from "@/components/StatusStamp";

// ─── Blog post data ───
interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  classified: boolean;
  breaking: boolean;
  excerpt: string;
  content: string[];
}

const posts: Post[] = [
  {
    id: "001",
    title: "ANGEL ENCOUNTER — AFTER ACTION REPORT",
    category: "REPORTS",
    date: "2015-06-22",
    classified: false,
    breaking: true,
    excerpt: "Third Angel encounter at Tokyo-3. EVA-01 deployed with pilot Ikari Shinji.",
    content: [
      "SUBJECT: THIRD ANGEL ENCOUNTER — SACHIEL",
      "═══════════════════════════════════════",
      "DATE: 2015-06-22 | LOCATION: TOKYO-3",
      "",
      "At 1432 hours, a Pattern Blue was detected",
      "approaching from the Pacific basin.",
      "",
      "EVA-01 was deployed with pilot IKARI SHINJI.",
      "Initial sync rate: 41.5% (below threshold).",
      "",
      "A.T. Field neutralization: SUCCESSFUL",
      "Core breach: CONFIRMED",
      "Angel designation: ELIMINATED",
      "",
      "CASUALTIES: 0 (NERV), 14 (civilian)",
      "DAMAGE: Sectors 3-7 (moderate)",
      "STATUS: RESOLVED",
    ],
  },
  {
    id: "002",
    title: "MAGI SYSTEM ARCHITECTURE OVERVIEW",
    category: "TECHNICAL",
    date: "2015-05-10",
    classified: false,
    breaking: false,
    excerpt: "Technical brief on the MAGI supercomputer triad — Melchior, Balthasar, and Casper.",
    content: [
      "MAGI SUPERCOMPUTER — TECHNICAL BRIEF",
      "═══════════════════════════════════════",
      "",
      "The MAGI system comprises three independent",
      "supercomputers representing aspects of its",
      "creator, Dr. Naoko Akagi:",
      "",
      "MELCHIOR-1 — The Scientist",
      "BALTHASAR-2 — The Mother",
      "CASPER-3 — The Woman",
      "",
      "Decision protocol: 2/3 majority consensus",
      "Processing: Bio-neural quantum architecture",
      "Uptime: 99.9997% since initialization",
      "",
      "NOTE: System personality matrices are",
      "based on actual human brain patterns.",
    ],
  },
  {
    id: "003",
    title: "DEAD SEA SCROLLS — PROPHECY ANALYSIS",
    category: "CLASSIFIED",
    date: "2015-04-01",
    classified: true,
    breaking: false,
    excerpt: "Section 7A analysis of the Dead Sea Scrolls. SEELE eyes only.",
    content: [
      "DEAD SEA SCROLLS — SECTION 7A",
      "═══════════════════════════════════════",
      "CLASSIFICATION: EYES ONLY — SEELE",
      "",
      "[CONTENT DECRYPTION IN PROGRESS]",
      "",
      "The scrolls describe the sequence of",
      "seventeen Angels and the conditions",
      "for [REDACTED].",
      "",
      "Third Impact scenario probability:",
      "COMPUTATION: ████████ 73.2%",
      "",
      "HUMAN INSTRUMENTALITY PROJECT",
      "STATUS: [REDACTED]",
      "AUTHORIZATION: SEELE-01 ONLY",
    ],
  },
  {
    id: "004",
    title: "EVA PILOT PSYCHOLOGICAL EVALUATION",
    category: "REPORTS",
    date: "2015-06-15",
    classified: true,
    breaking: false,
    excerpt: "Quarterly psychological evaluation of all active Evangelion pilots.",
    content: [
      "PILOT EVALUATION — QUARTERLY REVIEW",
      "═══════════════════════════════════════",
      "EVALUATOR: Dr. Ritsuko Akagi",
      "",
      "IKARI SHINJI (EVA-01):",
      "  Sync deviation: -12% (declining)",
      "  Psychological state: [REDACTED]",
      "  Recommendation: CONTINUED MONITORING",
      "",
      "AYANAMI REI (EVA-00):",
      "  Sync deviation: +3% (stable)",
      "  Psychological state: [REDACTED]",
      "  Recommendation: CLEARED FOR DUTY",
      "",
      "SORYU ASUKA (EVA-02):",
      "  Sync deviation: +8% (improving)",
      "  Psychological state: COMPETITIVE",
      "  Recommendation: CLEARED FOR DUTY",
    ],
  },
  {
    id: "005",
    title: "EVANGELION MAINTENANCE SCHEDULE Q3",
    category: "TECHNICAL",
    date: "2015-07-01",
    classified: false,
    breaking: false,
    excerpt: "Quarterly maintenance schedule for all active Evangelion units.",
    content: [
      "MAINTENANCE SCHEDULE — Q3 2015",
      "═══════════════════════════════════════",
      "",
      "EVA-00: LCL refresh, armor plating R&R",
      "  Scheduled: 2015-07-15",
      "  Duration: 72 hours",
      "",
      "EVA-01: Progressive knife replacement",
      "  Scheduled: 2015-08-01",
      "  Duration: 48 hours",
      "",
      "EVA-02: Full diagnostic, sync calibration",
      "  Scheduled: 2015-07-22",
      "  Duration: 96 hours",
      "",
      "ALL UNITS: Umbilical cable stress test",
      "  Scheduled: 2015-09-01",
    ],
  },
  {
    id: "006",
    title: "OPERATION YASHIMA — TACTICAL BRIEF",
    category: "REPORTS",
    date: "2015-07-05",
    classified: false,
    breaking: false,
    excerpt: "Tactical overview of Operation Yashima against the 5th Angel, Ramiel.",
    content: [
      "OPERATION YASHIMA — TACTICAL BRIEF",
      "═══════════════════════════════════════",
      "TARGET: 5th ANGEL — RAMIEL",
      "CLASSIFICATION: GEOMETRIC / BEAM TYPE",
      "",
      "STRATEGY: Long-range positron snipe",
      "WEAPON: Positron rifle (prototype)",
      "POWER: Japan national grid (100%)",
      "",
      "PILOT: IKARI SHINJI (EVA-01)",
      "SUPPORT: AYANAMI REI (EVA-00, shield)",
      "",
      "OUTCOME: TARGET ELIMINATED",
      "  First shot: MISS (refraction error)",
      "  Second shot: DIRECT HIT — CORE BREACH",
      "",
      "EVA-00 sustained critical damage.",
      "Pilot Ayanami recovered alive.",
      "STATUS: OPERATION SUCCESS",
    ],
  },
  {
    id: "007",
    title: "CENTRAL DOGMA ACCESS PROTOCOLS",
    category: "CLASSIFIED",
    date: "2015-03-15",
    classified: true,
    breaking: false,
    excerpt: "Updated access protocols for Terminal Dogma and Lilith containment.",
    content: [
      "CENTRAL DOGMA — ACCESS PROTOCOLS v4.2",
      "═══════════════════════════════════════",
      "CLASSIFICATION: ABOVE TOP SECRET",
      "",
      "LEVEL 1: General access (Sections A-C)",
      "LEVEL 2: MAGI terminal rooms (auth req.)",
      "LEVEL 3: Eva cages + LCL plant",
      "LEVEL 4: Commander's office",
      "LEVEL 5: [REDACTED]",
      "LEVEL 6: [REDACTED]",
      "LEVEL 7: Terminal Dogma",
      "",
      "WARNING: Unauthorized access to Level 7",
      "will result in immediate termination.",
      "",
      "LILITH containment status: STABLE",
      "Lance of Longinus: SECURED",
    ],
  },
  {
    id: "008",
    title: "LCL PURIFICATION SYSTEM UPGRADE",
    category: "TECHNICAL",
    date: "2015-06-28",
    classified: false,
    breaking: false,
    excerpt: "New filtration system reduces LCL contamination by 47%.",
    content: [
      "LCL PURIFICATION — SYSTEM UPGRADE NOTICE",
      "═══════════════════════════════════════",
      "",
      "The LCL purification system has been upgraded",
      "to Generation 3 filtration technology.",
      "",
      "IMPROVEMENTS:",
      "  Contamination reduction: 47%",
      "  Processing speed: +200%",
      "  Pilot comfort index: +15 points",
      "  Odor reduction: -60% (blood smell)",
      "",
      "DEPLOYMENT TIMELINE:",
      "  EVA-01: COMPLETE",
      "  EVA-00: IN PROGRESS",
      "  EVA-02: SCHEDULED (2015-07-10)",
      "",
      "All pilots report improved sync clarity",
      "following the upgrade.",
    ],
  },
];

const categories = ["ALL", "REPORTS", "CLASSIFIED", "TECHNICAL"];

export default function BlogExample() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0]);
  const [unlockedPosts, setUnlockedPosts] = useState<Set<string>>(new Set());

  const filteredPosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const breakingPost = posts.find((p) => p.breaking);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Breaking news banner */}
      {breakingPost && (
        <EmergencyBanner
          text="BREAKING"
          subtext={breakingPost.title}
          visible
          severity="warning"
        />
      )}

      {/* Header */}
      <div className="border-b border-eva-orange px-6 py-3">
        <h1
          className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          NERV INTELLIGENCE BULLETIN
        </h1>
        <p className="text-[10px] font-mono text-eva-white/50 mt-1">
          CLASSIFIED COMMUNICATIONS — {posts.length} BULLETINS — AUTHORIZED PERSONNEL ONLY
        </p>
      </div>

      {/* Category tabs */}
      <NavigationTabs
        tabs={categories.map((cat) => ({
          id: cat,
          label: `${cat} (${cat === "ALL" ? posts.length : posts.filter((p) => p.category === cat).length})`,
          icon: cat === "CLASSIFIED" ? "◆" : undefined,
        }))}
        activeTab={activeCategory}
        onTabChange={(cat) => {
          setActiveCategory(cat);
          setSelectedPost(null);
        }}
        color="orange"
      />

      <div className="grid grid-cols-12 gap-0" style={{ minHeight: "600px" }}>
        {/* Post list */}
        <div className="col-span-4 border-r border-eva-orange overflow-y-auto" style={{ maxHeight: "700px" }}>
          <div className="p-2 space-y-1">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`w-full text-left p-3 transition-colors cursor-pointer border-l-2 ${
                  selectedPost?.id === post.id
                    ? "bg-eva-orange/10 border-eva-orange"
                    : "bg-transparent border-transparent hover:bg-eva-white/5 hover:border-eva-white/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  {post.classified && (
                    <span className="text-eva-red text-[10px] mt-0.5">◆</span>
                  )}
                  {post.breaking && (
                    <span className="text-eva-orange text-[10px] mt-0.5 animate-pulse">⚡</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-bold uppercase tracking-wider truncate ${
                        selectedPost?.id === post.id ? "text-eva-orange" : "text-eva-white/80"
                      }`}
                      style={{ fontFamily: "var(--font-eva-display)" }}
                    >
                      {post.title}
                    </div>
                    <div className="text-[10px] text-eva-white/40 font-mono mt-1 line-clamp-2">
                      {post.excerpt}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] text-eva-cyan font-mono">{post.date}</span>
                      <span className="text-[9px] text-eva-white/20">|</span>
                      <span className={`text-[9px] font-mono ${
                        post.category === "CLASSIFIED" ? "text-eva-red" : "text-eva-white/40"
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Post content */}
        <div className="col-span-8 p-4">
          {selectedPost ? (
            <div className="relative">
              {/* Post header */}
              <div className="mb-4 pb-3 border-b border-eva-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-eva-cyan">#{selectedPost.id}</span>
                  <span className="text-[10px] text-eva-white/20">|</span>
                  <span className="text-[10px] font-mono text-eva-white/40">{selectedPost.date}</span>
                  <span className="text-[10px] text-eva-white/20">|</span>
                  <span className={`text-[10px] font-mono ${
                    selectedPost.category === "CLASSIFIED" ? "text-eva-red" : "text-eva-white/40"
                  }`}>
                    {selectedPost.category}
                  </span>
                </div>
                <h2
                  className="text-lg uppercase tracking-[0.15em] text-eva-orange font-bold"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {selectedPost.title}
                </h2>
              </div>

              {selectedPost.classified && !unlockedPosts.has(selectedPost.id) ? (
                <div className="relative" style={{ minHeight: "400px" }}>
                  <ClassifiedOverlay text="CLASSIFIED" isUnlocked={false} className="min-h-[400px]">
                    <TerminalDisplay
                      lines={selectedPost.content}
                      color="green"
                      title={selectedPost.title}
                      maxHeight="460px"
                      showLineNumbers
                    />
                  </ClassifiedOverlay>
                  <div className="relative mt-4">
                    <StatusStamp text="CLASSIFIED" color="red" rotation={-8} bordered />
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="danger"
                      fullWidth
                      onClick={() =>
                        setUnlockedPosts((prev) => new Set([...prev, selectedPost.id]))
                      }
                    >
                      OVERRIDE CLEARANCE — DECRYPT
                    </Button>
                  </div>
                </div>
              ) : (
                <TerminalDisplay
                  lines={selectedPost.content}
                  color={selectedPost.classified ? "red" : "green"}
                  title={selectedPost.title}
                  typewriter
                  maxHeight="500px"
                  showLineNumbers
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Card title="NO BULLETIN SELECTED">
                <div className="text-center space-y-2 py-4">
                  <div className="text-eva-white/60 font-mono text-sm uppercase tracking-wider">
                    SELECT A BULLETIN TO VIEW
                  </div>
                  <div className="text-eva-white/30 font-mono text-[10px]">
                    {filteredPosts.length} ENTRIES AVAILABLE IN {activeCategory}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Pilot Cards Footer */}
      <div className="border-t border-eva-orange px-6 py-4">
        <h2
          className="text-xs uppercase tracking-[0.2em] text-eva-orange font-bold mb-3"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          ACTIVE PILOT ROSTER
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <PilotCard
            designation="FIRST.C"
            name="REI AYANAMI"
            unit="EVA-00"
            color="cyan"
            plugNumber="00"
            checkStatus="O.K."
            fields={[
              { label: "SYNC RATE", value: "68.2%", status: "ok" },
              { label: "STATUS", value: "STANDBY", status: "ok" },
            ]}
          />
          <PilotCard
            designation="THIRD.C"
            name="SHINJI IKARI"
            unit="EVA-01"
            color="green"
            plugNumber="01"
            checkStatus="SYNC"
            fields={[
              { label: "SYNC RATE", value: "41.3%", status: "warning" },
              { label: "STATUS", value: "IN FIELD", status: "warning" },
            ]}
          />
          <PilotCard
            designation="SECOND.C"
            name="S.ASUKA LANGLEY"
            unit="EVA-02"
            color="red"
            plugNumber="02"
            checkStatus="O.K."
            fields={[
              { label: "SYNC RATE", value: "78.8%", status: "ok" },
              { label: "STATUS", value: "STANDBY", status: "ok" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
