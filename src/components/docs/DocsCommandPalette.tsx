"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { docsCommandItems, type DocsCommandItem } from "@/docs/navigation";

const MAX_RESULTS = 12;

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function getItemScore(item: DocsCommandItem, query: string): number {
  if (!query) return 1;

  const title = normalize(item.title);
  const section = normalize(item.section);
  const href = normalize(item.href);
  const tokens = query.split(/\s+/).filter(Boolean);

  if (tokens.some((token) => !`${title} ${section} ${href}`.includes(token))) {
    return -1;
  }

  let score = 0;

  if (title === query) score += 120;
  if (title.startsWith(query)) score += 80;
  if (title.includes(query)) score += 40;
  if (section.includes(query)) score += 20;
  if (href.includes(query)) score += 10;

  return score;
}

export function DocsCommandPalette() {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query);

    return docsCommandItems
      .map((item) => ({
        item,
        score: getItemScore(item, normalizedQuery),
      }))
      .filter(({ score }) => score >= 0)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        return left.item.title.localeCompare(right.item.title);
      })
      .map(({ item }) => item)
      .slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    inputRef.current?.select();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const activeItem = filteredItems[activeIndex];

  const openItem = (item: DocsCommandItem) => {
    setIsOpen(false);
    setQuery("");

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex min-w-[13rem] items-center justify-between gap-3 border border-nerv-mid-gray/70 bg-black/50 px-3 py-2 text-left transition-colors hover:border-nerv-orange/60 hover:bg-white/[0.03]"
      >
        <div className="min-w-0">
          <div
            className="text-[9px] uppercase tracking-[0.22em] text-nerv-white/38"
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            search.route
          </div>
          <div
            className="mt-1 truncate text-[11px] uppercase tracking-[0.16em] text-nerv-orange transition-colors group-hover:text-nerv-cyan"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            Search docs and components
          </div>
        </div>
        <div
          className="shrink-0 border border-nerv-mid-gray/70 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-nerv-white/55"
          style={{ fontFamily: "var(--font-nerv-mono)" }}
        >
          CTRL K
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close search overlay"
          />

          <div className="relative mx-auto mt-20 w-[min(42rem,calc(100%-1.5rem))] overflow-hidden border border-nerv-orange/45 bg-[linear-gradient(180deg,#15110B_0%,#050505_100%)] shadow-[0_0_0_1px_rgba(255,153,0,0.2),0_0_28px_rgba(255,153,0,0.16)]">
            <div className="border-b border-nerv-mid-gray/70 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className="text-[9px] uppercase tracking-[0.22em] text-nerv-green"
                    style={{ fontFamily: "var(--font-nerv-mono)" }}
                  >
                    command.lookup
                  </div>
                  <div
                    className="mt-1 text-sm uppercase tracking-[0.16em] text-nerv-orange"
                    style={{ fontFamily: "var(--font-nerv-display)" }}
                  >
                    Inspect a component, guide, or route
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border border-nerv-mid-gray/70 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-nerv-white/48 transition-colors hover:text-nerv-orange"
                  style={{ fontFamily: "var(--font-nerv-mono)" }}
                >
                  ESC
                </button>
              </div>
            </div>

            <div className="border-b border-nerv-mid-gray/70 px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (!filteredItems.length) return;

                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                  }

                  if (event.key === "Enter" && activeItem) {
                    event.preventDefault();
                    openItem(activeItem);
                  }
                }}
                placeholder="TYPE A COMPONENT, GUIDE, OR ROUTE"
                className="w-full border border-nerv-orange/30 bg-black/60 px-3 py-3 text-sm uppercase tracking-[0.14em] text-nerv-white outline-none placeholder:text-nerv-white/24 focus:border-nerv-orange"
                style={{ fontFamily: "var(--font-nerv-display)" }}
                aria-label="Search documentation"
              />
            </div>

            <div className="max-h-[26rem] overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  const isCurrent = !item.external && item.href === pathname;

                  return (
                    <button
                      key={`${item.section}-${item.href}`}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => openItem(item)}
                      className={`flex w-full items-center justify-between gap-3 border-b border-nerv-mid-gray/50 px-4 py-3 text-left transition-colors ${
                        isActive ? "bg-white/[0.05]" : "bg-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="min-w-0">
                        <div
                          className={`truncate text-[11px] uppercase tracking-[0.16em] ${
                            isCurrent ? "text-nerv-green" : "text-nerv-white"
                          }`}
                          style={{ fontFamily: "var(--font-nerv-display)" }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="mt-1 text-[9px] uppercase tracking-[0.2em] text-nerv-white/35"
                          style={{ fontFamily: "var(--font-nerv-mono)" }}
                        >
                          {item.section} // {item.href}
                        </div>
                      </div>
                      <div
                        className={`shrink-0 border px-2 py-1 text-[8px] uppercase tracking-[0.18em] ${
                          isActive
                            ? "border-nerv-orange/45 text-nerv-orange"
                            : "border-nerv-mid-gray/60 text-nerv-white/42"
                        }`}
                        style={{ fontFamily: "var(--font-nerv-mono)" }}
                      >
                        {item.external ? "OPEN" : isCurrent ? "CURRENT" : "GO"}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center">
                  <div
                    className="text-[10px] uppercase tracking-[0.24em] text-nerv-orange"
                    style={{ fontFamily: "var(--font-nerv-display)" }}
                  >
                    No matching route
                  </div>
                  <div
                    className="mt-2 text-[10px] uppercase tracking-[0.18em] text-nerv-white/35"
                    style={{ fontFamily: "var(--font-nerv-mono)" }}
                  >
                    Try a component name, section, or path fragment.
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-nerv-mid-gray/70 px-4 py-3">
              {[
                "enter : open",
                "up/down : navigate",
                "esc : close",
                "ctrl+k : toggle",
              ].map((hint) => (
                <div
                  key={hint}
                  className="text-[9px] uppercase tracking-[0.18em] text-nerv-white/35"
                  style={{ fontFamily: "var(--font-nerv-mono)" }}
                >
                  {hint}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
