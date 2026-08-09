# FinUI Design System

FinUI is an enterprise-grade, high-density React component library built specifically for financial applications. It provides a robust, tree-shaken set of primitives optimized for displaying large amounts of real-time market data with extreme precision.

## Architecture

This project is structured as a `pnpm` monorepo with the following packages:

- **`@amrit_16/core`**: The main React component library (Ticker badges, data tables, sparklines).
- **`@amrit_16/design-tokens`**: Tailwind CSS presets that enforce our strict financial typography and spacing scales.
- **`@amrit_16/icons`**: A tree-shakeable collection of financial SVG icons.
- **`@amrit_16/storybook`**: The documentation site and playground for the components.

## Getting Started

To run the development environment locally:

```bash
# 1. Install dependencies
pnpm install

# 2. Build the workspace packages
pnpm build

# 3. Start the Storybook documentation server
pnpm dev
```

## Usage in Applications

FinUI is designed to be consumed directly in adjacent monorepo applications or published to a private registry.

```tsx
import { FinMetric, Sparkline } from '@amrit_16/core';
import '@amrit_16/core/dist/index.css';

export function Dashboard() {
  return (
    <div className="flex gap-4">
      <FinMetric 
        label="US 10Y Treasury" 
        value={4.15} 
        formatter="percentage" 
        trend="positive" 
      />
      <Sparkline 
        data={[4.10, 4.12, 4.14, 4.11, 4.15]} 
        positive={true} 
      />
    </div>
  );
}
```

## Build Tooling

- Built with **React 18** and **TypeScript**
- Compiled via **tsup** (ESM & CommonJS support)
- Styled using **Tailwind CSS**
- Documented using **Storybook 8**
