# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `forwardRef` support on all components — every component now accepts `ref` and spreads native HTML attributes
- `useId()` for accessible label/input association in `InputField` and `SelectMenu`
- React Portal rendering for `SystemDialog` and `ToastContainer`
- `aria-busy` and `aria-disabled` on `Button` when `loading={true}`
- New form components: `Checkbox`, `Toggle`, `Textarea`, `RadioGroup`
- New UI primitives: `Tooltip`, `Badge`, `Skeleton`, `Divider`
- New navigation components: `Breadcrumb`, `Pagination`
- New overlay component: `Drawer`
- `ThemeProvider` for runtime theme customization via CSS custom properties
- Vitest test suite with tests for core components
- `CHANGELOG.md` and `CONTRIBUTING.md`
- `type-check` script in package.json

### Fixed
- Moved `next`, `@mdx-js/*`, `prism-react-renderer` from `dependencies` to `devDependencies` — consumers no longer install the entire doc site stack
- Moved `react`, `react-dom`, `framer-motion` from `dependencies` to `devDependencies` (already in `peerDependencies`)

### Changed
- Updated README: component count from 17 to 30+, imports use `@mattloyed/eva-ui`, added installation section
- Updated `docs/COMPONENTS.md` with Phase 3-5 component documentation
- All code examples use `from "@mattloyed/eva-ui"` instead of `from "@/components"`

## [1.0.0] - 2025-06-01

### Added
- Phase 1 — 11 core interface components: `EmergencyBanner`, `TerminalDisplay`, `TargetingContainer`, `HexGridBackground`, `Button`, `InputField`, `SelectMenu`, `SyncProgressBar`, `DataGrid`, `SystemDialog`, `NavigationTabs`
- Phase 2 — 6 advanced components: `TitleScreen`, `MagiSystemPanel`, `SyncRatioChart`, `CountdownTimer`, `SeeleMonolith`, `ClassifiedOverlay`
- Phase 3 — Toast system (`ToastProvider`, `ToastContainer`, `useToast`), `WireframeLoader`, `Card`, `Accordion`
- Phase 4 — Chart components: `BarChart`, `Gauge`, `PieChart`
- Phase 5 — Video-reference components: `StatusStamp`, `SegmentDisplay`, `SurveillanceGrid`, `PatternAlert`, `TargetingReticle`, `PilotCard`
- NERV color palette and typography via Tailwind CSS 4 `@theme`
- Tailwind preset (`tailwind.preset.js`)
- Dual CJS/ESM build via tsup
- GitHub Pages documentation site with MDX
- GitHub Actions CI/CD for deployment
