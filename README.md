<p align="center">
  <img src="https://img.shields.io/badge/NERV-HEADQUARTERS-FF0000?style=for-the-badge&labelColor=000000" alt="NERV HQ" />
  <img src="https://img.shields.io/badge/MAGI_SYSTEM-ONLINE-00FF00?style=for-the-badge&labelColor=000000" alt="MAGI Online" />
  <img src="https://img.shields.io/badge/A.T._FIELD-DEPLOYED-00FFFF?style=for-the-badge&labelColor=000000" alt="A.T. Field" />
</p>

<p align="center">
  <img src="banner.png" alt="NERV-UI — Neon Genesis Evangelion Design System" width="100%" />
</p>

<p align="center">
  <strong>Brutalist. Industrial. Zero border-radius. Maximum impact.</strong><br/>
  <sub>A React component library that faithfully recreates the NERV headquarters interfaces from Neon Genesis Evangelion.</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mdrbx/nerv-ui"><img src="https://img.shields.io/npm/v/@mdrbx/nerv-ui?style=flat-square&color=FF9900&labelColor=000000" alt="npm version" /></a>
  <img src="https://img.shields.io/badge/components-48-00FF00?style=flat-square&labelColor=000000" />
  <img src="https://img.shields.io/badge/examples-17_pages-00FFFF?style=flat-square&labelColor=000000" />
  <img src="https://img.shields.io/badge/border--radius-0px-FF0000?style=flat-square&labelColor=000000" />
  <img src="https://img.shields.io/badge/license-MIT-FF9900?style=flat-square&labelColor=000000" />
</p>

<p align="center">
  <a href="https://mdrbx.github.io/nerv-ui/docs"><img src="https://img.shields.io/badge/DOCUMENTATION-FF9900?style=for-the-badge&labelColor=000000" alt="Documentation" /></a>
  &nbsp;
  <a href="https://mdrbx.github.io/nerv-ui/examples"><img src="https://img.shields.io/badge/LIVE_EXAMPLES-00FFFF?style=for-the-badge&labelColor=000000" alt="Live Examples" /></a>
</p>

---

## `> QUICK_START`

```bash
npm install @mdrbx/nerv-ui
```

```tsx
import { Button, TerminalDisplay, Gauge } from "@mdrbx/nerv-ui";
import "@mdrbx/nerv-ui/styles.css";

export default function App() {
  return (
    <div className="bg-black min-h-screen p-8">
      <TerminalDisplay
        lines={[
          "MAGI SYSTEM v2.11",
          "> Initializing...",
          "> All systems online",
        ]}
        typewriter
        color="green"
      />
      <Gauge value={73} label="SYNC RATE" color="cyan" />
      <Button variant="danger" size="lg">
        INITIATE OVERRIDE
      </Button>
    </div>
  );
}
```

**Peer dependencies:** `react`, `react-dom`, `framer-motion`. Tailwind CSS is optional.

<details>
<summary>Install from GitHub Packages</summary>

```bash
# .npmrc
@mdrbx:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

npm install @mdrbx/nerv-ui
```

The repository now ships a release workflow that publishes the package to both
the public npm registry and GitHub Packages.

</details>

<details>
<summary>Tailwind CSS preset (optional)</summary>

```js
// tailwind.config.js
import nervPreset from "@mdrbx/nerv-ui/tailwind.preset";

export default {
  presets: [nervPreset],
};
```

</details>

---

## `> WHAT_IS_NERV_UI`

NERV-UI is a **48-component React design system** published on npm, built to replicate the iconic CRT-era military interfaces of NERV headquarters. Every pixel follows strict brutalist design rules:

- **`border-radius: 0`** everywhere — sharp industrial angles only
- **NERV color palette** — black void, alert red, text orange, grid green, data cyan, magenta wave
- **Condensed uppercase typography** — Oswald, Barlow Condensed, Noto Serif JP
- **Monospace terminal text** — Fira Code for all data readouts
- **EVA title-card compositions** — staged 4:3 layouts for ceremonial episode/finale screens
- **CRT scanline overlay** — persistent retro phosphor effect
- **Monitor overlays and targeting rails** — MAGI/NERV-inspired screen framing for dashboards, dialogs, and launch decks
- **Animated hazard chevrons** — V-shaped stripe patterns for danger states
- **Interactive chart surfaces** — hover-reactive bars, slices, gauges, and status bands with tactical tooltip overlays
- **`prefers-reduced-motion`** — all animations respect accessibility settings

---

## `> COMPONENTS`

**48 components** across 7 categories. Full API reference in the [documentation](https://mdrbx.github.io/nerv-ui/docs).

| Category           | Components                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Layout**         | `TargetingContainer`, `HexGridBackground`, `MonitorOverlay`, `Card`, `Accordion`, `Divider`, `Drawer`, `Breadcrumb`                               |
| **Forms**          | `Button`, `InputField`, `SelectMenu`, `Checkbox`, `Toggle`, `Textarea`, `RadioGroup`, `FileUpload`                                               |
| **Data Display**   | `TerminalDisplay`, `DataGrid`, `SyncProgressBar`, `SegmentDisplay`, `Badge`, `Skeleton`, `PilotCard`, `Pagination`                               |
| **Charts**         | `BarChart`, `Gauge`, `PieChart`, `SyncRatioChart`, `PhaseStatusStack`, `GradientStatusBar`                                                       |
| **Overlays**       | `SystemDialog`, `ClassifiedOverlay`, `TitleScreen`, `NervToastProvider`, `StatusStamp`, `Tooltip`, `DropdownMenu`                                |
| **Navigation**     | `NavigationTabs`, `EmergencyBanner`, `Stepper`                                                                                                   |
| **HUD / Military** | `TargetingReticle`, `SurveillanceGrid`, `PatternAlert`, `MagiSystemPanel`, `SeeleMonolith`, `CountdownTimer`, `WireframeLoader`, `ThemeProvider` |

> **[Browse all components →](https://mdrbx.github.io/nerv-ui/docs)**

---

## `> EXAMPLE_PAGES`

**17 production-ready example pages** showcasing real-world usage patterns. All responsive.

| Page                                                                           | Description                               |
| ------------------------------------------------------------------------------ | ----------------------------------------- |
| [**Command Center**](https://mdrbx.github.io/nerv-ui/)                          | NERV HQ main dashboard with live data     |
| [**Operations Dashboard**](https://mdrbx.github.io/nerv-ui/examples/dashboard)  | KPI cards, charts, gauges, operations log |
| [**Comms Terminal**](https://mdrbx.github.io/nerv-ui/examples/comms)            | Military chat interface with channels     |
| [**Dispatch Form**](https://mdrbx.github.io/nerv-ui/examples/form)              | Multi-field form with validation          |
| [**Intelligence Bulletin**](https://mdrbx.github.io/nerv-ui/examples/blog)      | Classified content feed with filtering    |
| [**Monitoring Station**](https://mdrbx.github.io/nerv-ui/examples/realtime)     | Real-time sensor data & charts            |
| [**Equipment Requisition**](https://mdrbx.github.io/nerv-ui/examples/inventory) | CRUD inventory management                 |
| [**Pilot Dossier**](https://mdrbx.github.io/nerv-ui/examples/pilots)            | Personnel profiles with sync history      |
| [**Mission Report**](https://mdrbx.github.io/nerv-ui/examples/report)           | After-action document template            |
| [**MAGI File System**](https://mdrbx.github.io/nerv-ui/examples/files)          | File browser with tree navigation         |
| [**SaaS Landing**](https://mdrbx.github.io/nerv-ui/examples/saas)               | Marketing page with pricing               |
| [**Library Landing**](https://mdrbx.github.io/nerv-ui/examples/landing)         | NERV-UI showcase page                       |
| [**Ceremonial Splash**](https://mdrbx.github.io/nerv-ui/examples/splash)        | Full-page EVA title-card splash screen    |
| [**Login**](https://mdrbx.github.io/nerv-ui/examples/auth/login)                | Authentication terminal                   |
| [**Register**](https://mdrbx.github.io/nerv-ui/examples/auth/register)          | Personnel registration                    |
| [**Help Center**](https://mdrbx.github.io/nerv-ui/examples/help)                | FAQ with knowledge base                   |
| [**Error 404**](https://mdrbx.github.io/nerv-ui/examples/error)                 | Signal lost page                          |

> **[Explore all examples →](https://mdrbx.github.io/nerv-ui/examples)**

---

## `> DESIGN_TOKENS`

```
COLOR             HEX        USAGE
─────────────────────────────────────────────
nerv-black         #000000    Background void
nerv-red           #FF0000    Emergency / alerts
nerv-orange        #FF9900    Primary text & UI
nerv-green         #00FF00    Terminal / grid lines
nerv-cyan          #00FFFF    Data readouts
nerv-magenta       #FF00FF    Waveform accents
nerv-lcd-green     #39FF14    LCD displays
nerv-amber         #FFAA00    Warning states
nerv-purple        #9933FF    Special indicators

TYPOGRAPHY        FAMILY                         USAGE
─────────────────────────────────────────────────────────
nerv-display       Oswald, Impact                 Headers & labels
nerv-mono          Fira Code, JetBrains Mono      Terminal & data
nerv-body          Barlow Condensed               Body text
nerv-title         Noto Serif JP, Playfair         Cinematic titles
```

---

## `> TECH_STACK`

| Technology    | Version | Role                              |
| ------------- | ------- | --------------------------------- |
| React         | 19      | Functional components with Hooks  |
| TypeScript    | 5.8     | Strict typing, all props exported |
| Tailwind CSS  | 4       | `@theme` design tokens            |
| Framer Motion | 12      | Animations & transitions          |

---

## `> CONTRIBUTING`

```bash
git clone https://github.com/mdrbx/nerv-ui.git
cd nerv-ui
npm install
npm run dev         # Dev server at localhost:3000
npm run build:lib   # Build the npm package
npm run test        # Run tests
npm run type-check  # TypeScript check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for component patterns and design rules.

---

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

<p align="center">
  <sub>MADE WITH [REDACTED] BY <a href="https://github.com/mdrbx">mdrbx</a></sub>
</p>
