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
    <div className="relative mb-6 border border-eva-mid-gray bg-eva-panel group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-eva-dark-gray border-b border-eva-mid-gray">
        <span
          className="text-[10px] uppercase tracking-widest text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          className="text-[10px] uppercase tracking-wider text-eva-white/40 hover:text-eva-cyan transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-eva-mono)" }}
        >
          {copied ? "COPIED ✓" : "COPY"}
        </button>
      </div>

      {/* Code content */}
      <Highlight theme={evaTheme} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto p-4 text-xs leading-relaxed"
            style={{ ...style, fontFamily: "var(--font-eva-mono)" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-right mr-4 text-eva-white/30 select-none text-[10px]">
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
