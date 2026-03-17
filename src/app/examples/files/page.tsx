"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";

// ─── Types ───

interface FileEntry {
  name: string;
  ext: string;
  size: string;
  sizeBytes: number;
  date: string;
  type: string;
  icon: string;
  folder: string;
}

type SortKey = "name" | "date" | "size" | "type";
type ViewMode = "grid" | "list";

function GridViewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="2" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="10" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="10" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ListViewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4H13" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 8H13" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 12H13" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="1.75" cy="4" r="0.75" fill="currentColor" />
      <circle cx="1.75" cy="8" r="0.75" fill="currentColor" />
      <circle cx="1.75" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

// ─── Folder tree structure ───

interface FolderNode {
  name: string;
  path: string;
  children?: FolderNode[];
}

const folderTree: FolderNode[] = [
  {
    name: "ROOT",
    path: "ROOT",
    children: [
      {
        name: "MAGI",
        path: "ROOT/MAGI",
        children: [
          { name: "MELCHIOR-1", path: "ROOT/MAGI/MELCHIOR-1" },
          { name: "BALTHASAR-2", path: "ROOT/MAGI/BALTHASAR-2" },
          { name: "CASPER-3", path: "ROOT/MAGI/CASPER-3" },
        ],
      },
      { name: "OPERATIONS", path: "ROOT/OPERATIONS" },
      { name: "CLASSIFIED", path: "ROOT/CLASSIFIED" },
      { name: "ARCHIVES", path: "ROOT/ARCHIVES" },
    ],
  },
];

// ─── Mock files ───

const allFiles: FileEntry[] = [
  { name: "OPERATION_YASHIMA_REPORT", ext: ".nerv", size: "124.8 MB", sizeBytes: 130862694, date: "2015-06-20", type: "REPORT", icon: "\u{1F4CB}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "SYNC_RATIO_PILOT_01", ext: ".lcl", size: "48.2 MB", sizeBytes: 50537267, date: "2015-06-21", type: "SYNC DATA", icon: "\u{1F4CA}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "IKARI_SHINJI_PROFILE", ext: ".eva", size: "12.4 MB", sizeBytes: 13002342, date: "2015-06-18", type: "PILOT", icon: "\u{1F464}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "MAGI_DIAGNOSTIC_LOG", ext: ".magi", size: "256.1 MB", sizeBytes: 268535603, date: "2015-06-22", type: "SYSTEM", icon: "\u{1F5A5}\uFE0F", folder: "ROOT/MAGI/CASPER-3" },
  { name: "AT_FIELD_ANALYSIS", ext: ".nerv", size: "89.7 MB", sizeBytes: 94058291, date: "2015-06-19", type: "REPORT", icon: "\u{1F4CB}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "EVA_UNIT01_TELEMETRY", ext: ".eva", size: "67.3 MB", sizeBytes: 70582067, date: "2015-06-22", type: "TELEMETRY", icon: "\u{1F4E1}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "PATTERN_BLUE_DETECTION", ext: ".magi", size: "34.9 MB", sizeBytes: 36595302, date: "2015-06-21", type: "SYSTEM", icon: "\u{1F5A5}\uFE0F", folder: "ROOT/MAGI/CASPER-3" },
  { name: "LCL_PURIFICATION_DATA", ext: ".lcl", size: "18.6 MB", sizeBytes: 19503513, date: "2015-06-20", type: "SYNC DATA", icon: "\u{1F4CA}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "SORYU_ASUKA_PROFILE", ext: ".eva", size: "11.8 MB", sizeBytes: 12373197, date: "2015-06-17", type: "PILOT", icon: "\u{1F464}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "ANGEL_ENCOUNTER_003", ext: ".nerv", size: "142.5 MB", sizeBytes: 149422080, date: "2015-06-15", type: "REPORT", icon: "\u{1F4CB}", folder: "ROOT/MAGI/CASPER-3" },
  { name: "NERV_COMM_INTERCEPT", ext: ".magi", size: "22.4 MB", sizeBytes: 23488102, date: "2015-06-22", type: "SYSTEM", icon: "\u{1F5A5}\uFE0F", folder: "ROOT/MAGI/CASPER-3" },
  { name: "AYANAMI_REI_PROFILE", ext: ".eva", size: "18.6 MB", sizeBytes: 19503513, date: "2015-06-16", type: "PILOT", icon: "\u{1F464}", folder: "ROOT/MAGI/CASPER-3" },
  // Files in other folders
  { name: "MELCHIOR_CORE_DUMP", ext: ".magi", size: "512.0 MB", sizeBytes: 536870912, date: "2015-06-22", type: "SYSTEM", icon: "\u{1F5A5}\uFE0F", folder: "ROOT/MAGI/MELCHIOR-1" },
  { name: "BALTHASAR_VOTE_LOG", ext: ".magi", size: "8.2 MB", sizeBytes: 8598323, date: "2015-06-21", type: "SYSTEM", icon: "\u{1F5A5}\uFE0F", folder: "ROOT/MAGI/BALTHASAR-2" },
  { name: "DEPLOYMENT_ORDERS", ext: ".nerv", size: "4.1 MB", sizeBytes: 4298342, date: "2015-06-20", type: "REPORT", icon: "\u{1F4CB}", folder: "ROOT/OPERATIONS" },
  { name: "SEELE_TRANSCRIPT_07", ext: ".nerv", size: "1.2 MB", sizeBytes: 1258291, date: "2015-06-10", type: "REPORT", icon: "\u{1F512}", folder: "ROOT/CLASSIFIED" },
  { name: "SECOND_IMPACT_DATA", ext: ".nerv", size: "2048.0 MB", sizeBytes: 2147483648, date: "2000-09-13", type: "REPORT", icon: "\u{1F4CB}", folder: "ROOT/ARCHIVES" },
];

const sortOptions = [
  { value: "name", label: "NAME" },
  { value: "date", label: "DATE" },
  { value: "size", label: "SIZE" },
  { value: "type", label: "TYPE" },
];

const typeVariantMap: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
  REPORT: "warning",
  "SYNC DATA": "info",
  PILOT: "success",
  SYSTEM: "default",
  TELEMETRY: "info",
};

// ─── Component ───

export default function FileManager() {
  const [selectedFolder, setSelectedFolder] = useState("ROOT/MAGI/CASPER-3");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const folderFiles = useMemo(() => {
    return allFiles.filter((f) => f.folder === selectedFolder);
  }, [selectedFolder]);

  const filteredFiles = useMemo(() => {
    let files = folderFiles.filter((f) => {
      if (search === "") return true;
      const q = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.ext.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q)
      );
    });

    files.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return b.date.localeCompare(a.date);
        case "size":
          return b.sizeBytes - a.sizeBytes;
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return files;
  }, [folderFiles, search, sort]);

  const totalSize = useMemo(() => {
    const bytes = folderFiles.reduce((sum, f) => sum + f.sizeBytes, 0);
    return (bytes / (1024 * 1024)).toFixed(1);
  }, [folderFiles]);

  const breadcrumbParts = selectedFolder.split("/");
  const breadcrumbItems = breadcrumbParts.map((part, i) => ({
    label: part,
    onClick: () => {
      const path = breadcrumbParts.slice(0, i + 1).join("/");
      // Only navigate if it's a valid folder
      const valid = allFiles.some((f) => f.folder.startsWith(path));
      if (valid) setSelectedFolder(path);
    },
  }));

  // ─── Folder tree renderer ───

  function renderTree(nodes: FolderNode[], depth = 0): React.ReactNode {
    return nodes.map((node) => {
      const isActive = selectedFolder === node.path;
      const isParentOfActive = selectedFolder.startsWith(node.path + "/");
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.path}>
          <button
            type="button"
            onClick={() => setSelectedFolder(node.path)}
            className={`w-full text-left cursor-pointer transition-colors duration-75 group ${
              isActive
                ? "bg-nerv-orange/20 text-nerv-orange"
                : "text-nerv-white/60 hover:text-nerv-orange hover:bg-nerv-orange/5"
            }`}
            style={{
              paddingLeft: `${depth * 16 + 8}px`,
              paddingRight: "8px",
              paddingTop: "4px",
              paddingBottom: "4px",
              fontFamily: "var(--font-nerv-mono)",
            }}
          >
            <span className="text-xs">
              {hasChildren ? (isActive || isParentOfActive ? "\u25BC " : "\u25B6 ") : "  "}
              {node.name}/
            </span>
            {isActive && (
              <span
                className="ml-2 text-[9px] text-nerv-orange/60"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                [ACTIVE]
              </span>
            )}
          </button>
          {hasChildren && (isActive || isParentOfActive) && renderTree(node.children!, depth + 1)}
        </div>
      );
    });
  }

  return (
    <div className="min-h-screen bg-nerv-black">
      {/* ═══════ HEADER ═══════ */}
      <div className="border-b border-nerv-orange px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          <h1
            className="text-xl sm:text-2xl uppercase tracking-[0.2em] text-nerv-orange font-bold"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            MAGI FILE SYSTEM
          </h1>
          <Badge label="MELCHIOR-1" variant="info" size="sm" />
        </div>
        <p className="text-[10px] font-mono text-nerv-white/50">
          NERV CENTRAL DOGMA \u2014 FILE ACCESS TERMINAL \u2014 AUTHORIZED PERSONNEL ONLY
        </p>
      </div>

      {/* ═══════ BREADCRUMB ═══════ */}
      <div className="border-b border-nerv-orange/30 px-4 sm:px-6 py-2">
        <Breadcrumb items={breadcrumbItems} separator=">" color="orange" />
      </div>

      {/* ═══════ TOOLBAR ═══════ */}
      <div className="border-b border-nerv-orange/30 px-4 sm:px-6 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <InputField
              label="SEARCH FILES"
              placeholder="ENTER FILENAME OR TYPE..."
              color="cyan"
              size="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sm:col-span-4">
            <SelectMenu
              label="SORT BY"
              options={sortOptions}
              color="cyan"
              size="sm"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            />
          </div>
          <div className="sm:col-span-3 flex items-end gap-2">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`flex-1 px-3 py-1.5 border text-sm font-mono cursor-pointer transition-colors duration-75 ${
                viewMode === "grid"
                  ? "border-nerv-orange bg-nerv-orange text-nerv-black font-bold"
                  : "border-nerv-mid-gray text-nerv-mid-gray hover:border-nerv-orange hover:text-nerv-orange"
              }`}
            >
              <span className="flex items-center justify-center">
                <GridViewIcon />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`flex-1 px-3 py-1.5 border text-sm font-mono cursor-pointer transition-colors duration-75 ${
                viewMode === "list"
                  ? "border-nerv-orange bg-nerv-orange text-nerv-black font-bold"
                  : "border-nerv-mid-gray text-nerv-mid-gray hover:border-nerv-orange hover:text-nerv-orange"
              }`}
            >
              <span className="flex items-center justify-center">
                <ListViewIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* ─── Sidebar: Folder tree ─── */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-nerv-orange/30">
          <div className="px-3 py-2 border-b border-nerv-mid-gray bg-nerv-dark-gray">
            <span
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-nerv-orange"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              DIRECTORY TREE
            </span>
          </div>
          <div className="py-1">{renderTree(folderTree)}</div>
        </div>

        {/* ─── Main: File view ─── */}
        <div className="lg:col-span-9 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs uppercase tracking-[0.15em] font-bold text-nerv-orange"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              {selectedFolder.split("/").pop()} \u2014 {filteredFiles.length} FILE{filteredFiles.length !== 1 ? "S" : ""}
            </span>
            <span className="text-[10px] font-mono text-nerv-mid-gray">
              SORTED BY: {sort.toUpperCase()}
            </span>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="border border-nerv-mid-gray/30 p-8 text-center">
              <span
                className="text-sm text-nerv-white/30 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-nerv-display)" }}
              >
                NO FILES MATCH CURRENT FILTER
              </span>
            </div>
          ) : viewMode === "grid" ? (
            /* ─── Grid view ─── */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredFiles.map((file) => (
                <div
                  key={file.name}
                  className="border border-nerv-mid-gray/30 bg-nerv-dark-gray hover:border-nerv-orange/60 transition-colors duration-75 cursor-default group"
                >
                  <div className="px-3 py-3 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl">{file.icon}</span>
                      <Badge
                        label={file.type}
                        variant={typeVariantMap[file.type] || "default"}
                        size="sm"
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs font-bold text-nerv-orange group-hover:text-nerv-white transition-colors duration-75 truncate"
                        style={{ fontFamily: "var(--font-nerv-mono)" }}
                      >
                        {file.name}
                        <span className="text-nerv-cyan">{file.ext}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-nerv-white/40">
                      <span>{file.size}</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ─── List view ─── */
            <div className="border border-nerv-mid-gray/30 bg-nerv-dark-gray">
              <div className="grid grid-cols-12 gap-0 px-3 py-1.5 border-b border-nerv-mid-gray bg-nerv-orange text-nerv-black">
                <span className="col-span-1 text-[10px] uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-nerv-display)" }}>#</span>
                <span className="col-span-5 text-[10px] uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-nerv-display)" }}>FILENAME</span>
                <span className="col-span-2 text-[10px] uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-nerv-display)" }}>TYPE</span>
                <span className="col-span-2 text-[10px] uppercase tracking-wider font-bold text-right" style={{ fontFamily: "var(--font-nerv-display)" }}>SIZE</span>
                <span className="col-span-2 text-[10px] uppercase tracking-wider font-bold text-right" style={{ fontFamily: "var(--font-nerv-display)" }}>DATE</span>
              </div>
              {filteredFiles.map((file, i) => (
                <div
                  key={file.name}
                  className="grid grid-cols-12 gap-0 px-3 py-1.5 border-b border-nerv-mid-gray/20 text-xs font-mono text-nerv-orange hover:bg-nerv-orange hover:text-nerv-black transition-colors duration-75 cursor-default items-center"
                >
                  <span className="col-span-1 text-nerv-mid-gray">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-5 truncate">
                    {file.icon} {file.name}
                    <span className="text-nerv-cyan">{file.ext}</span>
                  </span>
                  <span className="col-span-2">
                    <Badge
                      label={file.type}
                      variant={typeVariantMap[file.type] || "default"}
                      size="sm"
                    />
                  </span>
                  <span className="col-span-2 text-right text-nerv-white/50">{file.size}</span>
                  <span className="col-span-2 text-right text-nerv-white/40">{file.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══════ STATUS BAR ═══════ */}
      <div className="border-t border-nerv-white/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
        <span className="text-[9px] font-mono text-nerv-white/30">
          {folderFiles.length} FILES \u2014 {totalSize} MB \u2014 LAST SYNC: 2015-06-22 14:30:00
        </span>
        <span className="text-[9px] font-mono text-nerv-white/30">
          MAGI FILE SYSTEM v3.1.0 \u2014 ACCESS LEVEL: RESTRICTED
        </span>
      </div>
    </div>
  );
}
