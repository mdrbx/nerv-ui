"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface DataGridColumn {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  /** Enable click-to-sort on this column */
  sortable?: boolean;
  /** Column data type for sorting -- "auto" detects from first non-empty value */
  type?: "string" | "int" | "float" | "datetime" | "auto";
}

export interface DataGridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "color"> {
  /** Column definitions */
  columns: DataGridColumn[];
  /** Row data (array of objects keyed by column.key) */
  data: Record<string, string | number>[];
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Enable auto-scrolling (log mode) */
  autoScroll?: boolean;
  /** Auto-scroll speed in pixels per second */
  scrollSpeed?: number;
  /** Max visible height */
  maxHeight?: string;
  /** Title label */
  title?: string;
  /** Show row index column */
  showIndex?: boolean;
  /** Rows per page -- undefined = show all (no pagination) */
  pageSize?: number;
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    header: "bg-eva-orange text-eva-black",
    row: "text-eva-orange",
    hoverRow: "hover:bg-eva-orange hover:text-eva-black",
    border: "border-eva-orange/20",
  },
  green: {
    header: "bg-eva-green text-eva-black",
    row: "text-eva-green",
    hoverRow: "hover:bg-eva-green hover:text-eva-black",
    border: "border-eva-green/20",
  },
  cyan: {
    header: "bg-eva-cyan text-eva-black",
    row: "text-eva-cyan",
    hoverRow: "hover:bg-eva-cyan hover:text-eva-black",
    border: "border-eva-cyan/20",
  },
};

/** Detect column data type from first non-empty value */
function detectColumnType(
  data: Record<string, string | number>[],
  key: string
): "string" | "int" | "float" | "datetime" {
  const firstNonEmpty = data.find(
    (row) => row[key] != null && row[key] !== ""
  );
  if (!firstNonEmpty) return "string";
  const val = String(firstNonEmpty[key]);

  if (/^-?\d+$/.test(val)) return "int";
  if (/^-?\d+\.?\d*$/.test(val) && !isNaN(parseFloat(val))) return "float";
  if (!isNaN(Date.parse(val)) && val.length > 4) return "datetime";

  return "string";
}

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  function DataGrid(
    {
      columns,
      data,
      color = "green",
      autoScroll = false,
      scrollSpeed = 30,
      maxHeight = "400px",
      title,
      showIndex = false,
      pageSize,
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    // --- Sorting state ---
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);

    // --- Pagination state ---
    const [currentPage, setCurrentPage] = useState(0);

    // Reset page when sort or data changes
    useEffect(() => {
      setCurrentPage(0);
    }, [data.length, sortKey, sortDir]);

    // --- Sorted data ---
    const sortedData = useMemo(() => {
      if (!sortKey || !sortDir) return data;

      const col = columns.find((c) => c.key === sortKey);
      const colType =
        col?.type === "auto" || !col?.type
          ? detectColumnType(data, sortKey)
          : col.type;

      return [...data].sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
        let cmp = 0;

        switch (colType) {
          case "int":
          case "float":
            cmp = parseFloat(String(aVal)) - parseFloat(String(bVal));
            break;
          case "datetime":
            cmp = Date.parse(String(aVal)) - Date.parse(String(bVal));
            break;
          default:
            cmp = String(aVal).localeCompare(String(bVal));
        }

        return sortDir === "desc" ? -cmp : cmp;
      });
    }, [data, sortKey, sortDir, columns]);

    // --- Paginated data ---
    const totalPages = pageSize
      ? Math.max(1, Math.ceil(sortedData.length / pageSize))
      : 1;
    const displayData = pageSize
      ? sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      : sortedData;

    // --- Header click handler ---
    const handleHeaderClick = (col: DataGridColumn) => {
      if (!col.sortable) return;

      if (sortKey !== col.key) {
        setSortKey(col.key);
        setSortDir("asc");
      } else if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortKey(null);
        setSortDir(null);
      }
    };

    // Auto-scroll effect
    useEffect(() => {
      if (!autoScroll || hovering) return;

      const el = scrollRef.current;
      if (!el) return;

      const interval = setInterval(() => {
        el.scrollTop += 1;
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
          el.scrollTop = 0;
        }
      }, 1000 / scrollSpeed);

      return () => clearInterval(interval);
    }, [autoScroll, scrollSpeed, hovering]);

    return (
      <div ref={ref} className={`bg-eva-black border border-eva-mid-gray ${className}`} {...rest}>
        {/* Title bar */}
        {title && (
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-eva-mid-gray bg-eva-dark-gray">
            <span
              className={`text-xs uppercase tracking-[0.2em] font-bold ${c.row}`}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {title}
            </span>
            <span className="text-[10px] font-mono text-eva-mid-gray">
              {data.length} ENTRIES
            </span>
          </div>
        )}

        {/* Table */}
        <div
          ref={scrollRef}
          className="overflow-auto"
          style={{ maxHeight }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <table
            className="w-full border-collapse"
            style={{ fontFamily: "var(--font-eva-mono)" }}
          >
            {/* Header */}
            <thead className="sticky top-0 z-10">
              <tr className={c.header}>
                {showIndex && (
                  <th className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-left border-r border-black/20 w-12">
                    #
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleHeaderClick(col)}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold border-r border-black/20 last:border-r-0 ${
                      col.sortable ? "cursor-pointer select-none" : ""
                    }`}
                    style={{
                      width: col.width,
                      textAlign: col.align || "left",
                      fontFamily: "var(--font-eva-display)",
                    }}
                  >
                    {col.header}
                    {col.sortable && (
                      <span className="ml-1.5 text-[8px] opacity-80">
                        {sortKey === col.key
                          ? sortDir === "asc"
                            ? "\u25B2"
                            : "\u25BC"
                          : "\u2014"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {displayData.map((row, i) => (
                <motion.tr
                  key={`${currentPage}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`
                    ${c.row} ${c.hoverRow}
                    border-b border-eva-mid-gray/30
                    transition-colors duration-75 cursor-default text-xs
                  `}
                >
                  {showIndex && (
                    <td className="px-3 py-1.5 text-eva-mid-gray border-r border-eva-mid-gray/20">
                      {String(
                        (pageSize ? currentPage * pageSize : 0) + i + 1
                      ).padStart(3, "0")}
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 py-1.5 border-r border-eva-mid-gray/20 last:border-r-0 whitespace-nowrap"
                      style={{ textAlign: col.align || "left" }}
                    >
                      {row[col.key] ?? "\u2014"}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer status */}
        <div className="flex items-center justify-between px-3 py-1 border-t border-eva-mid-gray bg-eva-dark-gray text-[10px] font-mono text-eva-mid-gray">
          <span>ROWS: {data.length}</span>

          {pageSize && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className={`uppercase tracking-wider cursor-pointer ${
                  currentPage === 0
                    ? "opacity-30 cursor-default"
                    : `${c.row} hover:underline`
                }`}
              >
                PREV
              </button>
              <span className={c.row}>
                PAGE {String(currentPage + 1).padStart(2, "0")}/
                {String(totalPages).padStart(2, "0")}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={currentPage === totalPages - 1}
                className={`uppercase tracking-wider cursor-pointer ${
                  currentPage === totalPages - 1
                    ? "opacity-30 cursor-default"
                    : `${c.row} hover:underline`
                }`}
              >
                NEXT
              </button>
            </div>
          )}

          {autoScroll && (
            <span className={hovering ? "text-eva-orange" : ""}>
              {hovering ? "SCROLL PAUSED" : "AUTO-SCROLL ACTIVE"}
            </span>
          )}
        </div>
      </div>
    );
  }
);
