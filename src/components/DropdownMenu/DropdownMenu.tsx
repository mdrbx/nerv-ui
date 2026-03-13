"use client";

import {
  type ReactNode,
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface DropdownMenuItem {
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownMenuProps {
  /** The element that opens the menu */
  trigger: ReactNode;
  /** Menu items */
  items: DropdownMenuItem[];
  /** Color theme */
  color?: "orange" | "green" | "cyan" | "red";
  /** Menu alignment relative to trigger */
  align?: "left" | "right";
  /** Additional class names for the wrapper */
  className?: string;
}

const colorMap = {
  orange: {
    border: "border-eva-orange/40",
    hover: "hover:bg-eva-orange/10",
    text: "text-eva-orange",
  },
  green: {
    border: "border-eva-green/40",
    hover: "hover:bg-eva-green/10",
    text: "text-eva-green",
  },
  cyan: {
    border: "border-eva-cyan/40",
    hover: "hover:bg-eva-cyan/10",
    text: "text-eva-cyan",
  },
  red: {
    border: "border-eva-red/40",
    hover: "hover:bg-eva-red/10",
    text: "text-eva-red",
  },
};

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu(
    { trigger, items, color = "orange", align = "left", className = "" },
    ref
  ) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const c = colorMap[color];

    const close = useCallback(() => setOpen(false), []);

    // Close on click outside
    useEffect(() => {
      if (!open) {
        return;
      }

      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [open, close]);

    // Close on Escape
    useEffect(() => {
      if (!open) {
        return;
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          close();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, close]);

    const handleItemClick = (item: DropdownMenuItem) => {
      if (item.disabled) {
        return;
      }

      item.onClick?.();
      close();
    };

    return (
      <div ref={ref} className={`relative inline-block ${className}`}>
        {/* Trigger */}
        <div
          ref={wrapperRef}
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          {trigger}
        </div>

        {/* Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className={`
                absolute z-50 mt-1 min-w-[180px]
                ${align === "left" ? "left-0" : "right-0"}
                bg-eva-black border ${c.border}
                py-1
              `}
              style={{ fontFamily: "var(--font-eva-mono)" }}
              role="menu"
            >
              {/* L-bracket corners */}
              <span
                className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l ${c.border}`}
              />
              <span
                className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${c.border}`}
              />
              <span
                className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l ${c.border}`}
              />
              <span
                className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r ${c.border}`}
              />

              {items.map((item, i) => {
                if (item.divider) {
                  return (
                    <hr
                      key={`divider-${i}`}
                      className="my-1 border-eva-mid-gray"
                    />
                  );
                }

                const isDanger = item.danger;
                const isDisabled = item.disabled;

                return (
                  <button
                    key={`${item.label}-${i}`}
                    role="menuitem"
                    disabled={isDisabled}
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full text-left px-4 py-2
                      text-xs uppercase tracking-wider
                      flex items-center gap-2
                      transition-colors duration-75
                      ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                      ${isDanger ? "text-eva-red hover:bg-eva-red/10" : `${c.text} ${c.hover}`}
                      ${isDisabled ? "" : ""}
                    `}
                  >
                    {item.icon && (
                      <span className="text-sm leading-none">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
