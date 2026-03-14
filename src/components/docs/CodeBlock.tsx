"use client";

import { useState } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

const evaTheme: PrismTheme = {
  plain: {
    color: "#E0E0E0",
    backgroundColor: "#0A0A0A",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#777777" },
    },
    { types: ["punctuation"], style: { color: "#FF9900" } },
    {
      types: [
        "property",
        "tag",
        "boolean",
        "number",
        "constant",
        "symbol",
      ],
      style: { color: "#00FFFF" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: { color: "#00FF00" },
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "#FF9900" },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: "#FF00FF" },
    },
    {
      types: ["function", "class-name"],
      style: { color: "#00FFFF" },
    },
    {
      types: ["regex", "important", "variable"],
      style: { color: "#FF0000" },
    },
  ],
};

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border border-eva-mid-gray/80 bg-eva-panel">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 border-b border-eva-mid-gray/80 bg-[linear-gradient(90deg,rgba(255,153,0,0.14),rgba(255,153,0,0)_45%)] px-2.5 py-1.5 sm:px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="text-[9px] text-eva-orange/70"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            [{filename ? "FILE" : "SRC"}]
          </span>
          <span
            className="truncate text-[10px] uppercase tracking-[0.28em] text-eva-orange font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {filename || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 border border-eva-mid-gray/80 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-eva-white/55 hover:border-eva-cyan/60 hover:text-eva-cyan transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>

      {/* Code content */}
      <Highlight theme={evaTheme} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto px-0 py-2 text-[11px] leading-relaxed sm:text-xs"
            style={{ ...style, fontFamily: "var(--font-eva-mono)" }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className={`${i % 2 === 0 ? "bg-white/[0.015]" : ""} px-3 sm:px-4`}
              >
                <span className="inline-block w-6 shrink-0 text-right mr-3 text-eva-white/28 select-none text-[9px] sm:w-8 sm:mr-4 sm:text-[10px]">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
