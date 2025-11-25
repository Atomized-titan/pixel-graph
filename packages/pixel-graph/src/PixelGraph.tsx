"use client";

import { useState } from "react";
import { cn } from "./utils";

export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

export interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

export interface PixelGraphProps {
  data: DataPoint[];
  series: SeriesConfig[];
  className?: string;
  pixelSize?: number;
  gap?: number;
  showLegend?: boolean;
  showTimeRange?: boolean;
  title?: string;
  subtitle?: string;
}

const CustomTooltip = ({ active, payload, label, series }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-sm">
        <p className="font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const seriesConfig = series.find((s: SeriesConfig) => s.key === entry.dataKey);
          return (
            <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: seriesConfig?.color || entry.color }} 
              />
              <span className="text-gray-500 dark:text-gray-400">{seriesConfig?.label || entry.dataKey}</span>
              <span className="font-semibold dark:text-white">{entry.value}k</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export function PixelGraph({ 
  data, 
  series,
  className,
  pixelSize = 4,
  gap = 1,
  showLegend = true,
  showTimeRange = true,
  title = "Sales Trend",
  subtitle = "Total Revenue : $20,320",
}: PixelGraphProps) {
  const [timeRange, setTimeRange] = useState("Monthly");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate chart dimensions
  const chartWidth = 1000;
  const chartHeight = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => {
    return series.reduce((sum, s) => sum + (Number(d[s.key]) || 0), 0);
  }));
  const yScale = graphHeight / maxValue;

  // Generate continuous pixel pattern with better interpolation
  const generateContinuousPixels = () => {
    const pixels: Array<{ x: number; y: number; color: string }> = [];
    const pixelWithGap = pixelSize + gap;
    const pixelCols = Math.floor(graphWidth / pixelWithGap);
    
    for (let col = 0; col < pixelCols; col++) {
      const xPos = (col / pixelCols) * graphWidth;
      const progress = (xPos / graphWidth) * (data.length - 1);
      const dataIndex = Math.floor(progress);
      const nextIndex = Math.min(dataIndex + 1, data.length - 1);
      const t = progress - dataIndex;
      
      // Smooth interpolation
      const smoothT = t * t * (3 - 2 * t); // Smoothstep
      
      // Calculate interpolated values for each series
      const seriesValues = series.map(s => {
        const currentValue = Number(data[dataIndex][s.key]) || 0;
        const nextValue = Number(data[nextIndex][s.key]) || 0;
        return currentValue + (nextValue - currentValue) * smoothT;
      });
      
      // Calculate cumulative heights
      const cumulativeHeights = seriesValues.reduce((acc, val, idx) => {
        const prevHeight = idx > 0 ? acc[idx - 1] : 0;
        acc.push(prevHeight + val * yScale);
        return acc;
      }, [] as number[]);
      
      const totalHeight = cumulativeHeights[cumulativeHeights.length - 1] || 0;
      const totalRows = Math.floor(totalHeight / pixelWithGap);
      
      for (let row = 0; row < totalRows; row++) {
        const pixelHeight = row * pixelWithGap;
        
        // Determine which series this pixel belongs to
        let seriesIndex = 0;
        for (let i = 0; i < cumulativeHeights.length; i++) {
          if (pixelHeight < cumulativeHeights[i]) {
            seriesIndex = i;
            break;
          }
        }
        
        pixels.push({
          x: padding.left + col * pixelWithGap,
          y: padding.top + graphHeight - (row + 1) * pixelWithGap,
          color: series[seriesIndex]?.color || '#000000'
        });
      }
    }
    
    return pixels;
  };

  const pixels = generateContinuousPixels();
  const xStep = graphWidth / (data.length - 1);

  return (
    <div className={cn("w-full bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800", className)}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <span className="uppercase tracking-wide">{title}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="flex items-baseline gap-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {subtitle}
            </h2>
            {showLegend && (
              <div className="flex gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                {series.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="uppercase tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showTimeRange && (
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full text-xs font-medium">
            {["Weekly", "Monthly", "Yearly"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all",
                  timeRange === range
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[400px] w-full relative overflow-hidden bg-gray-50 dark:bg-gray-950/50 rounded-xl">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Y-axis labels */}
          {[0, 20, 40, 60, 80].map((tick) => (
            <g key={tick}>
              <text
                x={padding.left - 10}
                y={padding.top + graphHeight - (tick / 80 * graphHeight)}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                className="fill-gray-400 dark:fill-gray-500"
              >
                {tick}k
              </text>
              <line
                x1={padding.left}
                y1={padding.top + graphHeight - (tick / 80 * graphHeight)}
                x2={chartWidth - padding.right}
                y2={padding.top + graphHeight - (tick / 80 * graphHeight)}
                stroke="currentColor"
                className="stroke-gray-200 dark:stroke-gray-800"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Continuous pixel pattern */}
          {pixels.map((pixel, i) => (
            <rect
              key={i}
              x={pixel.x}
              y={pixel.y}
              width={pixelSize}
              height={pixelSize}
              fill={pixel.color}
            />
          ))}

          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={index}
              x={padding.left + index * xStep}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              className="fill-gray-400 dark:fill-gray-500"
            >
              {item.name}
            </text>
          ))}

          {/* Hover areas for tooltip */}
          {data.map((item, index) => {
            const x = padding.left + index * xStep;
            const hoverWidth = index < data.length - 1 ? xStep : 20;
            
            return (
              <g key={`hover-${index}`}>
                <rect
                  x={x - hoverWidth / 2}
                  y={padding.top}
                  width={hoverWidth}
                  height={graphHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'pointer' }}
                />
                
                {hoveredIndex === index && (
                  <>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + graphHeight}
                      stroke="currentColor"
                      className="stroke-gray-400 dark:stroke-gray-600"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <foreignObject
                      x={Math.min(x - 100, chartWidth - 220)}
                      y={padding.top - 10}
                      width="200"
                      height="150"
                    >
                      <CustomTooltip
                        active={true}
                        payload={series.map(s => ({
                          dataKey: s.key,
                          value: item[s.key],
                          color: s.color
                        }))}
                        label={item.name}
                        series={series}
                      />
                    </foreignObject>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
