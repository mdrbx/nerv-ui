"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface PaginationProps
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
  /** Layout variant */
  variant?: "compact" | "explicit";
  /** Number of pages to keep visible around the current page in explicit mode */
  siblingCount?: number;
}

const colorMap = {
  orange: {
    text: "text-nerv-orange",
    border: "border-nerv-orange",
    bg: "bg-nerv-orange",
    activeBg: "rgba(255, 153, 0, 0.14)",
    hoverBg: "hover:bg-nerv-orange hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
  green: {
    text: "text-nerv-green",
    border: "border-nerv-green",
    bg: "bg-nerv-green",
    activeBg: "rgba(0, 255, 0, 0.14)",
    hoverBg: "hover:bg-nerv-green hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
  cyan: {
    text: "text-nerv-cyan",
    border: "border-nerv-cyan",
    bg: "bg-nerv-cyan",
    activeBg: "rgba(0, 246, 255, 0.14)",
    hoverBg: "hover:bg-nerv-cyan hover:text-nerv-black",
    disabledText: "text-nerv-mid-gray",
    disabledBorder: "border-nerv-mid-gray",
  },
};

function buildPageItems(currentPage: number, totalPages: number, siblingCount: number) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1
    );
    return [...leftRange, "ellipsis", totalPages] as const;
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => totalPages - (2 + siblingCount * 2) + index
    );
    return [1, "ellipsis", ...rightRange] as const;
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index
  );
  return [1, "ellipsis-left", ...middleRange, "ellipsis-right", totalPages] as const;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      total,
      pageSize,
      currentPage,
      onPageChange,
      color = "orange",
      variant = "compact",
      siblingCount = 1,
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;
    const pageItems = buildPageItems(currentPage, totalPages, siblingCount);

    const pageDisplay = String(currentPage).padStart(2, "0");
    const totalDisplay = String(totalPages).padStart(2, "0");

    if (variant === "explicit") {
      return (
        <nav
          ref={ref}
          aria-label="Pagination"
          className={`flex flex-wrap items-center gap-2 ${className}`}
          {...rest}
        >
          <button
            type="button"
            onClick={() => !isFirst && onPageChange(currentPage - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            className={`
              px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
              border transition-colors duration-100 cursor-pointer
              select-none bg-nerv-black
              disabled:opacity-30 disabled:cursor-not-allowed
              ${isFirst ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
            `}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            &lt;&lt; Avant
          </button>

          <div className="flex flex-wrap items-center gap-1">
            {pageItems.map((item, index) => {
              if (typeof item !== "number") {
                return (
                  <span
                    key={`${item}-${index}`}
                    className={`px-2 text-xs ${c.text} opacity-60`}
                    style={{ fontFamily: "var(--font-nerv-mono)" }}
                  >
                    ...
                  </span>
                );
              }

              const isActive = item === currentPage;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onPageChange(item)}
                  aria-label={`Page ${item}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    min-w-8 px-2.5 py-1.5 text-xs font-bold
                    border transition-colors duration-100 cursor-pointer
                    select-none bg-nerv-black
                    ${isActive
                      ? `${c.border} ${c.text}`
                      : `${c.text} ${c.border} ${c.hoverBg}`}
                  `}
                  style={{
                    fontFamily: "var(--font-nerv-mono)",
                    backgroundColor: isActive ? c.activeBg : undefined,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => !isLast && onPageChange(currentPage + 1)}
            disabled={isLast}
            aria-label="Next page"
            className={`
              px-3 py-1.5 text-xs uppercase tracking-[0.15em] font-bold
              border transition-colors duration-100 cursor-pointer
              select-none bg-nerv-black
              disabled:opacity-30 disabled:cursor-not-allowed
              ${isLast ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
            `}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            Après &gt;&gt;
          </button>
        </nav>
      );
    }

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
            select-none bg-nerv-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isFirst ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          &lt;&lt;
        </button>

        {/* LCD page display */}
        <div
          className={`
            px-4 py-1.5 border bg-nerv-black ${c.border}
            flex items-center gap-2
          `}
        >
          <span
            className={`text-[10px] uppercase tracking-[0.15em] ${c.text} opacity-60`}
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            PAGE
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            {pageDisplay}
          </span>
          <span
            className={`text-xs ${c.text} opacity-40`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
          >
            /
          </span>
          <span
            className={`text-sm font-bold ${c.text}`}
            style={{ fontFamily: "var(--font-nerv-mono)" }}
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
            select-none bg-nerv-black
            disabled:opacity-30 disabled:cursor-not-allowed
            ${isLast ? `${c.disabledText} ${c.disabledBorder}` : `${c.text} ${c.border} ${c.hoverBg}`}
          `}
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          &gt;&gt;
        </button>
      </nav>
    );
  }
);
