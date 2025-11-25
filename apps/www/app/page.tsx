"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Moon, Sun, Github, Copy, Check } from "lucide-react";

const PixelGraph = dynamic(
  () => import("pixel-graph-react").then((mod) => ({ default: mod.PixelGraph })),
  { ssr: false }
);

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

const twoSeriesConfig = [
  { key: "newUsers", label: "New Users", color: "#d1d5db" },
  { key: "existingUsers", label: "Existing Users", color: "#000000" },
];

const threeSeriesConfig = [
  { key: "newUsers", label: "New Users", color: "#93c5fd" },
  { key: "existingUsers", label: "Existing Users", color: "#3b82f6" },
  { key: "premium", label: "Premium", color: "#1e40af" },
];

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors z-10"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <pre className="bg-gray-950 text-gray-100 p-6 rounded-xl overflow-x-auto border border-gray-800">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                pixel-graph-react
              </h1>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#installation" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Installation
              </a>
              <a href="#examples" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Examples
              </a>
              <a href="#api" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                API
              </a>
              <a
                href="https://github.com/Atomized-titan/pixel-graph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-gray-900 dark:text-white" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-900" />
                )}
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              v0.1.0
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beautiful Pixelated Charts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create stunning data visualizations with a retro pixel aesthetic. Fully customizable, lightweight, and built for React.
            </p>
          </div>

          <div className="mb-8">
            <PixelGraph data={mockData} series={twoSeriesConfig} />
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="#installation"
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/Atomized-titan/pixel-graph"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Installation Section */}
        <section id="installation" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Installation</h3>
          <CodeBlock code={`npm install pixel-graph-react\n# or\nyarn add pixel-graph-react\n# or\npnpm add pixel-graph-react`} language="bash" />
        </section>

        {/* Quick Start */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Quick Start</h3>
          <CodeBlock code={`import { PixelGraph } from "pixel-graph-react";

const data = [
  { name: "JAN", newUsers: 40, existingUsers: 24 },
  { name: "FEB", newUsers: 30, existingUsers: 13 },
  // ... more data
];

const series = [
  { key: "newUsers", label: "New Users", color: "#d1d5db" },
  { key: "existingUsers", label: "Existing Users", color: "#000000" },
];

function App() {
  return <PixelGraph data={data} series={series} />;
}`} />
        </section>

        {/* Examples Section */}
        <section id="examples" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Examples</h3>
          
          <div className="space-y-16">
            {/* Two Series */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Two Data Series</h4>
              <div className="mb-6">
                <PixelGraph data={mockData} series={twoSeriesConfig} />
              </div>
              <CodeBlock code={`const series = [
  { key: "newUsers", label: "New Users", color: "#d1d5db" },
  { key: "existingUsers", label: "Existing Users", color: "#000000" },
];

<PixelGraph data={data} series={series} />`} />
            </div>

            {/* Three Series */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Three Data Series</h4>
              <div className="mb-6">
                <PixelGraph data={mockData} series={threeSeriesConfig} />
              </div>
              <CodeBlock code={`const series = [
  { key: "newUsers", label: "New Users", color: "#93c5fd" },
  { key: "existingUsers", label: "Existing Users", color: "#3b82f6" },
  { key: "premium", label: "Premium", color: "#1e40af" },
];

<PixelGraph data={data} series={series} />`} />
            </div>

            {/* Custom Pixel Size */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Custom Pixel Size & Gap</h4>
              <div className="mb-6">
                <PixelGraph 
                  data={mockData} 
                  series={twoSeriesConfig}
                  pixelSize={6}
                  gap={2}
                />
              </div>
              <CodeBlock code={`<PixelGraph 
  data={data} 
  series={series}
  pixelSize={6}
  gap={2}
/>`} />
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section id="api" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">API Reference</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Prop</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Default</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">data</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">DataPoint[]</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">required</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Array of data points</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">series</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">SeriesConfig[]</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">required</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Configuration for each data series</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">pixelSize</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">number</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">4</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Size of each pixel square (1-20)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">gap</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">number</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">1</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Gap between pixels (0-10)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">showLegend</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">true</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Show/hide legend</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">showTimeRange</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">true</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Show/hide time range selector</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">title</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">"Sales Trend"</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Chart title</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400">subtitle</td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">"Total Revenue..."</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Chart subtitle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
            <p>Built with ❤️ by Pushpal Ghoshal</p>
            <p className="mt-2 text-sm">MIT License</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
