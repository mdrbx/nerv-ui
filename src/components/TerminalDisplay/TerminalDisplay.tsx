"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export interface TerminalDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "className" | "color"> {
  /** Lines of text to display */
  lines: string[];
  /** Enable typewriter effect */
  typewriter?: boolean;
  /** Typing speed in ms per character */
  typeSpeed?: number;
  /** Delay between lines in ms */
  lineDelay?: number;
  /** Text color variant */
  color?: "green" | "orange" | "cyan" | "red";
  /** Show the blinking cursor */
  showCursor?: boolean;
  /** Terminal title/label */
  title?: string;
  /** Max height with scroll */
  maxHeight?: string;
  /** Optional className */
  className?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Prefix each line with a prompt symbol */
  prompt?: string;
}

const colorMap = {
  green: "text-nerv-green",
  orange: "text-nerv-orange",
  cyan: "text-nerv-cyan",
  red: "text-nerv-red",
};

const glowMap = {
  green: "nerv-text-shadow-green",
  orange: "nerv-text-shadow-orange",
  cyan: "nerv-text-shadow-cyan",
  red: "nerv-text-shadow-red",
};

const lineNumberMap = {
  green: "text-nerv-green/72 border-nerv-green/18 bg-nerv-green/[0.05]",
  orange: "text-nerv-orange/75 border-nerv-orange/22 bg-nerv-orange/[0.05]",
  cyan: "text-nerv-cyan/75 border-nerv-cyan/22 bg-nerv-cyan/[0.05]",
  red: "text-nerv-red/78 border-nerv-red/22 bg-nerv-red/[0.05]",
};

export const TerminalDisplay = forwardRef<HTMLDivElement, TerminalDisplayProps>(
  function TerminalDisplay(
    {
      lines,
      typewriter = false,
      typeSpeed = 30,
      lineDelay = 200,
      color = "green",
      showCursor = true,
      title,
      maxHeight = "400px",
      className = "",
      showLineNumbers = false,
      prompt,
      ...rest
    },
    ref
  ) {
    const [displayedLines, setDisplayedLines] = useState<string[]>(
      typewriter ? [] : lines
    );
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isTyping, setIsTyping] = useState(typewriter);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setDisplayedLines(typewriter ? [] : lines);
      setCurrentLine(0);
      setCurrentChar(0);
      setIsTyping(typewriter);
    }, [lines, typewriter, typeSpeed, lineDelay]);

    // Typewriter effect
    useEffect(() => {
      if (!typewriter || currentLine >= lines.length) {
        setIsTyping(false);
        return;
      }

      const line = lines[currentLine];

      if (currentChar === 0) {
        // Start new line
        setDisplayedLines((prev) => [...prev, ""]);
      }

      if (currentChar < line.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = line.substring(0, currentChar + 1);
            return updated;
          });
          setCurrentChar((c) => c + 1);
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Line complete, move to next
        const timeout = setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, lineDelay);
        return () => clearTimeout(timeout);
      }
    }, [typewriter, currentLine, currentChar, lines, typeSpeed, lineDelay]);

    // Auto-scroll to bottom
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [displayedLines]);

    const textColor = colorMap[color];
    const glowClass = glowMap[color];
    const lineNumberClass = lineNumberMap[color];

    return (
      <div ref={ref} className={`relative bg-nerv-black border border-nerv-mid-gray ${className}`} {...rest}>
        {/* Terminal header */}
        {title && (
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-nerv-mid-gray bg-nerv-dark-gray">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-nerv-red" />
              <div className="w-2 h-2 bg-nerv-orange" />
              <div className="w-2 h-2 bg-nerv-green" />
            </div>
            <span
              className="text-xs uppercase tracking-[0.2em] text-nerv-orange font-bold ml-2"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              {title}
            </span>
            <div className="ml-auto text-[10px] text-nerv-mid-gray font-mono">
              MAGI_SYS
            </div>
          </div>
        )}

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="p-4 overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ maxHeight, fontFamily: "var(--font-nerv-mono)" }}
        >
          {displayedLines.map((line, i) => (
            <motion.div
              key={i}
              initial={typewriter ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              className={`${textColor} ${glowClass} whitespace-pre-wrap`}
            >
              {showLineNumbers && (
                <span
                  data-slot="line-number"
                  className={`inline-flex w-12 shrink-0 items-center justify-end mr-3 border-r pr-2 text-[11px] font-semibold tabular-nums select-none ${lineNumberClass}`}
                  style={{
                    fontFamily: "var(--font-nerv-mono)",
                    textShadow: "none",
                  }}
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
              )}
              {prompt && (
                <span className="text-nerv-orange mr-1 select-none">{prompt}</span>
              )}
              {line}
              {/* Cursor on current typing line */}
              {showCursor && isTyping && i === displayedLines.length - 1 && (
                <span
                  className="inline-block w-2.5 h-4 ml-0.5 align-middle bg-current"
                  style={{ animation: "cursor-blink 1s step-end infinite" }}
                />
              )}
            </motion.div>
          ))}

          {/* Resting cursor when typing is done */}
          {showCursor && !isTyping && (
            <span
              className={`inline-block w-2.5 h-4 ml-0.5 align-middle ${textColor.replace("text-", "bg-")}`}
              style={{ animation: "cursor-blink 1s step-end infinite" }}
            />
          )}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-3 py-1 border-t border-nerv-mid-gray bg-nerv-dark-gray text-[10px] font-mono text-nerv-mid-gray">
          <span>LINES: {displayedLines.length}</span>
          <span>{isTyping ? "TRANSMITTING..." : "READY"}</span>
        </div>
      </div>
    );
  }
);
