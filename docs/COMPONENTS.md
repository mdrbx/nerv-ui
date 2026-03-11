# `> COMPONENT_API_REFERENCE`

```
╔══════════════════════════════════════════════════════════╗
║  NERV TECHNICAL DOCUMENTATION — CLASSIFIED LEVEL 3      ║
║  EvaUI Component Library — Full API Reference            ║
╚══════════════════════════════════════════════════════════╝
```

All components are exported from `@/components` via barrel file. Each component is fully typed with TypeScript interfaces.

```tsx
import { EmergencyBanner, Button, MagiSystemPanel } from "@mattloyed/eva-ui";
```

---

## Phase 1 — Core Interface Elements

---

### `EmergencyBanner`

Full-screen or inline alert banner with animated hazard stripes, scanline overlay, and flickering text. Used for PATTERN BLUE detection, system failures, and general alerts.

```tsx
<EmergencyBanner
  text="EMERGENCY"
  subtext="PATTERN BLUE DETECTED — ALL PERSONNEL TO BATTLE STATIONS"
  severity="emergency"
  visible={true}
  fullScreen={false}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `"EMERGENCY"` | Main alert text displayed in flickering large type |
| `subtext` | `string` | — | Secondary message below the main text |
| `visible` | `boolean` | `true` | Controls visibility with AnimatePresence enter/exit |
| `severity` | `"emergency" \| "warning" \| "info"` | `"emergency"` | Visual severity: red, orange, or cyan |
| `fullScreen` | `boolean` | `false` | Fixed full-screen overlay vs inline container |
| `className` | `string` | `""` | Additional CSS classes |

**Severity colors:**
- `emergency` — Red background (`#FF0000`), black text
- `warning` — Orange background (`#FF9900`), black text
- `info` — Cyan background (`#00FFFF`), black text

---

### `TerminalDisplay`

Monospace terminal emulator with optional typewriter effect. Auto-scrolls to bottom. Shows a blinking cursor and optional line numbers.

```tsx
<TerminalDisplay
  lines={["MAGI SYSTEM v2.11", "> Boot sequence initiated", "> All systems nominal"]}
  typewriter
  typeSpeed={30}
  color="green"
  title="TERMINAL — MAGI DIRECT"
  showLineNumbers
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `string[]` | **required** | Array of text lines to display |
| `typewriter` | `boolean` | `false` | Enable character-by-character typing animation |
| `typeSpeed` | `number` | `30` | Milliseconds per character (typewriter mode) |
| `lineDelay` | `number` | `200` | Milliseconds between lines (typewriter mode) |
| `color` | `"green" \| "orange" \| "cyan" \| "red"` | `"green"` | Terminal text color |
| `showCursor` | `boolean` | `true` | Show blinking block cursor |
| `title` | `string` | — | Title bar text |
| `maxHeight` | `string` | `"400px"` | Max container height |
| `showLineNumbers` | `boolean` | `false` | Show line number gutter |
| `prompt` | `string` | — | Prompt prefix for each line |
| `className` | `string` | `""` | Additional CSS classes |

---

### `TargetingContainer`

Wrapper component with corner L-brackets and optional crosshair grid background. Gives any content a targeting reticle aesthetic.

```tsx
<TargetingContainer label="TARGET-A" color="orange" bracketSize={24}>
  <YourContent />
</TargetingContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Content to wrap |
| `label` | `string` | — | Label text above the container |
| `showCrosshairs` | `boolean` | `true` | Show center crosshair lines |
| `color` | `"orange" \| "green" \| "cyan" \| "red"` | `"orange"` | Bracket and crosshair color |
| `bracketSize` | `number` | `24` | Corner bracket size in pixels |
| `className` | `string` | `""` | Additional CSS classes |

---

### `HexGridBackground`

SVG-based honeycomb hexagon grid pattern. Positioned absolute to fill its parent. Used to simulate A.T. Field visual patterns.

```tsx
<div className="relative h-64">
  <HexGridBackground color="#FF9900" opacity={0.08} hexSize={30} animated />
  <YourContent />
</div>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `"#FF9900"` | Hex color for the grid strokes |
| `opacity` | `number` | `0.08` | Grid opacity (0-1) |
| `hexSize` | `number` | `30` | Individual hexagon size in pixels |
| `animated` | `boolean` | `true` | Enable pulse animation |
| `className` | `string` | `""` | Additional CSS classes |

---

### `Button`

Multi-variant industrial button with corner decorations, loading state animation, and hover color inversion.

```tsx
<Button variant="danger" size="lg" onClick={handleClick}>
  INITIATE OVERRIDE
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "danger" \| "ghost" \| "terminal"` | `"primary"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `loading` | `boolean` | `false` | Show loading dots animation |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `disabled` | `boolean` | — | Disabled state (reduced opacity) |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type |
| `onClick` | `MouseEventHandler` | — | Click handler |
| `className` | `string` | `""` | Additional CSS classes |

**Variants:**
- `primary` — Orange border, orange text, inverts on hover
- `danger` — Red border, red text, fills red on hover
- `ghost` — Transparent with subtle border
- `terminal` — Green monospace terminal style

---

### `InputField`

Terminal-style text input with animated bracket decorators `[ ]` on focus. Shows error/hint text below. Extends all standard `<input>` HTML attributes.

```tsx
<InputField
  label="OPERATOR ID"
  placeholder="Enter ID..."
  color="orange"
  error="INVALID CREDENTIALS"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label with `//` prefix |
| `color` | `"orange" \| "green" \| "cyan"` | `"orange"` | Input color theme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `error` | `string` | — | Error message (red) |
| `hint` | `string` | — | Hint text (muted) |
| `wrapperClassName` | `string` | `""` | Wrapper element classes |
| `...rest` | `InputHTMLAttributes` | — | All standard input props |

---

### `SelectMenu`

Styled dropdown with angle brackets `< >` on focus. Custom arrow indicator. Extends standard `<select>` attributes.

```tsx
<SelectMenu
  label="PRIORITY LEVEL"
  options={[
    { value: "alpha", label: "ALPHA" },
    { value: "beta", label: "BETA" },
    { value: "omega", label: "OMEGA", disabled: true },
  ]}
  color="cyan"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectMenuOption[]` | **required** | Array of `{ value, label, disabled? }` |
| `label` | `string` | — | Label text |
| `color` | `"orange" \| "green" \| "cyan"` | `"orange"` | Color theme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Select size |
| `placeholder` | `string` | `"SELECT..."` | Default placeholder text |
| `error` | `string` | — | Error message |
| `wrapperClassName` | `string` | `""` | Wrapper element classes |

---

### `SyncProgressBar`

Block-based LCD progress bar with dynamic color thresholds. Blocks fill left-to-right with color transitions based on value.

```tsx
<SyncProgressBar value={78.5} label="SYNC RATE" blocks={20} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Progress value (0-100) |
| `label` | `string` | — | Label text |
| `showPercentage` | `boolean` | `true` | Show percentage readout |
| `blocks` | `number` | `20` | Number of LCD blocks |
| `blockHeight` | `number` | `16` | Block height in pixels |
| `className` | `string` | `""` | Additional CSS classes |

**Color thresholds:** `0-50%` cyan, `50-80%` green, `80-95%` orange, `95%+` red (blinking)

---

### `DataGrid`

Surveillance-style data table with sticky header, auto-scroll, and motion-animated row entry. Pauses auto-scroll on hover.

```tsx
<DataGrid
  columns={[
    { key: "id", header: "ID", width: "80px" },
    { key: "status", header: "STATUS", align: "center" },
  ]}
  data={[
    { id: "EVA-00", status: "ACTIVE" },
    { id: "EVA-01", status: "STANDBY" },
  ]}
  color="green"
  autoScroll
  title="UNIT REGISTRY"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataGridColumn[]` | **required** | `{ key, header, width?, align? }` |
| `data` | `Record<string, string \| number>[]` | **required** | Row data array |
| `color` | `"orange" \| "green" \| "cyan"` | `"green"` | Table color theme |
| `autoScroll` | `boolean` | `false` | Enable continuous scroll |
| `scrollSpeed` | `number` | `30` | Scroll speed (px/sec) |
| `maxHeight` | `string` | `"400px"` | Container max height |
| `title` | `string` | — | Title bar text |
| `showIndex` | `boolean` | `false` | Show row index column |
| `className` | `string` | `""` | Additional CSS classes |

---

### `SystemDialog`

Modal dialog with hex grid background overlay. Severity levels add red borders, blinking icons, and hazard stripes.

```tsx
<SystemDialog
  open={showDialog}
  title="OVERRIDE CONFIRMATION"
  severity="critical"
  acceptText="CONFIRM"
  declineText="ABORT"
  onAccept={handleAccept}
  onDecline={handleDecline}
  onClose={handleClose}
>
  <p>Proceed with Unit-01 activation sequence?</p>
</SystemDialog>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Dialog visibility |
| `title` | `string` | `"SYSTEM NOTIFICATION"` | Dialog title |
| `children` | `ReactNode` | — | Dialog body content |
| `severity` | `"normal" \| "warning" \| "critical"` | `"normal"` | Visual severity level |
| `acceptText` | `string` | `"ACCEPT"` | Accept button label |
| `declineText` | `string` | `"DECLINE"` | Decline button label |
| `onAccept` | `() => void` | — | Accept callback |
| `onDecline` | `() => void` | — | Decline callback |
| `onClose` | `() => void` | — | Overlay click callback |
| `showHazardStripes` | `boolean` | — | Force hazard stripe border |
| `className` | `string` | `""` | Additional CSS classes |

---

### `NavigationTabs`

Military-classified folder tabs with animated indicator bar. Supports horizontal and vertical orientations. Numbered badges.

```tsx
<NavigationTabs
  tabs={[
    { id: "ops", label: "OPERATIONS" },
    { id: "intel", label: "INTELLIGENCE" },
    { id: "magi", label: "MAGI SYSTEM", icon: "◆" },
  ]}
  activeTab="ops"
  onTabChange={setActiveTab}
  direction="horizontal"
  color="orange"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `NavigationTab[]` | **required** | `{ id, label, icon?, disabled? }` |
| `activeTab` | `string` | **required** | Currently active tab ID |
| `onTabChange` | `(tabId: string) => void` | **required** | Tab change callback |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab layout direction |
| `color` | `"orange" \| "green" \| "cyan"` | `"orange"` | Color theme |
| `className` | `string` | `""` | Additional CSS classes |

---

## Phase 2 — Advanced Systems

---

### `EvaTitleScreen`

Cinematic title card with serif typography and staggered motion animation. Three alignment modes for different visual effects.

```tsx
<EvaTitleScreen
  title="NEON GENESIS EVANGELION"
  subtitle="Episode 01 — Angel Attack"
  align="split"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main title text |
| `subtitle` | `string` | — | Subtitle text |
| `align` | `"center" \| "split" \| "random"` | `"center"` | Layout mode |
| `className` | `string` | `""` | Additional CSS classes |

**Alignment modes:**
- `center` — Title and subtitle stacked vertically, centered
- `split` — Title top-left, subtitle bottom-right (cinematic split)
- `random` — Characters scattered with deterministic offsets

---

### `MagiSystemPanel`

Three-column MAGI supercomputer voting panel. Each column represents a MAGI brain with independent status states.

```tsx
<MagiSystemPanel
  votes={[
    { name: "MELCHIOR 1", status: "accepted" },
    { name: "BALTHASAR 2", status: "computing" },
    { name: "CASPER 3", status: "rejected" },
  ]}
  title="MAGI SUPER COMPUTER SYSTEM"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `votes` | `MagiVote[]` | **required** | Array of `{ name, status }` |
| `title` | `string` | `"MAGI SUPER COMPUTER SYSTEM"` | Panel title |
| `className` | `string` | `""` | Additional CSS classes |

**Types:**
```typescript
type MagiStatus = "idle" | "computing" | "accepted" | "rejected";
interface MagiVote { name: string; status: MagiStatus; }
```

**Status visuals:**
- `idle` — Gray, "STANDBY" text
- `computing` — Scrolling hex code data with cyan scanning bar
- `accepted` — Orange filled background with "ACCEPTED"
- `rejected` — Red filled background with blinking "REJECTED"

---

### `SyncRatioChart`

Pure SVG dual sinusoidal waveform chart. No external charting libraries. Uses a precise `generateSineWavePath` function with 100 sample points.

```tsx
<SyncRatioChart
  frequencyA={0.04}
  frequencyB={0.055}
  amplitudeA={50}
  amplitudeB={40}
  phaseA={0}
  phaseB={1.2}
  showGrid
  animated
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frequencyA` | `number` | `0.04` | Wave A frequency |
| `frequencyB` | `number` | `0.055` | Wave B frequency |
| `amplitudeA` | `number` | `50` | Wave A amplitude (px) |
| `amplitudeB` | `number` | `40` | Wave B amplitude (px) |
| `phaseA` | `number` | `0` | Wave A phase offset (radians) |
| `phaseB` | `number` | `1.2` | Wave B phase offset (radians) |
| `showGrid` | `boolean` | `true` | Show green grid background |
| `title` | `string` | — | Chart title |
| `animated` | `boolean` | `true` | Animate path drawing on mount |
| `className` | `string` | `""` | Additional CSS classes |

**Waveform math:** `y = centerY + amplitude * Math.sin(x * frequency + phase)`

**Colors:** Wave A = cyan (`#00FFFF`), Wave B = magenta (`#FF00FF`)

---

### `CountdownTimer`

LCD-style countdown timer with MM:SS:ms format, battery bar visualization, and urgency color transitions.

```tsx
<CountdownTimer
  initialSeconds={300}
  onExpire={() => console.log("TIMER EXPIRED")}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSeconds` | `number` | **required** | Starting countdown value in seconds |
| `onExpire` | `() => void` | — | Callback when timer reaches zero |
| `className` | `string` | `""` | Additional CSS classes |

**Color transitions:** `>60s` LCD green, `10-60s` orange, `<10s` red with blink
**Battery bar:** 20 segments, color shifts at 75% and 25% thresholds

---

### `SeeleMonolith`

SOUND ONLY monolith block representing a SEELE committee member. Shows animated equalizer bars when speaking.

```tsx
<SeeleMonolith id="01" isSpeaking />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Monolith identifier (e.g. `"01"`) |
| `isSpeaking` | `boolean` | `false` | Show equalizer animation |
| `className` | `string` | `""` | Additional CSS classes |

---

### `ClassifiedOverlay`

TOP SECRET overlay with diagonal hazard stripes. Slides away violently when unlocked to reveal children content beneath.

```tsx
<ClassifiedOverlay text="TOP SECRET" isUnlocked={false}>
  <SecretContent />
</ClassifiedOverlay>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `"CLASSIFIED"` | Overlay text |
| `isUnlocked` | `boolean` | `false` | When true, overlay slides away |
| `children` | `ReactNode` | — | Content revealed when unlocked |
| `className` | `string` | `""` | Additional CSS classes |

**Exit animation:** Slides upward (`y: "-100%"`) over 0.2s with `easeIn`

---

## `> EXPORTED_TYPES`

All types are exported from the barrel file:

```tsx
import type {
  EmergencyBannerProps,
  TerminalDisplayProps,
  TargetingContainerProps,
  HexGridBackgroundProps,
  ButtonProps,
  InputFieldProps,
  SelectMenuProps,
  SelectMenuOption,
  SyncProgressBarProps,
  DataGridProps,
  DataGridColumn,
  SystemDialogProps,
  NavigationTabsProps,
  NavigationTab,
  EvaTitleScreenProps,
  MagiSystemPanelProps,
  MagiVote,
  MagiStatus,
  SyncRatioChartProps,
  CountdownTimerProps,
  SeeleMonolithProps,
  ClassifiedOverlayProps,
} from "@mattloyed/eva-ui";
```
