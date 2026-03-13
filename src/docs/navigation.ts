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
      { title: "Installation", href: "/docs/getting-started/installation" },
    ],
  },
  {
    title: "LAYOUT",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Divider", href: "/docs/components/divider" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Targeting Container", href: "/docs/components/targeting-container" },
      { title: "Hex Grid Background", href: "/docs/components/hex-grid-background" },
    ],
  },
  {
    title: "FORMS",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Input Field", href: "/docs/components/input-field" },
      { title: "Select Menu", href: "/docs/components/select-menu" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "File Upload", href: "/docs/components/file-upload" },
    ],
  },
  {
    title: "DATA DISPLAY",
    items: [
      { title: "Terminal Display", href: "/docs/components/terminal-display" },
      { title: "Data Grid", href: "/docs/components/data-grid" },
      { title: "Sync Progress Bar", href: "/docs/components/sync-progress-bar" },
      { title: "Segment Display", href: "/docs/components/segment-display" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Pilot Card", href: "/docs/components/pilot-card" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
    ],
  },
  {
    title: "CHARTS",
    items: [
      { title: "Bar Chart", href: "/docs/components/bar-chart" },
      { title: "Gauge", href: "/docs/components/gauge" },
      { title: "Pie Chart", href: "/docs/components/pie-chart" },
      { title: "Sync Ratio Chart", href: "/docs/components/sync-ratio-chart" },
      { title: "Phase Status Stack", href: "/docs/components/phase-status-stack" },
      { title: "Gradient Status Bar", href: "/docs/components/gradient-status-bar" },
    ],
  },
  {
    title: "OVERLAYS",
    items: [
      { title: "System Dialog", href: "/docs/components/system-dialog" },
      { title: "Classified Overlay", href: "/docs/components/classified-overlay" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Status Stamp", href: "/docs/components/status-stamp" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Title Screen", href: "/docs/components/title-screen" },
    ],
  },
  {
    title: "NAVIGATION",
    items: [
      { title: "Navigation Tabs", href: "/docs/components/navigation-tabs" },
      { title: "Emergency Banner", href: "/docs/components/emergency-banner" },
      { title: "Stepper", href: "/docs/components/stepper" },
    ],
  },
  {
    title: "HUD / MILITARY",
    items: [
      { title: "Targeting Reticle", href: "/docs/components/targeting-reticle" },
      { title: "Surveillance Grid", href: "/docs/components/surveillance-grid" },
      { title: "Pattern Alert", href: "/docs/components/pattern-alert" },
      { title: "Magi System Panel", href: "/docs/components/magi-system-panel" },
      { title: "Seele Monolith", href: "/docs/components/seele-monolith" },
      { title: "Countdown Timer", href: "/docs/components/countdown-timer" },
      { title: "Wireframe Loader", href: "/docs/components/wireframe-loader" },
    ],
  },
  {
    title: "THEMING",
    items: [
      { title: "Theme Provider", href: "/docs/components/theme-provider" },
    ],
  },
  {
    title: "EXAMPLES",
    items: [
      { title: "Command Center", href: "/" },
      { title: "Dashboard", href: "/examples/dashboard" },
      { title: "Real-time", href: "/examples/realtime" },
      { title: "Comms Terminal", href: "/examples/comms" },
      { title: "Form", href: "/examples/form" },
      { title: "Blog", href: "/examples/blog" },
      { title: "Inventory", href: "/examples/inventory" },
      { title: "Pilots", href: "/examples/pilots" },
      { title: "Report", href: "/examples/report" },
      { title: "Files", href: "/examples/files" },
      { title: "SaaS Landing", href: "/examples/saas" },
      { title: "Landing", href: "/examples/landing" },
      { title: "Login", href: "/examples/auth/login" },
      { title: "Register", href: "/examples/auth/register" },
      { title: "Help", href: "/examples/help" },
      { title: "Error 404", href: "/examples/error" },
      { title: "Empty State", href: "/examples/empty" },
    ],
  },
];
