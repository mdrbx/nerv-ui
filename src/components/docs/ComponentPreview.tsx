"use client";

import { useState, type ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  /** The live component render */
  children: ReactNode;
  /** The source code to display in the Code tab */
  code?: string;
  /** Language for syntax highlighting */
  language?: string;
  /** Optional title */
  title?: string;
}

export function ComponentPreview({
  children,
  code,
  language = "tsx",
  title,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const tabs = [
    { id: "preview" as const, label: "PREVIEW" },
    ...(code ? [{ id: "code" as const, label: "CODE" }] : []),
  ];

  return (
    <div className="docs-component-preview mb-8 border border-eva-mid-gray/80 bg-eva-black">
      {/* Tab header */}
      <div className="flex flex-wrap items-center gap-y-1 border-b border-eva-mid-gray/80 bg-[linear-gradient(90deg,rgba(255,153,0,0.16),rgba(255,153,0,0)_35%)]">
        {title && (
          <span
            className="border-r border-eva-mid-gray/80 px-3 py-2 text-[10px] uppercase tracking-[0.26em] text-eva-orange font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {title}
          </span>
        )}
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-3 py-2 text-[10px] uppercase tracking-[0.18em] font-bold
              border-b transition-colors cursor-pointer
              ${
                activeTab === tab.id
                  ? "text-eva-orange border-eva-orange bg-eva-black"
                  : "text-eva-white/60 border-transparent hover:text-eva-orange"
              }
            `}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-45 mr-1 text-[9px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {tab.label}
          </button>
        ))}
        <span
          className="ml-auto px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-eva-white/35"
          style={{ fontFamily: "var(--font-eva-mono)" }}
        >
          inspection frame
        </span>
      </div>

      {/* Tab content */}
      {activeTab === "preview" && (
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_28%)] p-3 sm:p-4">
          <div className="border border-eva-mid-gray/70 bg-eva-black">
            <div className="flex items-center justify-between border-b border-eva-mid-gray/70 px-3 py-1.5">
              <span
                className="text-[9px] uppercase tracking-[0.22em] text-eva-green"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                live inspection
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.18em] text-eva-white/35"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                frame-01
              </span>
            </div>
            <div className="min-h-[112px] overflow-x-auto px-3 py-4 sm:min-h-[124px] sm:px-4 sm:py-5">
              <div className="w-full min-w-0">{children}</div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "code" && code && (
        <div className="bg-eva-panel p-3 sm:p-4">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}
