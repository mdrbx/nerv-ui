import type { ReactNode } from "react";
import { DocsCommandPalette } from "@/components/docs/DocsCommandPalette";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-nerv-black text-nerv-white">
      <DocsSidebar />
      <main className="docs-main min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,153,0,0.07),transparent_24%),linear-gradient(180deg,#050505_0%,#020202_100%)] pt-14 lg:pt-0">
        <div className="border-b border-nerv-mid-gray/70 px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.26em] text-nerv-green"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                doc.access // online
              </div>
              <div
                className="mt-1 text-lg uppercase tracking-[0.18em] text-nerv-orange"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                NERV COMPONENT INSPECTION
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DocsCommandPalette />
              <div
                className="border border-nerv-mid-gray/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-nerv-white/45"
                style={{ fontFamily: "var(--font-nerv-mono)" }}
              >
                route integrity monitored
              </div>
            </div>
          </div>
        </div>
        <div
          className="
            docs-content
            mx-auto max-w-[82rem] px-4 py-6 sm:px-6 lg:px-10 lg:py-8
          "
          style={{ fontFamily: "var(--font-nerv-body)" }}
        >
          <article className="docs-mdx">{children}</article>
        </div>
      </main>
    </div>
  );
}
