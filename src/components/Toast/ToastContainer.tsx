"use client";

import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContext, type Toast, type ToastVariant } from "./ToastContext";

// ─── Variant Config ──────────────────────────────────────

const VARIANT_CONFIG: Record<
  ToastVariant,
  { prefix: string; borderColor: string; textColor: string; glowColor: string }
> = {
  info: {
    prefix: "[SYS]",
    borderColor: "border-l-data-blue",
    textColor: "text-eva-cyan",
    glowColor: "rgba(0, 255, 255, 0.15)",
  },
  success: {
    prefix: "[OK]",
    borderColor: "border-l-grid-green",
    textColor: "text-eva-green",
    glowColor: "rgba(0, 255, 0, 0.15)",
  },
  warning: {
    prefix: "[WARN]",
    borderColor: "border-l-text-orange",
    textColor: "text-eva-orange",
    glowColor: "rgba(255, 153, 0, 0.15)",
  },
  error: {
    prefix: "[ERR]",
    borderColor: "border-l-alert-red",
    textColor: "text-eva-red",
    glowColor: "rgba(255, 0, 0, 0.15)",
  },
  critical: {
    prefix: "[CRITICAL]",
    borderColor: "border-l-eva-magenta",
    textColor: "text-eva-magenta",
    glowColor: "rgba(255, 0, 255, 0.2)",
  },
};

// ─── Single Toast Item ───────────────────────────────────

function EvaToast({ id, message, variant, duration }: Toast) {
  const ctx = useContext(ToastContext);
  const config = VARIANT_CONFIG[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx?.removeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, ctx]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      className={`
        relative w-80 border-l-4 ${config.borderColor}
        bg-eva-black border border-eva-mid-gray
        px-4 py-3 cursor-pointer select-none
      `}
      style={{
        boxShadow: `0 0 12px ${config.glowColor}, inset 0 0 8px rgba(0,0,0,0.5)`,
        fontFamily: "var(--font-eva-mono)",
      }}
      onClick={() => ctx?.removeToast(id)}
    >
      {/* Scanline decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative flex items-start gap-2">
        <span
          className={`${config.textColor} text-[10px] font-bold tracking-wider shrink-0 mt-0.5 opacity-70`}
        >
          {config.prefix}
        </span>
        <span
          className={`${config.textColor} text-xs leading-relaxed break-words`}
        >
          {message}
        </span>
      </div>

      {/* Progress bar — auto-dismiss indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: `${config.glowColor.replace("0.15", "0.6").replace("0.2", "0.6")}` }}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

// ─── Container ───────────────────────────────────────────

export function ToastContainer() {
  const ctx = useContext(ToastContext);
  if (!ctx) return null;

  const content = (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {ctx.toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <EvaToast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );

  if (typeof document === 'undefined') {
    return content;
  }

  return createPortal(content, document.body);
}
