"use client";

import {
  type ReactNode,
  type HTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useCallback,
  useId,
} from "react";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "content" | "color"> {
  /** Tooltip content */
  content: ReactNode;
  /** Placement side */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay in ms before showing */
  delay?: number;
  /** Trigger element */
  children: ReactNode;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Additional class names */
  className?: string;
}

const colorMap = {
  orange: { border: "border-eva-orange", text: "text-eva-orange" },
  green: { border: "border-eva-green", text: "text-eva-green" },
  cyan: { border: "border-eva-cyan", text: "text-eva-cyan" },
};

const sideStyles: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(
    {
      content,
      side = "top",
      delay = 200,
      children,
      color = "orange",
      className = "",
      ...rest
    },
    ref
  ) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipId = useId();
    const c = colorMap[color];

    const show = useCallback(() => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }, [delay]);

    const hide = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
    }, []);

    return (
      <span
        ref={ref}
        className={`relative inline-block ${className}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={visible ? tooltipId : undefined}
        {...rest}
      >
        {children}

        {/* Tooltip */}
        {visible && (
          <span
            id={tooltipId}
            role="tooltip"
            className={`
              absolute z-50 ${sideStyles[side]}
              bg-eva-black border ${c.border}
              px-3 py-1.5 text-xs whitespace-nowrap
              ${c.text}
              pointer-events-none
            `}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            {/* L-bracket corners */}
            <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l ${c.border}`} />
            <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${c.border}`} />
            <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l ${c.border}`} />
            <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r ${c.border}`} />

            {content}
          </span>
        )}
      </span>
    );
  }
);
