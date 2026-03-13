"use client";

import { forwardRef, useCallback, useRef, useState, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MotionSafeDivAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "color" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart" | "onDrop"
>;

export interface FileUploadProps extends MotionSafeDivAttributes {
  /** Callback when files are selected or dropped */
  onFilesSelected?: (files: File[]) => void;
  /** Accepted file types, e.g. ".pdf,.doc" */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Primary label inside the drop zone */
  label?: string;
  /** Secondary label below the primary */
  sublabel?: string;
  /** Color theme for brackets and accents */
  color?: "orange" | "green" | "cyan";
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

const themeColors = {
  orange: "#FF9900",
  green: "#00FF00",
  cyan: "#00FFFF",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  {
    onFilesSelected,
    accept,
    multiple = false,
    maxSize,
    label = "DROP FILES HERE",
    sublabel = "or click to browse",
    color = "orange",
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const c = themeColors[color];
  const bracketSize = 20;

  const validateAndAddFiles = useCallback(
    (incoming: File[]) => {
      setError(null);

      const rejected: string[] = [];
      const accepted: File[] = [];

      for (const file of incoming) {
        if (maxSize && file.size > maxSize) {
          rejected.push(`${file.name} exceeds ${formatFileSize(maxSize)}`);
          continue;
        }

        accepted.push(file);
      }

      if (rejected.length > 0) {
        setError(rejected.join(", "));
      }

      if (accepted.length === 0) {
        return;
      }

      const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
      setFiles(next);
      onFilesSelected?.(next);
    },
    [files, maxSize, multiple, onFilesSelected]
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      setError(null);
      onFilesSelected?.(next);
    },
    [files, onFilesSelected]
  );

  const handleClick = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(Array.from(e.target.files));
    }

    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    if (e.dataTransfer.files) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const hasError = !!error;
  const borderColor = hasError ? "#FF0000" : c;

  return (
    <div
      ref={ref}
      className={`${disabled ? "opacity-30 pointer-events-none" : ""} ${className}`}
      {...rest}
    >
      {/* Drop zone */}
      <motion.div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="relative cursor-pointer select-none"
        style={{ minHeight: 160 }}
      >
        {/* Dashed / solid border area */}
        <div
          className="absolute inset-0 transition-all duration-150"
          style={{
            border: `2px ${isDragging ? "solid" : "dashed"} ${borderColor}`,
            opacity: isDragging ? 0.8 : 0.4,
            backgroundColor: isDragging ? `${c}08` : "transparent",
          }}
        />

        {/* L-Brackets — 4 corners */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderTop: `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderTop: `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderBottom: `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: bracketSize,
            height: bracketSize,
            borderBottom: `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
          }}
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-10 px-6">
          {/* Upload arrow */}
          <motion.span
            animate={{ y: isDragging ? -4 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-2xl leading-none mb-3"
            style={{ color: c, fontFamily: "var(--font-eva-display)" }}
          >
            ▲
          </motion.span>

          {/* Label */}
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold mb-1"
            style={{ color: c, fontFamily: "var(--font-eva-display)" }}
          >
            {label}
          </span>

          {/* Sublabel */}
          <span
            className="text-[10px] uppercase tracking-[0.15em] text-eva-mid-gray"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {sublabel}
          </span>
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-[10px] uppercase tracking-[0.15em] font-bold text-eva-red"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 space-y-1"
          >
            {files.map((file, i) => (
              <motion.li
                key={`${file.name}-${file.size}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 px-3 py-1.5 border border-eva-mid-gray/20"
              >
                {/* Dot accent */}
                <span className="w-1 h-1 shrink-0" style={{ backgroundColor: c }} />

                {/* File name */}
                <span
                  className="text-[11px] uppercase tracking-[0.1em] text-eva-light-gray truncate flex-1"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {file.name}
                </span>

                {/* File size */}
                <span
                  className="text-[10px] uppercase tracking-[0.1em] text-eva-mid-gray shrink-0"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {formatFileSize(file.size)}
                </span>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="text-eva-mid-gray hover:text-eva-red transition-colors text-xs leading-none cursor-pointer shrink-0"
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});
