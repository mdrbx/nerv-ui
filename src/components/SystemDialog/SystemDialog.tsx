"use client";

import { forwardRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { HexGridBackground } from "../HexGridBackground";

export interface SystemDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Dialog title */
  title?: string;
  /** Dialog content */
  children?: ReactNode;
  /** Severity level — affects visual treatment */
  severity?: "normal" | "warning" | "critical";
  /** Accept button text */
  acceptText?: string;
  /** Decline button text */
  declineText?: string;
  /** Called when accept is clicked */
  onAccept?: () => void;
  /** Called when decline is clicked */
  onDecline?: () => void;
  /** Called when overlay is clicked (close) */
  onClose?: () => void;
  /** Show hazard stripes around the dialog */
  showHazardStripes?: boolean;
  /** Optional className */
  className?: string;
  /** Optional portal target element (defaults to document.body) */
  portalContainer?: Element | null;
}

export const SystemDialog = forwardRef<HTMLDivElement, SystemDialogProps>(
  function SystemDialog({
    open,
    title = "SYSTEM NOTIFICATION",
    children,
    severity = "normal",
    acceptText = "ACCEPT",
    declineText = "DECLINE",
    onAccept,
    onDecline,
    onClose,
    showHazardStripes,
    className = "",
    portalContainer,
  }, ref) {
  const isDestructive = severity === "critical" || showHazardStripes;
  const borderColor =
    severity === "critical"
      ? "border-eva-red"
      : severity === "warning"
        ? "border-eva-orange"
        : "border-eva-mid-gray";
  const titleColor =
    severity === "critical"
      ? "text-eva-red"
      : severity === "warning"
        ? "text-eva-orange"
        : "text-eva-orange";

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Overlay with hex grid */}
          <div className="absolute inset-0 bg-black/80" onClick={onClose}>
            <HexGridBackground
              color={severity === "critical" ? "#FF0000" : "#FF9900"}
              opacity={0.04}
              animated={false}
            />
          </div>

          {/* Dialog container */}
          <motion.div
            ref={ref}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              relative w-full max-w-lg bg-eva-black
              border-2 ${borderColor}
              ${className}
            `}
          >
            {/* Top hazard stripes */}
            {isDestructive && <div className="h-3 hazard-stripes-black" />}

            {/* Title bar */}
            <div
              className={`flex items-center justify-between px-4 py-2 border-b ${borderColor} bg-eva-dark-gray`}
            >
              <div className="flex items-center gap-2">
                {severity === "critical" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-eva-red text-lg leading-none"
                  >
                    !
                  </motion.span>
                )}
                <h2
                  className={`text-sm uppercase tracking-[0.2em] font-bold ${titleColor}`}
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {title}
                </h2>
              </div>
              <span className="text-[10px] font-mono text-eva-mid-gray">
                MAGI.SYS
              </span>
            </div>

            {/* Content */}
            <div className="px-6 py-5 text-sm text-eva-white font-mono leading-relaxed">
              {children}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 px-6 py-4 border-t border-eva-mid-gray bg-eva-dark-gray">
              {onDecline && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDecline}
                  fullWidth
                >
                  {declineText}
                </Button>
              )}
              {onAccept && (
                <Button
                  variant={severity === "critical" ? "danger" : "primary"}
                  size="sm"
                  onClick={onAccept}
                  fullWidth
                >
                  {acceptText}
                </Button>
              )}
            </div>

            {/* Bottom hazard stripes */}
            {isDestructive && <div className="h-3 hazard-stripes-black" />}

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-30 -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-30 translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-30 -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-30 translate-x-px translate-y-px" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') {
    return content;
  }

  return createPortal(content, portalContainer || document.body);
});
