"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "@/docs/navigation";

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
    <div className="flex flex-col h-full">
      {/* Logo / back link */}
      <div className="px-4 py-4 border-b border-eva-mid-gray shrink-0">
        <Link
          href="/"
          className="text-eva-orange hover:text-eva-cyan transition-colors text-xs uppercase tracking-[0.2em] font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
          onClick={onLinkClick}
        >
          &larr; COMMAND CENTER
        </Link>
        <div
          className="mt-2 text-lg uppercase tracking-[0.15em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          EVA-UI
        </div>
        <div className="text-[10px] font-mono text-eva-white/50 mt-0.5">
          DOCUMENTATION SYSTEM
        </div>
      </div>

      {/* Navigation sections */}
      <div className="flex-1 overflow-y-auto">
        {docsNavigation.map((section, si) => {
          const isExpanded = expanded[si] ?? false;
          const sectionHasActive = section.items.some(
            (item) => item.href === pathname
          );

          return (
            <div key={section.title} className="py-1">
              <button
                type="button"
                onClick={() => toggleSection(si)}
                className={`
                  w-full flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold cursor-pointer transition-colors
                  ${sectionHasActive ? "text-eva-orange" : "text-eva-orange/60 hover:text-eva-orange/80"}
                `}
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                <span>
                  <span className="opacity-50 mr-1">
                    [{String(si + 1).padStart(2, "0")}]
                  </span>
                  {section.title}
                </span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
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
                <ul>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onLinkClick}
                          className={`
                            block px-4 py-1.5 text-xs uppercase tracking-wider transition-colors
                            border-l-2
                            ${
                              isActive
                                ? "text-eva-orange border-eva-orange bg-eva-black font-bold"
                                : "text-eva-white/80 border-transparent hover:text-eva-orange hover:border-eva-orange/50"
                            }
                          `}
                          style={{ fontFamily: "var(--font-eva-display)" }}
                        >
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
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-eva-mid-gray shrink-0">
        <div className="text-[9px] font-mono text-eva-white/40 space-y-0.5">
          <div>EVA-UI v0.5.0</div>
          <div>NERV DOCUMENTATION SYSTEM</div>
          <div className="mt-1">
            <Link
              href="https://github.com/MattLoyeD/eva-ui"
              className="text-eva-cyan/60 hover:text-eva-cyan transition-colors"
            >
              GITHUB REPOSITORY
            </Link>
          </div>
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
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center h-12 px-4 bg-eva-dark-gray border-b border-eva-mid-gray lg:hidden">
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
        <span
          className="ml-3 text-sm uppercase tracking-[0.15em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          EVA-UI DOCS
        </span>
      </div>

      {/* Desktop sidebar */}
      <nav className="hidden lg:block fixed top-0 left-0 w-64 h-screen bg-eva-dark-gray border-r border-eva-mid-gray z-30">
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
          <nav className="relative w-72 max-w-[85vw] h-full bg-eva-dark-gray border-r border-eva-mid-gray shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={closeMobile}
              className="absolute top-3 right-3 text-eva-white/60 hover:text-eva-orange transition-colors p-1 cursor-pointer z-10"
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
