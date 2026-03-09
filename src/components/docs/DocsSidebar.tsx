"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "@/docs/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 min-h-screen bg-eva-dark-gray border-r border-eva-mid-gray overflow-y-auto">
      {/* Logo / back link */}
      <div className="px-4 py-4 border-b border-eva-mid-gray">
        <Link
          href="/"
          className="text-eva-orange hover:text-eva-cyan transition-colors text-xs uppercase tracking-[0.2em] font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
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
      {docsNavigation.map((section, si) => (
        <div key={section.title} className="py-3">
          <h4
            className="px-4 text-[10px] uppercase tracking-[0.3em] text-eva-orange/60 font-bold mb-2"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            <span className="opacity-50 mr-1">
              {String(si + 1).padStart(2, "0")}
            </span>
            {section.title}
          </h4>
          <ul>
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
        </div>
      ))}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-eva-mid-gray mt-8">
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
    </nav>
  );
}
