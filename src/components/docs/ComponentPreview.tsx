"use client";

import { useState, type ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  /** The live component render */
  children: ReactNode;
  /** The source code to display in the Code tab */
  code: string;
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
    { id: "code" as const, label: "CODE" },
  ];

  return (
    <div className="mb-8 border border-eva-mid-gray">
      {/* Tab header */}
      <div className="flex items-center bg-eva-dark-gray border-b border-eva-mid-gray">
        {title && (
          <span
            className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-eva-orange font-bold border-r border-eva-mid-gray"
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
              px-5 py-2 text-xs uppercase tracking-[0.15em] font-bold
              border-b-2 transition-colors cursor-pointer
              ${
                activeTab === tab.id
                  ? "text-eva-orange border-eva-orange bg-eva-black"
                  : "text-eva-white/60 border-transparent hover:text-eva-orange"
              }
            `}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-40 mr-1.5 text-[10px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "preview" && (
        <div className="p-6 bg-eva-black min-h-[120px] flex items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      )}
      {activeTab === "code" && (
        <div className="bg-eva-panel">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}
