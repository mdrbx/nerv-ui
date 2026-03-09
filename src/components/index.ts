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
export { EvaTitleScreen } from "./EvaTitleScreen";
export type { EvaTitleScreenProps } from "./EvaTitleScreen";

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

export { EvaCard } from "./EvaCard";
export type { EvaCardProps } from "./EvaCard";

export { EvaAccordion, EvaAccordionItem } from "./EvaAccordion";
export type { EvaAccordionProps, EvaAccordionItemProps } from "./EvaAccordion";
