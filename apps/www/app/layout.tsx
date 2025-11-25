import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pixel-graph-react - Beautiful Pixelated Charts for React",
  description: "Create stunning data visualizations with a retro pixel aesthetic. Fully customizable, lightweight, and built for React.",
  openGraph: {
    title: "pixel-graph-react - Beautiful Pixelated Charts for React",
    description: "Create stunning data visualizations with a retro pixel aesthetic. Fully customizable, lightweight, and built for React.",
    type: "website",
    siteName: "pixel-graph-react",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "pixel-graph-react - Beautiful Pixelated Charts for React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pixel-graph-react - Beautiful Pixelated Charts for React",
    description: "Create stunning data visualizations with a retro pixel aesthetic. Fully customizable, lightweight, and built for React.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
