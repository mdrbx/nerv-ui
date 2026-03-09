import type { ReactNode } from "react";
import Link from "next/link";

export default function ExamplesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-eva-black">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between px-4 py-2 border-b border-eva-mid-gray bg-eva-dark-gray">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-eva-orange hover:text-eva-cyan transition-colors text-xs uppercase tracking-[0.2em] font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            &larr; COMMAND CENTER
          </Link>
          <span className="text-eva-white/30">|</span>
          <Link
            href="/docs"
            className="text-eva-cyan hover:text-eva-orange transition-colors text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            DOCUMENTATION
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/examples/realtime"
            className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            REAL-TIME
          </Link>
          <Link
            href="/examples/form"
            className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            FORM
          </Link>
          <Link
            href="/examples/blog"
            className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            BLOG
          </Link>
          <Link
            href="/examples/saas"
            className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            SAAS
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
