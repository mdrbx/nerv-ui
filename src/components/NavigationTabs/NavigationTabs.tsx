"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface NavigationTab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface NavigationTabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "color" | "direction"> {
  /** Tab definitions */
  tabs: NavigationTab[];
  /** Currently active tab ID */
  activeTab: string;
  /** Called when a tab is clicked */
  onTabChange: (tabId: string) => void;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Color theme */
  color?: "orange" | "green" | "cyan";
  /** Optional className */
  className?: string;
}

const colorMap = {
  orange: {
    active: "bg-eva-black text-eva-orange border-eva-orange",
    inactive: "bg-eva-dark-gray text-eva-mid-gray border-eva-mid-gray hover:text-eva-orange hover:border-eva-orange/50",
    indicator: "bg-eva-orange",
  },
  green: {
    active: "bg-eva-black text-eva-green border-eva-green",
    inactive: "bg-eva-dark-gray text-eva-mid-gray border-eva-mid-gray hover:text-eva-green hover:border-eva-green/50",
    indicator: "bg-eva-green",
  },
  cyan: {
    active: "bg-eva-black text-eva-cyan border-eva-cyan",
    inactive: "bg-eva-dark-gray text-eva-mid-gray border-eva-mid-gray hover:text-eva-cyan hover:border-eva-cyan/50",
    indicator: "bg-eva-cyan",
  },
};

export const NavigationTabs = forwardRef<HTMLElement, NavigationTabsProps>(
  function NavigationTabs(
    {
      tabs,
      activeTab,
      onTabChange,
      direction = "horizontal",
      color = "orange",
      className = "",
      ...rest
    },
    ref
  ) {
    const c = colorMap[color];
    const isVertical = direction === "vertical";

    return (
      <nav
        ref={ref}
        className={`
          flex ${isVertical ? "flex-col" : "flex-row"}
          ${className}
        `}
        role="tablist"
        {...rest}
      >
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              className={`
                relative cursor-pointer select-none
                uppercase tracking-[0.15em] text-xs font-bold
                transition-colors duration-100
                disabled:opacity-30 disabled:cursor-not-allowed
                ${isVertical
                  ? `px-4 py-3 text-left border-l-2 ${isActive ? c.active : c.inactive}`
                  : `px-5 py-2.5 border-b-2 ${isActive ? c.active : c.inactive}`
                }
              `}
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              {/* Classification marker */}
              <span className="opacity-40 mr-2 text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Tab icon */}
              {tab.icon && <span className="mr-1.5">{tab.icon}</span>}

              {/* Label */}
              {tab.label}

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId={`activeTab-${tabs[0]?.id ?? "nav"}`}
                  className={`absolute ${c.indicator} ${
                    isVertical
                      ? "left-0 top-0 bottom-0 w-0.5"
                      : "bottom-0 left-0 right-0 h-0.5"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              {/* Active status dot */}
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute ${
                    isVertical ? "right-3 top-1/2 -translate-y-1/2" : "top-1 right-1"
                  } w-1.5 h-1.5 ${c.indicator}`}
                />
              )}
            </button>
          );
        })}
      </nav>
    );
  }
);
