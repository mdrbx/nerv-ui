"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface EvaPaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange" | "color"> {
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
}

const colorMap = {
  orange: {
    text: "text-eva-orange",
    border: "border-eva-orange",
    bg: "bg-eva-orange",
    hoverBg: "hover:bg-eva-orange hover:text-eva-black",
    disabledText: "text-eva-mid-gray",
    disabledBorder: "border-eva-mid-gray",
  },
  green: {
    text: "text-eva-green",
    border: "border-eva-green",
    bg: "bg-eva-green",
    hoverBg: "hover:bg-eva-green hover:text-eva-black",
    disabledText: "text-eva-mid-gray",
    disabledBorder: "border-eva-mid-gray",
  },
  cyan: {
    text: "text-eva-cyan",
    border: "border-eva-cyan",
    bg: "bg-eva-cyan",
    hoverBg: "hover:bg-eva-cyan hover:text-eva-black",
    disabledText: "text-eva-mid-gray",
    disabledBorder: "border-eva-mid-gray",
  },
};

export const EvaPagination = forwardRef<HTMLElement, EvaPaginationProps>(
  function EvaPagination(
    {
      total,
      pageSize,
      currentPage,
      onPageChange,
      color = "orange",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;

    const pageDisplay = String(currentPage).padStart(2, "0");
    const totalDisplay = String(totalPages).padStart(2, "0");

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={`flex items-center gap-3 ${className}`}
        {...rest}
      >
        {/* Previous button */}
        <button
          type="button"
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          className={`
            px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
            border transition-colors duration-100 cursor-pointer
            select-none bg-eva-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isFirst ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          &lt;&lt;
        </button>

        {/* LCD page display */}
        <div
          className={`
            px-4 py-1.5 border bg-eva-black ${c.border}
            flex items-center gap-2
          `}
        >
          <span
            className={`text-[10px] uppercase tracking-[0.15em] ${c.text} opacity-60`}
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            PAGE
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            {pageDisplay}
          </span>
          <span
            className={`text-xs ${c.text} opacity-40`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            /
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            {totalDisplay}
          </span>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => !isLast && onPageChange(currentPage + 1)}
          disabled={isLast}
          aria-label="Next page"
          className={`
            px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
            border transition-colors duration-100 cursor-pointer
            select-none bg-eva-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isLast ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          &gt;&gt;
        </button>
      </nav>
    );
  }
);
