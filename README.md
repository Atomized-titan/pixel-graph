# @pixel-graph/react

A beautiful, customizable pixelated area chart component for React. Create stunning data visualizations with a retro pixel aesthetic.

![Pixel Graph Example](https://via.placeholder.com/800x400/f5f5f5/000000?text=Pixel+Graph+Demo)

## Features

✨ **Pixelated Aesthetic** - Unique pixel-based rendering for a retro look  
🎨 **Fully Customizable** - Control colors, pixel size, and spacing  
📊 **Stacked Data** - Display multiple data series in one chart  
🎯 **Interactive Tooltips** - Hover to see detailed information  
⚡ **Lightweight** - Pure SVG rendering, no heavy dependencies  
🔧 **TypeScript** - Full type safety out of the box  

## Installation

```bash
npm install @pixel-graph/react
# or
yarn add @pixel-graph/react
# or
pnpm add @pixel-graph/react
```

## Quick Start

```tsx
import { PixelGraph } from "@pixel-graph/react";

const data = [
  { name: "JAN", value1: 40, value2: 24 },
  { name: "FEB", value1: 30, value2: 13 },
  { name: "MAR", value1: 20, value2: 58 },
  // ... more data
];

function App() {
  return <PixelGraph data={data} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{name: string, value1: number, value2: number}>` | **Required** | Array of data points to display |
| `className` | `string` | `undefined` | Additional CSS classes |
| `color1` | `string` | `"#d1d5db"` | Color for the first data series (bottom) |
| `color2` | `string` | `"#000000"` | Color for the second data series (top) |
| `pixelSize` | `number` | `4` | Size of each pixel square (1-20) |
| `gap` | `number` | `1` | Gap between pixels (0-10) |

## Examples

### Default Theme
```tsx
<PixelGraph data={data} />
```

### Custom Colors
```tsx
<PixelGraph 
  data={data}
  color1="#93c5fd"
  color2="#3b82f6"
/>
```

### Large Pixels with Spacing
```tsx
<PixelGraph 
  data={data}
  pixelSize={6}
  gap={2}
/>
```

### Tiny Dense Pixels
```tsx
<PixelGraph 
  data={data}
  pixelSize={2}
  gap={0}
/>
```

## Styling

The component uses Tailwind CSS classes internally. Make sure you have Tailwind CSS configured in your project, or the component will use default browser styles.

### With Tailwind CSS

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@pixel-graph/react/dist/**/*.{js,mjs}",
  ],
  // ... rest of config
};
```

### Custom Styling

You can pass a `className` prop to add custom styles:

```tsx
<PixelGraph 
  data={data}
  className="shadow-xl rounded-2xl"
/>
```

## TypeScript

The package includes TypeScript definitions. Import types as needed:

```tsx
import { PixelGraph, PixelGraphProps } from "@pixel-graph/react";
```

## Next.js Usage

For Next.js App Router, use dynamic import with `ssr: false`:

```tsx
"use client";

import dynamic from "next/dynamic";

const PixelGraph = dynamic(
  () => import("@pixel-graph/react").then((mod) => ({ default: mod.PixelGraph })),
  { ssr: false }
);

export default function Page() {
  return <PixelGraph data={data} />;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

This package is part of a monorepo. To contribute:

```bash
# Clone the repository
git clone https://github.com/yourusername/pixel-graph.git

# Install dependencies
pnpm install

# Start development
pnpm dev --filter @pixel-graph/react

# Build
pnpm build --filter @pixel-graph/react
```

## License

MIT © [Your Name]

## Links

- [Documentation](https://pixel-graph-docs.vercel.app)
- [Storybook](https://pixel-graph-storybook.vercel.app)
- [GitHub](https://github.com/yourusername/pixel-graph)
- [NPM](https://www.npmjs.com/package/@pixel-graph/react)

## Support

If you like this project, please consider giving it a ⭐ on GitHub!
