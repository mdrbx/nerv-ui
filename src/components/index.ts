// EvaUI — Neon Genesis Evangelion Design System
// All components exported from this barrel file

export { EmergencyBanner } from "./EmergencyBanner";
export type { EmergencyBannerProps } from "./EmergencyBanner";

export { TerminalDisplay } from "./TerminalDisplay";
export type { TerminalDisplayProps } from "./TerminalDisplay";

export { TargetingContainer } from "./TargetingContainer";
export type { TargetingContainerProps } from "./TargetingContainer";

export { HexGridBackground } from "./HexGridBackground";
export type { HexGridBackgroundProps } from "./HexGridBackground";

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { InputField } from "./InputField";
export type { InputFieldProps } from "./InputField";

export { SelectMenu } from "./SelectMenu";
export type { SelectMenuProps, SelectMenuOption } from "./SelectMenu";

export { SyncProgressBar } from "./SyncProgressBar";
export type { SyncProgressBarProps } from "./SyncProgressBar";

export { DataGrid } from "./DataGrid";
export type { DataGridProps, DataGridColumn } from "./DataGrid";

export { SystemDialog } from "./SystemDialog";
export type { SystemDialogProps } from "./SystemDialog";

export { NavigationTabs } from "./NavigationTabs";
export type { NavigationTabsProps, NavigationTab } from "./NavigationTabs";

// Phase 2 — Advanced Components
export { TitleScreen } from "./TitleScreen";
export type { TitleScreenProps } from "./TitleScreen";

export { MagiSystemPanel } from "./MagiSystemPanel";
export type { MagiSystemPanelProps, MagiVote, MagiStatus } from "./MagiSystemPanel";

export { SyncRatioChart } from "./SyncRatioChart";
export type { SyncRatioChartProps } from "./SyncRatioChart";

export { CountdownTimer } from "./CountdownTimer";
export type { CountdownTimerProps } from "./CountdownTimer";

export { SeeleMonolith } from "./SeeleMonolith";
export type { SeeleMonolithProps } from "./SeeleMonolith";

export { ClassifiedOverlay } from "./ClassifiedOverlay";
export type { ClassifiedOverlayProps } from "./ClassifiedOverlay";

// Phase 3 — Toast Notification System
export { EvaToastProvider, ToastContainer, useToast } from "./Toast";
export type {
  EvaToastProviderProps,
  Toast,
  ToastVariant,
  ToastContextValue,
  AddToastPayload,
} from "./Toast";

// Phase 3 — Loader & Layout Primitives
export { WireframeLoader } from "./WireframeLoader";
export type { WireframeLoaderProps } from "./WireframeLoader";

export { Card } from "./Card";
export type { CardProps } from "./Card";

export { Accordion, AccordionItem } from "./Accordion";
export type { AccordionProps, AccordionItemProps } from "./Accordion";

// Phase 4 — Chart Components
export { BarChart } from "./BarChart";
export type { BarChartProps, BarChartBar } from "./BarChart";

export { Gauge } from "./Gauge";
export type { GaugeProps } from "./Gauge";

export { PieChart } from "./PieChart";
export type { PieChartProps, PieSlice } from "./PieChart";

// Phase 5 — Video-Reference Components
export { StatusStamp } from "./StatusStamp";
export type { StatusStampProps } from "./StatusStamp";

export { SegmentDisplay } from "./SegmentDisplay";
export type { SegmentDisplayProps } from "./SegmentDisplay";

export { SurveillanceGrid } from "./SurveillanceGrid";
export type { SurveillanceGridProps, SurveillanceFeed } from "./SurveillanceGrid";

export { PatternAlert } from "./PatternAlert";
export type { PatternAlertProps } from "./PatternAlert";

export { TargetingReticle } from "./TargetingReticle";
export type { TargetingReticleProps } from "./TargetingReticle";

export { PilotCard } from "./PilotCard";
export type { PilotCardProps, PilotCardField } from "./PilotCard";

// Phase 6 — Form & UI Primitives
export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { Toggle } from "./Toggle";
export type { ToggleProps } from "./Toggle";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { Tooltip } from "./Tooltip";
export type { TooltipProps } from "./Tooltip";

export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

export { Breadcrumb } from "./Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb";

export { Pagination } from "./Pagination";
export type { PaginationProps } from "./Pagination";

export { RadioGroup } from "./RadioGroup";
export type { RadioGroupProps, RadioOption } from "./RadioGroup";

export { Drawer } from "./Drawer";
export type { DrawerProps } from "./Drawer";

export { Divider } from "./Divider";
export type { DividerProps } from "./Divider";

// Phase 7 — Evangelion-Inspired Status Components
export { PhaseStatusStack } from "./PhaseStatusStack";
export type { PhaseStatusStackProps, PhaseItem } from "./PhaseStatusStack";

export { GradientStatusBar } from "./GradientStatusBar";
export type { GradientStatusBarProps, StatusZone } from "./GradientStatusBar";

// Theme Provider
export { ThemeProvider } from "./ThemeProvider";
export type { ThemeProviderProps } from "./ThemeProvider";
