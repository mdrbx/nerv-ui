import Link from "next/link";
import { docsNavigation, docsQuickLinks } from "@/docs/navigation";

export default function DocsLanding() {
  return (
    <div className="space-y-8">
      <section className="border border-eva-mid-gray/80 bg-[linear-gradient(135deg,rgba(255,153,0,0.14),transparent_42%)]">
        <div className="border-b border-eva-mid-gray/80 px-4 py-2 sm:px-5">
          <span
            className="text-[10px] uppercase tracking-[0.24em] text-eva-green"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            [entry.node] documentation router
          </span>
        </div>
        <div className="grid gap-6 px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <div className="space-y-4">
            <h1
              className="!mb-0"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              Documentation
            </h1>
            <p>
              This console is the canonical inspection layer for the EvaUI
              system. Use it to audit component frames, density, signal
              hierarchy, and operational patterns before integration.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs/getting-started/installation"
                className="border border-eva-orange px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-eva-orange hover:bg-eva-orange hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                Open installation
              </Link>
              <Link
                href="/docs/components/card"
                className="border border-eva-cyan px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-eva-cyan hover:bg-eva-cyan hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                Inspect frames
              </Link>
              <Link
                href="/docs/getting-started/camera-overlays"
                className="border border-eva-green px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-eva-green hover:bg-eva-green hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                Inspect overlays
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-eva-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
                sections
              </div>
              <div
                className="mt-1 text-2xl uppercase tracking-[0.16em] text-eva-orange"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {String(docsNavigation.length).padStart(2, "0")}
              </div>
            </div>
            <div className="border border-eva-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
                modules
              </div>
              <div
                className="mt-1 text-2xl uppercase tracking-[0.16em] text-eva-cyan"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {String(
                  docsNavigation.reduce((sum, section) => sum + section.items.length, 0)
                ).padStart(2, "0")}
              </div>
            </div>
            <div className="border border-eva-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
                primary route
              </div>
              <div
                className="mt-1 text-sm uppercase tracking-[0.14em] text-eva-green"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                install
              </div>
            </div>
            <div className="border border-eva-mid-gray/80 px-3 py-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
                state
              </div>
              <div
                className="mt-1 text-sm uppercase tracking-[0.14em] text-eva-orange"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                ready
              </div>
            </div>
            <div className="border border-eva-mid-gray/80 px-3 py-2 col-span-2">
              <div className="text-[8px] uppercase tracking-[0.18em] text-eva-white/35">
                active visual split
              </div>
              <div
                className="mt-1 text-sm uppercase tracking-[0.14em] text-eva-green"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                control room + camera overlay
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {docsNavigation.map((section, index) => (
          <div
            key={section.title}
            className="border border-eva-mid-gray/80 bg-white/[0.015]"
          >
            <div className="flex items-center justify-between border-b border-eva-mid-gray/80 px-4 py-2">
              <div>
                <div
                  className="text-[9px] uppercase tracking-[0.18em] text-eva-white/35"
                  style={{ fontFamily: "var(--font-eva-mono)" }}
                >
                  [{String(index + 1).padStart(2, "0")}]
                </div>
                <div
                  className="mt-1 text-sm uppercase tracking-[0.16em] text-eva-orange"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {section.title}
                </div>
              </div>
              <span
                className="text-[9px] uppercase tracking-[0.18em] text-eva-cyan"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {String(section.items.length).padStart(2, "0")} modules
              </span>
            </div>
            <div className="space-y-2 px-4 py-3">
              {section.items.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border border-transparent px-2 py-1.5 text-[10px] uppercase tracking-[0.16em] text-eva-white/70 hover:border-eva-orange/40 hover:text-eva-orange transition-colors"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  <span className="min-w-0 truncate">{item.title}</span>
                  <span
                    className="ml-3 shrink-0 text-eva-white/25"
                    style={{ fontFamily: "var(--font-eva-mono)" }}
                  >
                    //
                  </span>
                </Link>
              ))}
              <Link
                href={section.items[0].href}
                className="inline-flex items-center border border-eva-mid-gray/80 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-eva-cyan hover:border-eva-cyan/60 hover:text-eva-cyan transition-colors"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                open section
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="border border-eva-mid-gray/80">
        <div className="border-b border-eva-mid-gray/80 px-4 py-2">
          <span
            className="text-[10px] uppercase tracking-[0.22em] text-eva-green"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            external relays
          </span>
        </div>
        <div className="flex flex-wrap gap-3 px-4 py-4">
          {docsQuickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-eva-mid-gray/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-eva-cyan hover:border-eva-cyan/60 hover:text-eva-cyan transition-colors"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
