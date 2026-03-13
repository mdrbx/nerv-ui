"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

const navLinkStyle = { fontFamily: "var(--font-eva-display)" };

const exampleLinks = [
  { href: "/examples/realtime", label: "REAL-TIME" },
  { href: "/examples/form", label: "FORM" },
  { href: "/examples/blog", label: "BLOG" },
  { href: "/examples/saas", label: "SAAS" },
];

export default function ExamplesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Navigation bar */}
      <nav className="relative z-50 flex items-center justify-between px-4 py-2 border-b border-eva-mid-gray bg-eva-dark-gray">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-eva-orange hover:text-eva-cyan transition-colors text-xs uppercase tracking-[0.2em] font-bold"
            style={navLinkStyle}
          >
            &larr; COMMAND CENTER
          </Link>
          <span className="text-eva-white/30 hidden md:inline">|</span>
          <Link
            href="/docs"
            className="hidden md:inline text-eva-cyan hover:text-eva-orange transition-colors text-xs uppercase tracking-[0.2em]"
            style={navLinkStyle}
          >
            DOCUMENTATION
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4">
          {exampleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em]"
              style={navLinkStyle}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-[2px] w-5 bg-eva-orange transition-transform duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-5 bg-eva-orange transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-5 bg-eva-orange transition-transform duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out relative z-40 border-b border-eva-orange/40 bg-eva-black ${mobileOpen ? "max-h-64" : "max-h-0 border-b-0"}`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="text-eva-cyan hover:text-eva-orange transition-colors text-xs uppercase tracking-[0.2em] py-2"
            style={navLinkStyle}
          >
            DOCUMENTATION
          </Link>
          <div className="h-px bg-eva-mid-gray" />
          {exampleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-eva-white/70 hover:text-eva-orange transition-colors text-[10px] uppercase tracking-[0.15em] py-2"
              style={navLinkStyle}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}
