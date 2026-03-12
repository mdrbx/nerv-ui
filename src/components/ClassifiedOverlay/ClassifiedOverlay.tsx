"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ClassifiedOverlayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children"> {
  /** Alert text displayed on the overlay (e.g. "CLASSIFIED", "TOP SECRET") */
  text?: string;
  /** Controls overlay visibility -- when true the content is revealed */
  isUnlocked?: boolean;
  /** The content hidden behind the overlay */
  children?: ReactNode;
  /** Optional className */
  className?: string;
}

export const ClassifiedOverlay = forwardRef<HTMLDivElement, ClassifiedOverlayProps>(
  function ClassifiedOverlay(
    {
      text = "CLASSIFIED",
      isUnlocked = false,
      children,
      className = "",
      ...rest
    },
    ref
  ) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`} {...rest}>
        {/* Hidden content */}
        {children}

        {/* Overlay -- slides violently upward on unlock */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              className="absolute inset-0 z-50 flex items-center justify-center"
            >
              {/* Hazard stripes background (red & black diagonal) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    -45deg,
                    #000000,
                    #000000 10px,
                    #FF0000 10px,
                    #FF0000 20px
                  )`,
                  opacity: 0.35,
                }}
              />

              {/* Dark overlay to increase contrast */}
              <div className="absolute inset-0 bg-eva-black/80" />

              {/* Central text block */}
              <div className="relative z-10 bg-eva-black/90 border-4 border-eva-red px-10 py-6">
                <span
                  className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-eva-red"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {text}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
