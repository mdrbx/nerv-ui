# Contributing to EvaUI

## Getting Started

```bash
git clone https://github.com/MattLoyeD/eva-ui.git
cd eva-ui
npm install
npm run dev        # Start docs site at localhost:3000
npm run build:lib  # Build the library to dist/
npm run test       # Run tests
npm run type-check # TypeScript check
```

## Component Structure

Each component lives in its own directory:

```
src/components/ComponentName/
├── ComponentName.tsx   # Component implementation
├── index.ts            # Barrel export
└── __tests__/
    └── ComponentName.test.tsx
```

The barrel `index.ts` re-exports everything:

```ts
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

All components are also exported from `src/components/index.ts`.

## Component Patterns

Every component **must** follow these patterns:

### 1. "use client" directive

All components are client components (they use hooks, event handlers, or framer-motion):

```tsx
"use client";
```

### 2. forwardRef + HTML attribute extension

Components must accept a `ref` and spread native HTML attributes:

```tsx
import { forwardRef, type HTMLAttributes } from "react";

export interface MyComponentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "title"> {
  // Custom props here
  color?: "orange" | "green" | "cyan";
  title?: string;
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  function MyComponent({ color = "orange", title, className = "", ...rest }, ref) {
    return (
      <div ref={ref} className={`... ${className}`} {...rest}>
        {/* content */}
      </div>
    );
  }
);
```

### 3. Exported TypeScript interface

The props interface must be exported so consumers can extend or reference it.

### 4. className prop

Every component accepts `className` for style customization.

## Design Rules

- **`border-radius: 0`** — No rounded corners, ever. Sharp industrial angles only.
- **NERV color palette** — Use the `eva-*` Tailwind tokens (`eva-orange`, `eva-green`, `eva-cyan`, `eva-red`, `eva-black`, `eva-mid-gray`, `eva-dark-gray`, `eva-white`).
- **Typography** — Use CSS custom property font families:
  - `var(--font-eva-display)` for headers/labels (Oswald)
  - `var(--font-eva-mono)` for data/terminal text (Fira Code)
  - `var(--font-eva-body)` for body text (Barlow Condensed)
  - `var(--font-eva-title)` for cinematic titles (Noto Serif JP)
- **Uppercase tracking** — Labels use `uppercase tracking-[0.15em]` or `tracking-[0.2em]`
- **Corner decorations** — Use L-bracket corner accents on cards and containers
- **Animations** — Use framer-motion. Respect `prefers-reduced-motion`.

## Adding Documentation Pages

Documentation pages use MDX and live in `src/app/docs/components/`:

1. Create `src/app/docs/components/your-component/page.mdx`
2. Import the component and create interactive examples
3. All imports in examples should use `from "@mattloyed/eva-ui"`
4. Add a link in the docs navigation

## Testing

Tests use Vitest + React Testing Library:

```bash
npm run test           # Single run
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

Mock framer-motion in test files when needed:

```tsx
vi.mock("framer-motion", () => ({
  motion: { div: "div", button: "button", span: "span" },
  AnimatePresence: ({ children }) => children,
}));
```

## Pull Request Process

1. Create a feature branch from `master`
2. Follow the component patterns above
3. Add/update tests
4. Run `npm run type-check` and `npm run test`
5. Update `docs/COMPONENTS.md` if adding a new component
6. Update `CHANGELOG.md` under `[Unreleased]`
