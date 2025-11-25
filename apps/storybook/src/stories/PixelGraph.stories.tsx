import type { Meta, StoryObj } from "@storybook/react";
import { PixelGraph } from "@pixel-graph/react";

const meta: Meta<typeof PixelGraph> = {
  title: "Example/PixelGraph",
  component: PixelGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color1: {
      control: "color",
      description: "Color for the first data series (New Users)",
    },
    color2: {
      control: "color",
      description: "Color for the second data series (Existing Users)",
    },
    pixelSize: {
      control: { type: "range", min: 1, max: 20, step: 1 },
      description: "Size of each pixel square (1-20px)",
    },
    gap: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between pixels (0-10px)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PixelGraph>;

const mockData = [
  { name: "JAN", value1: 40, value2: 24 },
  { name: "FEB", value1: 30, value2: 13 },
  { name: "MAR", value1: 20, value2: 58 },
  { name: "APR", value1: 27, value2: 39 },
  { name: "MAY", value1: 18, value2: 48 },
  { name: "JUN", value1: 23, value2: 38 },
  { name: "JUL", value1: 34, value2: 43 },
  { name: "AUG", value1: 40, value2: 24 },
  { name: "SEP", value1: 30, value2: 13 },
  { name: "OCT", value1: 20, value2: 58 },
  { name: "NOV", value1: 27, value2: 39 },
  { name: "DEC", value1: 18, value2: 48 },
];

export const Default: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#d1d5db",
    color2: "#000000",
    pixelSize: 4,
    gap: 1,
  },
};

export const LargePixels: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#d1d5db",
    color2: "#000000",
    pixelSize: 6,
    gap: 2,
  },
};

export const ColorfulTheme: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#93c5fd",
    color2: "#3b82f6",
    pixelSize: 4,
    gap: 1,
  },
};

export const PurpleTheme: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#e9d5ff",
    color2: "#a855f7",
    pixelSize: 4,
    gap: 1,
  },
};

export const GreenTheme: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#bbf7d0",
    color2: "#22c55e",
    pixelSize: 4,
    gap: 1,
  },
};

export const TinyPixels: Story = {
  args: {
    data: mockData,
    className: "w-[1000px]",
    color1: "#fecaca",
    color2: "#ef4444",
    pixelSize: 3,
    gap: 1,
  },
};
