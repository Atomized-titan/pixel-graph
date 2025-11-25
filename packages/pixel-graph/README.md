# pixel-graph-react

A beautiful, customizable pixelated area chart component for React.

## Installation

```bash
npm install pixel-graph-react
```

## Usage

```tsx
import { PixelGraph } from "pixel-graph-react";

const data = [
  { name: "JAN", value1: 40, value2: 24 },
  { name: "FEB", value1: 30, value2: 13 },
  // ... more data
];

<PixelGraph data={data} />
```

## Props

- `data` - Array of data points (required)
- `color1` - First series color (default: `"#d1d5db"`)
- `color2` - Second series color (default: `"#000000"`)
- `pixelSize` - Pixel size in px (default: `4`)
- `gap` - Gap between pixels (default: `1`)

See the [main README](../../README.md) for full documentation.
