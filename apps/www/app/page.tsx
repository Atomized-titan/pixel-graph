"use client";

import dynamic from "next/dynamic";

const PixelGraph = dynamic(
  () => import("@pixel-graph/react").then((mod) => ({ default: mod.PixelGraph })),
  { ssr: false }
);

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-8">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Pixel Graph Documentation
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Demo</h2>
        <PixelGraph data={mockData} />
        {/* <p>Graph component temporarily disabled for debugging.</p> */}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-12">
        <a
          href="https://github.com/yourusername/pixel-graph"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            GitHub{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Check out the source code.
          </p>
        </a>
      </div>
    </main>
  );
}
