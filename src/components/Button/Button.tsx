"use client";

import { forwardRef, type ReactNode, type MouseEventHandler } from "react";
import { motion } from "framer-motion";

type MotionSafeButtonAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "type" | "disabled" | "onClick" | "className" | "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
>;

export interface ButtonProps extends MotionSafeButtonAttributes {
  /** Visual variant */
  variant?: "primary" | "danger" | "ghost" | "terminal";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Show loading/processing state */
  loading?: boolean;
  /** Full-width button */
  fullWidth?: boolean;
  /** Button content */
  children?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Additional class names */
  className?: string;
  /** HTML type attribute */
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary: {
    base: "bg-eva-black text-eva-orange border-2 border-eva-orange",
    hover: "hover:bg-eva-orange hover:text-eva-black",
    active: "active:bg-eva-amber active:text-eva-black",
  },
  danger: {
    base: "bg-eva-black text-eva-red border-2 border-eva-red",
    hover: "hover:bg-eva-red hover:text-eva-black",
    active: "active:bg-red-700 active:text-white",
  },
  ghost: {
    base: "bg-transparent text-eva-orange border border-eva-mid-gray",
    hover: "hover:border-eva-orange hover:bg-eva-orange/10",
    active: "active:bg-eva-orange/20",
  },
  terminal: {
    base: "bg-eva-black text-eva-green border border-eva-green",
    hover: "hover:bg-eva-green hover:text-eva-black",
    active: "active:bg-green-700 active:text-black",
  },
};

const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-8 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      children,
      disabled,
      onClick,
      className = "",
      type = "button",
      ...rest
    },
    ref
  ) {
    const v = variants[variant];

    return (
      <motion.button
        ref={ref}
        {...rest}
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative uppercase tracking-[0.15em] font-bold
          transition-colors duration-100 cursor-pointer
          select-none outline-none
          disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none
          ${v.base} ${v.hover} ${v.active}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        style={{ fontFamily: "var(--font-eva-display)" }}
        disabled={disabled || loading}
        onClick={onClick}
        aria-busy={loading ? true : undefined}
        aria-disabled={loading ? true : undefined}
      >
        {/* Loading indicator */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-current"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          </span>
        )}

        {/* Content */}
        <span className={loading ? "invisible" : ""}>{children}</span>

        {/* Decorative corner accents */}
        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-50" />
        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-current opacity-50" />
        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-current opacity-50" />
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-50" />
      </motion.button>
    );
  }
);
