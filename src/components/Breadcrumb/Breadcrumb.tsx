"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character between items */
  separator?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
}

const colorMap = {
  orange: {
    text: "text-eva-orange",
    separator: "text-eva-orange/50",
    current: "text-eva-white",
    hover: "hover:text-eva-orange hover:underline",
  },
  green: {
    text: "text-eva-green",
    separator: "text-eva-green/50",
    current: "text-eva-white",
    hover: "hover:text-eva-green hover:underline",
  },
  cyan: {
    text: "text-eva-cyan",
    separator: "text-eva-cyan/50",
    current: "text-eva-white",
    hover: "hover:text-eva-cyan hover:underline",
  },
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, separator = ">>", color = "orange", className = "", ...rest },
    ref
  ) {
    const c = colorMap[color];

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={`${className}`}
        {...rest}
      >
        <ol
          className="flex items-center gap-2 list-none m-0 p-0"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;

            return (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    className={`text-[10px] ${c.separator} select-none`}
                    style={{ fontFamily: "var(--font-eva-mono)" }}
                    aria-hidden="true"
                  >
                    {separator}
                  </span>
                )}

                {isLast ? (
                  <span
                    className={`text-xs uppercase tracking-[0.15em] font-bold ${c.current}`}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={`text-xs uppercase tracking-[0.15em] font-bold ${c.text} ${c.hover} transition-colors duration-100 cursor-pointer no-underline`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={`text-xs uppercase tracking-[0.15em] font-bold ${c.text} ${c.hover} transition-colors duration-100 cursor-pointer bg-transparent border-none p-0`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
