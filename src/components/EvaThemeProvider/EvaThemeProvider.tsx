"use client";

import { type ReactNode, type CSSProperties, useMemo } from "react";

export interface EvaThemeProviderProps {
  /** Theme overrides — keys are CSS custom property names (without --), values are CSS values */
  theme?: Record<string, string>;
  /** Child content */
  children: ReactNode;
  /** Additional class names */
  className?: string;
}

export function EvaThemeProvider({
  theme = {},
  children,
  className = "",
}: EvaThemeProviderProps) {
  const style = useMemo(() => {
    const vars: CSSProperties = {};
    for (const [key, value] of Object.entries(theme)) {
      const prop = key.startsWith("--") ? key : `--color-${key}`;
      (vars as Record<string, string>)[prop] = value;
    }
    return vars;
  }, [theme]);

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
