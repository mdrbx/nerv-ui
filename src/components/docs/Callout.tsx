import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}

const calloutStyles = {
  info: {
    border: "border-eva-cyan",
    bg: "bg-eva-cyan/5",
    title: "text-eva-cyan",
    icon: "i",
  },
  warning: {
    border: "border-eva-orange",
    bg: "bg-eva-orange/5",
    title: "text-eva-orange",
    icon: "!",
  },
  danger: {
    border: "border-eva-red",
    bg: "bg-eva-red/5",
    title: "text-eva-red",
    icon: "!!",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = calloutStyles[type];
  return (
    <div className={`border-l-4 ${s.border} ${s.bg} p-4 mb-6`}>
      {title && (
        <div
          className={`text-xs uppercase tracking-[0.2em] font-bold ${s.title} mb-2`}
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          <span className="mr-2">[{s.icon}]</span>
          {title}
        </div>
      )}
      <div
        className="text-eva-white text-[13px]"
        style={{ fontFamily: "var(--font-eva-body)" }}
      >
        {children}
      </div>
    </div>
  );
}
