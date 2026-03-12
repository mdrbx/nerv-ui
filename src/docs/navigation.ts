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
      { title: "TITLE SCREEN", href: "/docs/components/title-screen" },
      { title: "MAGI SYSTEM PANEL", href: "/docs/components/magi-system-panel" },
      { title: "SYNC RATIO CHART", href: "/docs/components/sync-ratio-chart" },
      { title: "COUNTDOWN TIMER", href: "/docs/components/countdown-timer" },
      { title: "SEELE MONOLITH", href: "/docs/components/seele-monolith" },
      { title: "CLASSIFIED OVERLAY", href: "/docs/components/classified-overlay" },
      { title: "TOAST NOTIFICATIONS", href: "/docs/components/toast" },
      { title: "WIREFRAME LOADER", href: "/docs/components/wireframe-loader" },
      { title: "CARD", href: "/docs/components/card" },
      { title: "ACCORDION", href: "/docs/components/accordion" },
      { title: "BAR CHART", href: "/docs/components/bar-chart" },
      { title: "GAUGE", href: "/docs/components/gauge" },
      { title: "PIE CHART", href: "/docs/components/pie-chart" },
      { title: "STATUS STAMP", href: "/docs/components/status-stamp" },
      { title: "SEGMENT DISPLAY", href: "/docs/components/segment-display" },
      { title: "SURVEILLANCE GRID", href: "/docs/components/surveillance-grid" },
      { title: "PATTERN ALERT", href: "/docs/components/pattern-alert" },
      { title: "TARGETING RETICLE", href: "/docs/components/targeting-reticle" },
      { title: "PILOT CARD", href: "/docs/components/pilot-card" },
      { title: "CHECKBOX", href: "/docs/components/checkbox" },
      { title: "TOGGLE", href: "/docs/components/toggle" },
      { title: "TEXTAREA", href: "/docs/components/textarea" },
      { title: "TOOLTIP", href: "/docs/components/tooltip" },
      { title: "BADGE", href: "/docs/components/badge" },
      { title: "SKELETON", href: "/docs/components/skeleton" },
      { title: "BREADCRUMB", href: "/docs/components/breadcrumb" },
      { title: "PAGINATION", href: "/docs/components/pagination" },
      { title: "RADIO GROUP", href: "/docs/components/radio-group" },
      { title: "DRAWER", href: "/docs/components/drawer" },
      { title: "DIVIDER", href: "/docs/components/divider" },
      { title: "THEME PROVIDER", href: "/docs/components/theme-provider" },
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
