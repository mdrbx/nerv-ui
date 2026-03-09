export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "GETTING STARTED",
    items: [
      { title: "INSTALLATION", href: "/docs/getting-started/installation" },
    ],
  },
  {
    title: "COMPONENTS",
    items: [
      { title: "EMERGENCY BANNER", href: "/docs/components/emergency-banner" },
      { title: "BUTTON", href: "/docs/components/button" },
      { title: "INPUT FIELD", href: "/docs/components/input-field" },
      { title: "TERMINAL DISPLAY", href: "/docs/components/terminal-display" },
      { title: "SYNC PROGRESS BAR", href: "/docs/components/sync-progress-bar" },
      { title: "DATA GRID", href: "/docs/components/data-grid" },
      { title: "SYSTEM DIALOG", href: "/docs/components/system-dialog" },
      { title: "NAVIGATION TABS", href: "/docs/components/navigation-tabs" },
      { title: "TARGETING CONTAINER", href: "/docs/components/targeting-container" },
      { title: "HEX GRID BACKGROUND", href: "/docs/components/hex-grid-background" },
      { title: "SELECT MENU", href: "/docs/components/select-menu" },
      { title: "EVA TITLE SCREEN", href: "/docs/components/eva-title-screen" },
      { title: "MAGI SYSTEM PANEL", href: "/docs/components/magi-system-panel" },
      { title: "SYNC RATIO CHART", href: "/docs/components/sync-ratio-chart" },
      { title: "COUNTDOWN TIMER", href: "/docs/components/countdown-timer" },
      { title: "SEELE MONOLITH", href: "/docs/components/seele-monolith" },
      { title: "CLASSIFIED OVERLAY", href: "/docs/components/classified-overlay" },
      { title: "TOAST NOTIFICATIONS", href: "/docs/components/toast" },
      { title: "WIREFRAME LOADER", href: "/docs/components/wireframe-loader" },
      { title: "EVA CARD", href: "/docs/components/eva-card" },
      { title: "EVA ACCORDION", href: "/docs/components/eva-accordion" },
      { title: "EVA BAR CHART", href: "/docs/components/eva-bar-chart" },
      { title: "EVA GAUGE", href: "/docs/components/eva-gauge" },
      { title: "EVA PIE CHART", href: "/docs/components/eva-pie-chart" },
      { title: "EVA STATUS STAMP", href: "/docs/components/eva-status-stamp" },
      { title: "SEGMENT DISPLAY", href: "/docs/components/segment-display" },
      { title: "SURVEILLANCE GRID", href: "/docs/components/surveillance-grid" },
      { title: "PATTERN ALERT", href: "/docs/components/pattern-alert" },
      { title: "TARGETING RETICLE", href: "/docs/components/targeting-reticle" },
      { title: "PILOT CARD", href: "/docs/components/pilot-card" },
    ],
  },
  {
    title: "EXAMPLES",
    items: [
      { title: "REAL-TIME DASHBOARD", href: "/examples/realtime" },
      { title: "FORM", href: "/examples/form" },
      { title: "BLOG", href: "/examples/blog" },
      { title: "SAAS LANDING PAGE", href: "/examples/saas" },
    ],
  },
];
