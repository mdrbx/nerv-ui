"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation, docsQuickLinks } from "@/docs/navigation";

function getActiveSectionIndex(pathname: string): number {
  return docsNavigation.findIndex((section) =>
    section.items.some((item) => item.href === pathname)
  );
}

function SidebarContent({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const activeSectionIndex = getActiveSectionIndex(pathname);
  const moduleCount = docsNavigation.reduce(
    (total, section) => total + section.items.length,
    0
  );

  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    if (activeSectionIndex >= 0) {
      initial[activeSectionIndex] = true;
    }
    return initial;
  });

  useEffect(() => {
    const idx = getActiveSectionIndex(pathname);
    if (idx >= 0) {
      setExpanded((prev) => ({ ...prev, [idx]: true }));
    }
  }, [pathname]);

  const toggleSection = useCallback((index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#141414_0%,#0a0a0a_35%,#050505_100%)]">
      {/* Logo / back link */}
      <div className="border-b border-eva-mid-gray/80 px-4 py-4 shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span
            className="text-[9px] uppercase tracking-[0.22em] text-eva-green"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            inspect.mode
          </span>
          <span
            className="border border-eva-orange/45 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em] text-eva-orange"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            online
          </span>
        </div>
        <Link
          href="/"
          className="text-eva-orange hover:text-eva-cyan transition-colors text-[10px] uppercase tracking-[0.22em] font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
          onClick={onLinkClick}
        >
          &larr; COMMAND CENTER
        </Link>
        <div
          className="mt-3 text-lg uppercase tracking-[0.18em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          EVA-UI
        </div>
        <div className="mt-1 text-[10px] font-mono text-eva-white/62">
          NERV DOCUMENTATION INSPECTION
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="border border-eva-mid-gray/70 px-2 py-1.5">
            <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
              sections
            </div>
            <div
              className="text-sm uppercase tracking-[0.12em] text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {String(docsNavigation.length).padStart(2, "0")}
            </div>
          </div>
          <div className="border border-eva-mid-gray/70 px-2 py-1.5">
            <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
              modules
            </div>
            <div
              className="text-sm uppercase tracking-[0.12em] text-eva-cyan"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {String(moduleCount).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation sections */}
      <div className="flex-1 overflow-y-auto px-1.5 py-2">
        {docsNavigation.map((section, si) => {
          const isExpanded = expanded[si] ?? false;
          const sectionHasActive = section.items.some(
            (item) => item.href === pathname
          );

          return (
            <div key={section.title} className="mb-2 border border-transparent">
              <button
                type="button"
                onClick={() => toggleSection(si)}
                className={`
                  w-full flex items-center justify-between border border-eva-mid-gray/70 px-3 py-2 text-[10px] uppercase tracking-[0.24em] font-bold cursor-pointer transition-colors
                  ${sectionHasActive ? "text-eva-orange bg-white/[0.02]" : "text-eva-orange/60 hover:text-eva-orange/85"}
                `}
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                <span className="flex items-center gap-2 text-left">
                  <span className="opacity-45">
                    [{String(si + 1).padStart(2, "0")}]
                  </span>
                  <span>{section.title}</span>
                </span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {isExpanded && (
                <ul className="border-x border-b border-eva-mid-gray/70 bg-black/55 py-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onLinkClick}
                          className={`
                            flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors
                            border-l
                            ${
                              isActive
                                ? "text-eva-orange border-eva-orange bg-white/[0.03] font-bold"
                                : "text-white/78 border-transparent hover:text-eva-orange hover:border-eva-orange/45"
                            }
                          `}
                          style={{ fontFamily: "var(--font-eva-display)" }}
                        >
                          <span
                            className={`${isActive ? "text-eva-green" : "text-eva-white/25"}`}
                            style={{ fontFamily: "var(--font-eva-mono)" }}
                          >
                            //
                          </span>
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* Quick links */}
        <div className="mt-1 border-t border-eva-mid-gray/70 px-1.5 pt-3 pb-2">
          <div
            className="px-2 pb-2 text-[9px] uppercase tracking-[0.2em] text-eva-white/35"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            external relays
          </div>
          {docsQuickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className="flex items-center gap-2 border border-eva-mid-gray/70 px-3 py-2 text-[10px] uppercase tracking-[0.22em] font-bold text-eva-cyan/75 hover:text-eva-cyan transition-colors mb-2"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-eva-mid-gray/80 px-4 py-3 shrink-0">
        <div className="space-y-1 text-[9px] font-mono text-eva-white/60">
          <div>EVA-UI v0.7.0</div>
          <div>INSPECTION ROUTER // READY</div>
        </div>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-[linear-gradient(90deg,#151515_0%,#0b0b0b_70%)] border-b border-eva-mid-gray/80 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="text-eva-orange hover:text-eva-cyan transition-colors p-1 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="ml-3 mr-auto">
          <div
            className="text-sm uppercase tracking-[0.16em] text-eva-orange font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            EVA-UI DOCS
          </div>
          <div
            className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            inspection terminal
          </div>
        </div>
        <span
          className="border border-eva-green/45 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em] text-eva-green"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          live
        </span>
      </div>

      {/* Desktop sidebar */}
      <nav className="docs-sidebar-shell hidden lg:block fixed top-0 left-0 h-screen border-r border-eva-mid-gray/80 z-30">
        <SidebarContent />
      </nav>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <nav className="relative w-[22rem] max-w-[88vw] h-full border-r border-eva-mid-gray/80 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={closeMobile}
              className="absolute top-3 right-3 text-eva-white hover:text-eva-orange transition-colors p-1 cursor-pointer z-10"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <SidebarContent onLinkClick={closeMobile} />
          </nav>
        </div>
      )}
    </>
  );
}
