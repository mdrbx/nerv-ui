"use client";

import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export interface DrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "color"> {
  /** Whether the drawer is open */
  open: boolean;
  /** Called when the drawer should close */
  onClose: () => void;
  /** Which side the drawer slides in from */
  side?: "left" | "right";
  /** Drawer width */
  width?: string;
  /** Header title */
  title?: string;
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Drawer content */
  children?: ReactNode;
}

const colorMap = {
  orange: {
    border: "border-nerv-orange",
    text: "text-nerv-orange",
    hazard: "bg-nerv-orange",
    glow: "rgba(255, 153, 0, 0.08)",
  },
  green: {
    border: "border-nerv-green",
    text: "text-nerv-green",
    hazard: "bg-nerv-green",
    glow: "rgba(0, 255, 0, 0.08)",
  },
  cyan: {
    border: "border-nerv-cyan",
    text: "text-nerv-cyan",
    hazard: "bg-nerv-cyan",
    glow: "rgba(0, 255, 255, 0.08)",
  },
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  function Drawer(
    {
      open,
      onClose,
      side = "right",
      width = "400px",
      title,
      color = "orange",
      children,
      className = "",
    },
    ref
  ) {
    const c = colorMap[color];
    const isRight = side === "right";

    const slideVariants = {
      hidden: { x: isRight ? "100%" : "-100%" },
      visible: { x: 0 },
      exit: { x: isRight ? "100%" : "-100%" },
    };

    const content = (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
          >
            {/* Overlay backdrop */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={onClose}
            />

            {/* Drawer panel */}
            <motion.div
              ref={ref}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`
                absolute top-0 bottom-0
                ${isRight ? "right-0" : "left-0"}
                bg-nerv-black ${c.border}
                ${isRight ? "border-l-2" : "border-r-2"}
                flex flex-col
                ${className}
              `}
              style={{ width }}
              role="dialog"
              aria-modal="true"
              aria-label={title || "Drawer"}
            >
              {/* Hazard stripe top border */}
              <div className="h-1 hazard-stripes-black flex-shrink-0" />

              {/* Title bar */}
              {title && (
                <div
                  className={`flex items-center justify-between px-4 py-3 border-b ${c.border} bg-nerv-dark-gray flex-shrink-0`}
                >
                  <h2
                    className={`text-sm uppercase tracking-[0.2em] font-bold ${c.text}`}
                    style={{ fontFamily: "var(--font-nerv-display)" }}
                  >
                    {title}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close drawer"
                    className={`
                      text-xs font-bold ${c.text} bg-transparent border border-nerv-mid-gray
                      px-2 py-1 cursor-pointer transition-colors duration-100
                      hover:border-current hover:bg-nerv-dark-gray
                    `}
                    style={{ fontFamily: "var(--font-nerv-mono)" }}
                  >
                    [X]
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>

              {/* Corner L-bracket decorations */}
              <div className={`absolute top-0 ${isRight ? "left-0" : "right-0"} w-4 h-4 border-t-2 ${isRight ? "border-l-2" : "border-r-2"} ${c.border} opacity-30 pointer-events-none`} />
              <div className={`absolute bottom-0 ${isRight ? "left-0" : "right-0"} w-4 h-4 border-b-2 ${isRight ? "border-l-2" : "border-r-2"} ${c.border} opacity-30 pointer-events-none`} />
              <div className={`absolute top-0 ${isRight ? "right-0" : "left-0"} w-4 h-4 border-t-2 ${isRight ? "border-r-2" : "border-l-2"} ${c.border} opacity-30 pointer-events-none`} />
              <div className={`absolute bottom-0 ${isRight ? "right-0" : "left-0"} w-4 h-4 border-b-2 ${isRight ? "border-r-2" : "border-l-2"} ${c.border} opacity-30 pointer-events-none`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );

    if (typeof document === "undefined") {
      return content;
    }

    return createPortal(content, document.body);
  }
);
