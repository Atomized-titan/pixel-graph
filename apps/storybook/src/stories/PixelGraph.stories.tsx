import type { Meta, StoryObj } from "@storybook/react";
import { PixelGraph } from "pixel-graph-react";

const meta: Meta<typeof PixelGraph> = {
  title: "Example/PixelGraph",
  component: PixelGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pixelSize: {
      control: { type: "range", min: 1, max: 20, step: 1 },
      description: "Size of each pixel square (1-20px)",
    },
    gap: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Gap between pixels (0-10px)",
    },
    showLegend: {
      control: "boolean",
      description: "Show/hide legend",
    },
    showTimeRange: {
      control: "boolean",
      description: "Show/hide time range selector",
    },
    title: {
      control: "text",
      description: "Chart title",
    },
    subtitle: {
      control: "text",
      description: "Chart subtitle",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PixelGraph>;

const mockData = [
  { name: "JAN", newUsers: 40, existingUsers: 24, premium: 15 },
  { name: "FEB", newUsers: 30, existingUsers: 13, premium: 20 },
  { name: "MAR", newUsers: 20, existingUsers: 58, premium: 25 },
  { name: "APR", newUsers: 27, existingUsers: 39, premium: 18 },
  { name: "MAY", newUsers: 18, existingUsers: 48, premium: 22 },
  { name: "JUN", newUsers: 23, existingUsers: 38, premium: 28 },
  { name: "JUL", newUsers: 34, existingUsers: 43, premium: 30 },
  { name: "AUG", newUsers: 40, existingUsers: 24, premium: 25 },
  { name: "SEP", newUsers: 30, existingUsers: 13, premium: 20 },
  { name: "OCT", newUsers: 20, existingUsers: 58, premium: 35 },
  { name: "NOV", newUsers: 27, existingUsers: 39, premium: 28 },
  { name: "DEC", newUsers: 18, existingUsers: 48, premium: 32 },
];

export const Default: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#d1d5db" },
      { key: "existingUsers", label: "Existing Users", color: "#000000" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
  },
};

export const ThreeSeries: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#93c5fd" },
      { key: "existingUsers", label: "Existing Users", color: "#3b82f6" },
      { key: "premium", label: "Premium", color: "#1e40af" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
  },
};

export const LargePixels: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#d1d5db" },
      { key: "existingUsers", label: "Existing Users", color: "#000000" },
    ],
    className: "w-[1000px]",
    pixelSize: 8,
    gap: 2,
  },
};

export const PurpleTheme: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#e9d5ff" },
      { key: "existingUsers", label: "Existing Users", color: "#a855f7" },
      { key: "premium", label: "Premium", color: "#7c3aed" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
  },
};

export const GreenTheme: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#bbf7d0" },
      { key: "existingUsers", label: "Existing Users", color: "#22c55e" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
  },
};

export const TinyPixels: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#fecaca" },
      { key: "existingUsers", label: "Existing Users", color: "#ef4444" },
    ],
    className: "w-[1000px]",
    pixelSize: 2,
    gap: 0,
  },
};

export const NoLegend: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#93c5fd" },
      { key: "existingUsers", label: "Existing Users", color: "#3b82f6" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
    showLegend: false,
  },
};

export const CustomTitles: Story = {
  args: {
    data: mockData,
    series: [
      { key: "newUsers", label: "New Users", color: "#93c5fd" },
      { key: "existingUsers", label: "Existing Users", color: "#3b82f6" },
    ],
    className: "w-[1000px]",
    pixelSize: 4,
    gap: 1,
    title: "User Growth",
    subtitle: "Monthly Active Users: 125,430",
  },
};
