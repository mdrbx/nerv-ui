<p align="center">
  <img src="https://img.shields.io/badge/NERV-HEADQUARTERS-FF0000?style=for-the-badge&labelColor=000000" alt="NERV HQ" />
  <img src="https://img.shields.io/badge/MAGI_SYSTEM-ONLINE-00FF00?style=for-the-badge&labelColor=000000" alt="MAGI Online" />
  <img src="https://img.shields.io/badge/A.T._FIELD-DEPLOYED-00FFFF?style=for-the-badge&labelColor=000000" alt="A.T. Field" />
</p>

<p align="center">
  <img src="docs/banner.png" alt="EVA UI — Neon Genesis Evangelion Design System" width="100%" />
</p>

<p align="center">
  <strong>Brutalist. Industrial. Zero border-radius. Maximum impact.</strong><br/>
  <sub>A React UI toolkit that faithfully recreates the NERV headquarters interfaces from Neon Genesis Evangelion.</sub>
</p>

<p align="center">
  <a href="https://mattloyed.github.io/eva-ui"><img src="https://img.shields.io/badge/LIVE_DEMO-COMMAND_CENTER-FF9900?style=for-the-badge&labelColor=000000" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
</p>

---

## `> VISUAL_FEED :: NORMAL_OPERATIONS`

![NERV Command Center — Normal Operations](docs/screenshot-dashboard.png)

## `> VISUAL_FEED :: CONDITION_RED`

![NERV Command Center — Emergency Mode](docs/screenshot-emergency.png)

---

## `> SYSTEM_OVERVIEW`

EvaUI is a **30+ component React design system** built to replicate the iconic CRT-era military interfaces of NERV headquarters. Every pixel follows strict brutalist design rules:

- **`border-radius: 0`** everywhere — sharp industrial angles only
- **NERV color palette** — black void, alert red, text orange, grid green, data cyan, magenta wave
- **Condensed uppercase typography** — Oswald, Barlow Condensed, Noto Serif JP
- **Monospace terminal text** — Fira Code for all data readouts
- **CRT scanline overlay** — persistent retro phosphor effect
- **Animated hazard stripes** — diagonal moving patterns for danger states
- **`prefers-reduced-motion`** — all animations respect accessibility settings

## `> COMPONENT_MANIFEST`

### Phase 1 — Core Interface Elements

| Component | Description | Key Props |
|-----------|-------------|-----------|
| [`<EmergencyBanner />`](docs/COMPONENTS.md#emergencybanner) | Full-screen alert with hazard stripes and flickering text | `text`, `severity`, `visible` |
| [`<TerminalDisplay />`](docs/COMPONENTS.md#terminaldisplay) | Monospace terminal with typewriter effect and cursor | `lines`, `typewriter`, `color` |
| [`<TargetingContainer />`](docs/COMPONENTS.md#targetingcontainer) | L-bracket wrapper with crosshair grid | `label`, `color`, `bracketSize` |
| [`<HexGridBackground />`](docs/COMPONENTS.md#hexgridbackground) | SVG honeycomb A.T. Field pattern | `color`, `opacity`, `hexSize` |
| [`<Button />`](docs/COMPONENTS.md#button) | Industrial button with hover inversion | `variant`, `size`, `loading` |
| [`<InputField />`](docs/COMPONENTS.md#inputfield) | Terminal input with focus brackets `[ ]` | `label`, `color`, `error` |
| [`<SelectMenu />`](docs/COMPONENTS.md#selectmenu) | Dropdown with angle brackets `< >` | `options`, `color`, `placeholder` |
| [`<SyncProgressBar />`](docs/COMPONENTS.md#syncprogressbar) | Block-based LCD progress bar | `value`, `label`, `blocks` |
| [`<DataGrid />`](docs/COMPONENTS.md#datagrid) | Surveillance data table with auto-scroll | `columns`, `data`, `autoScroll` |
| [`<SystemDialog />`](docs/COMPONENTS.md#systemdialog) | Modal with hex overlay and hazard framing | `open`, `severity`, `onAccept` |
| [`<NavigationTabs />`](docs/COMPONENTS.md#navigationtabs) | Military classified folder tabs | `tabs`, `activeTab`, `onTabChange` |

### Phase 2 — Advanced Systems

| Component | Description | Key Props |
|-----------|-------------|-----------|
| [`<TitleScreen />`](docs/COMPONENTS.md#titlescreen) | Cinematic title card with serif typography | `title`, `subtitle`, `align` |
| [`<MagiSystemPanel />`](docs/COMPONENTS.md#magisystempanel) | 3-column MAGI supercomputer voting display | `votes[]`, `title` |
| [`<SyncRatioChart />`](docs/COMPONENTS.md#syncratiochart) | Pure SVG dual sinusoidal waveform chart | `frequencyA/B`, `amplitudeA/B` |
| [`<CountdownTimer />`](docs/COMPONENTS.md#countdowntimer) | LCD countdown with battery bar | `initialSeconds`, `onExpire` |
| [`<SeeleMonolith />`](docs/COMPONENTS.md#seelemonolith) | SOUND ONLY monolith with equalizer | `id`, `isSpeaking` |
| [`<ClassifiedOverlay />`](docs/COMPONENTS.md#classifiedoverlay) | TOP SECRET overlay with unlock mechanism | `text`, `isUnlocked`, `children` |

### Phase 3 — Toast & Layout Primitives

| Component | Description | Key Props |
|-----------|-------------|-----------|
| [`<ToastProvider />`](docs/COMPONENTS.md#toastprovider) | Toast notification context provider | `children` |
| [`<WireframeLoader />`](docs/COMPONENTS.md#wireframeloader) | Rotating wireframe loading indicator | `size`, `color`, `label` |
| [`<Card />`](docs/COMPONENTS.md#card) | Container card with angled cut corner | `title`, `variant`, `cutSize` |
| [`<Accordion />`](docs/COMPONENTS.md#accordion) | Expandable content sections | `multiple`, `defaultOpen` |

### Phase 4 — Chart Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| [`<BarChart />`](docs/COMPONENTS.md#barchart) | Horizontal bar chart with LCD blocks | `bars`, `title`, `color` |
| [`<Gauge />`](docs/COMPONENTS.md#gauge) | SVG radial gauge with needle | `value`, `label`, `thresholds` |
| [`<PieChart />`](docs/COMPONENTS.md#piechart) | SVG pie chart with NERV styling | `slices`, `title`, `donut` |

### Phase 5 — Video-Reference Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| [`<StatusStamp />`](docs/COMPONENTS.md#statusstamp) | Large stamp overlay (APPROVED, REJECTED) | `text`, `color`, `rotation` |
| [`<SegmentDisplay />`](docs/COMPONENTS.md#segmentdisplay) | 7-segment LED countdown/clock | `value`, `format`, `color` |
| [`<SurveillanceGrid />`](docs/COMPONENTS.md#surveillancegrid) | Multi-feed surveillance camera grid | `feeds`, `columns`, `color` |
| [`<PatternAlert />`](docs/COMPONENTS.md#patternalert) | PATTERN BLUE/ORANGE detection alert | `designation`, `pattern`, `bloodType` |
| [`<TargetingReticle />`](docs/COMPONENTS.md#targetingreticle) | Circular targeting HUD overlay | `mode`, `locked`, `coordinates` |
| [`<PilotCard />`](docs/COMPONENTS.md#pilotcard) | Pilot identification card | `designation`, `name`, `unit` |

### Phase 6 — Form & UI Primitives

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `<Checkbox />` | Brutalist checkbox `[X]` / `[ ]` | `checked`, `label`, `indeterminate` |
| `<Toggle />` | LCD ON/OFF switch | `checked`, `onChange`, `label` |
| `<Textarea />` | Terminal textarea with brackets | `label`, `color`, `error` |
| `<Tooltip />` | L-bracket tooltip panel | `content`, `side`, `delay` |
| `<Badge />` | Classification stamp tag | `variant`, `label`, `removable` |
| `<Skeleton />` | Scanline shimmer placeholder | `width`, `height`, `variant` |
| `<Breadcrumb />` | Navigation path `>>` separator | `items`, `separator`, `color` |
| `<Pagination />` | LCD page navigation | `total`, `pageSize`, `onPageChange` |
| `<RadioGroup />` | Radio buttons `(*)` / `( )` | `options`, `value`, `onChange` |
| `<Drawer />` | Slide-in sidebar panel | `open`, `onClose`, `side` |
| `<Divider />` | Section separator `── [ LABEL ] ──` | `label`, `variant`, `orientation` |

> Full API reference with all props, types, and defaults: **[docs/COMPONENTS.md](docs/COMPONENTS.md)**

---

## `> INSTALLATION`

```bash
npm install @mattloyed/eva-ui
```

**Peer dependencies:** `react`, `react-dom`, `framer-motion`. Tailwind CSS is optional.

```tsx
// Import components
import { Button, TerminalDisplay, MagiSystemPanel } from "@mattloyed/eva-ui";

// Import styles (required)
import "@mattloyed/eva-ui/styles.css";
```

If using Tailwind CSS, add the preset:

```js
// tailwind.config.js
import evaPreset from "@mattloyed/eva-ui/tailwind.preset";

export default {
  presets: [evaPreset],
  // ...
};
```

### Development / Demo site

```bash
git clone https://github.com/MattLoyeD/eva-ui.git
cd eva-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the **NERV Command Center** demo dashboard will initialize.

## `> USAGE_EXAMPLE`

```tsx
import {
  EmergencyBanner,
  TerminalDisplay,
  Button,
  MagiSystemPanel,
  CountdownTimer,
} from "@mattloyed/eva-ui";

// Full-screen emergency alert
<EmergencyBanner
  text="WARNING"
  subtext="PATTERN BLUE DETECTED"
  severity="warning"
  visible={isAlert}
/>

// Terminal with typewriter animation
<TerminalDisplay
  lines={["MAGI SYSTEM v2.11", "> Initializing...", "> CASPER online"]}
  typewriter
  color="green"
/>

// MAGI voting panel
<MagiSystemPanel
  votes={[
    { name: "MELCHIOR 1", status: "accepted" },
    { name: "BALTHASAR 2", status: "accepted" },
    { name: "CASPER 3", status: "rejected" },
  ]}
/>

// LCD countdown with expiry callback
<CountdownTimer initialSeconds={300} onExpire={() => alert("TIME UP")} />
```

---

## `> DESIGN_TOKENS`

The design system uses strict NERV-specification color tokens and typography. All tokens are defined as CSS custom properties via Tailwind CSS 4's `@theme` block.

```
COLOR             HEX        USAGE
─────────────────────────────────────────────
eva-black         #000000    Background void
eva-red           #FF0000    Emergency / alerts
eva-orange        #FF9900    Primary text & UI
eva-green         #00FF00    Terminal / grid lines
eva-cyan          #00FFFF    Data readouts
eva-magenta       #FF00FF    Waveform accents
eva-lcd-green     #39FF14    LCD displays
eva-amber         #FFAA00    Warning states
eva-purple        #9933FF    Special indicators

TYPOGRAPHY        FAMILY                         USAGE
─────────────────────────────────────────────────────────
eva-display       Oswald, Impact                 Headers & labels
eva-mono          Fira Code, JetBrains Mono      Terminal & data
eva-body          Barlow Condensed               Body text
eva-title         Noto Serif JP, Playfair         Cinematic titles
```

> Full token reference: **[docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md)**

---

## `> PROJECT_STRUCTURE`

```
src/
├── app/
│   ├── globals.css          # @theme tokens & global CRT styles
│   ├── layout.tsx           # Root layout + Google Fonts
│   ├── icon.svg             # EVA favicon
│   └── page.tsx             # NERV Command Center demo
├── components/
│   ├── EmergencyBanner/     # Alert banners
│   ├── TerminalDisplay/     # Terminal emulator
│   ├── TargetingContainer/  # L-bracket wrapper
│   ├── HexGridBackground/   # A.T. Field hexagons
│   ├── Button/              # Multi-variant button
│   ├── InputField/          # Terminal input
│   ├── SelectMenu/          # Styled dropdown
│   ├── SyncProgressBar/     # LCD progress bar
│   ├── DataGrid/            # Data surveillance table
│   ├── SystemDialog/        # Modal dialog (Portal)
│   ├── NavigationTabs/      # Classified tabs
│   ├── TitleScreen/      # Cinematic title card
│   ├── MagiSystemPanel/     # MAGI supercomputer
│   ├── SyncRatioChart/      # SVG waveform chart
│   ├── CountdownTimer/      # LCD countdown
│   ├── SeeleMonolith/       # SOUND ONLY block
│   ├── ClassifiedOverlay/   # TOP SECRET overlay
│   ├── Toast/               # Toast notification system
│   ├── WireframeLoader/     # Wireframe loading spinner
│   ├── Card/             # Container card
│   ├── Accordion/        # Expandable sections
│   ├── BarChart/         # Horizontal bar chart
│   ├── Gauge/            # Radial gauge
│   ├── PieChart/         # Pie/donut chart
│   ├── StatusStamp/      # Stamp overlay
│   ├── SegmentDisplay/      # 7-segment LED display
│   ├── SurveillanceGrid/    # Camera feed grid
│   ├── PatternAlert/        # Pattern detection alert
│   ├── TargetingReticle/    # Targeting HUD
│   ├── PilotCard/           # Pilot ID card
│   ├── Checkbox/         # Brutalist checkbox
│   ├── Toggle/           # ON/OFF switch
│   ├── Textarea/         # Terminal textarea
│   ├── Tooltip/          # L-bracket tooltip
│   ├── Badge/            # Classification tag
│   ├── Skeleton/         # Loading placeholder
│   ├── Breadcrumb/       # Navigation breadcrumb
│   ├── Pagination/       # Page navigation
│   ├── RadioGroup/       # Radio button group
│   ├── Drawer/           # Slide-in sidebar
│   ├── Divider/          # Section separator
│   └── index.ts             # Barrel exports
```

## `> TECH_STACK`

| Technology | Version | Role |
|-----------|---------|------|
| React | 19 | Functional components with Hooks |
| TypeScript | 5.8 | Strict typing for all props |
| Tailwind CSS | 4 | Utility-first + `@theme` design tokens |
| Framer Motion | 12 | Flicker, typewriter, transitions |
| Next.js | 15 | App Router, static export for GitHub Pages |

## `> ACCESSIBILITY`

All components are built with accessibility in mind:

- `prefers-reduced-motion` disables all animations and CRT scanlines
- Semantic HTML: `role="alert"`, `role="dialog"`, `role="progressbar"`, `role="tablist"`
- ARIA attributes on all interactive elements
- Full keyboard navigation support
- High contrast color palette (WCAG compliant on dark backgrounds)

## `> DEPLOYMENT`

The project auto-deploys to GitHub Pages via GitHub Actions on every push to `master`. The live demo is available at:

**[https://mattloyed.github.io/eva-ui](https://mattloyed.github.io/eva-ui)**

To build the static export locally:

```bash
npm run build    # Outputs to ./out/
```

## `> LICENSE`

MIT License. See [LICENSE](./LICENSE).

---

<p align="center">

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   GOD'S IN HIS HEAVEN. ALL'S RIGHT WITH THE WORLD │
│                                                    │
└──────────────────────────────────────────────────┘
```

</p>
