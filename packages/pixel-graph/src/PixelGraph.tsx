"use client";

import { useState } from "react";
import { cn } from "./utils";

export interface PixelGraphProps {
  data: Array<{
    name: string;
    value1: number;
    value2: number;
  }>;
  className?: string;
  color1?: string;
  color2?: string;
  pixelSize?: number;
  gap?: number;
}

const CustomTooltip = ({ active, payload, label, color1, color2 }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-sm">
        <p className="font-medium text-gray-500 mb-2">{label} 2025</p>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color1 }} />
          <span className="text-gray-500">New User</span>
          <span className="font-semibold">{payload[0]?.value}k</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }} />
          <span className="text-gray-500">Existing User</span>
          <span className="font-semibold">{payload[1]?.value}k</span>
        </div>
      </div>
    );
  }
  return null;
};

export function PixelGraph({ 
  data, 
  className,
  color1 = "#d1d5db",
  color2 = "#000000",
  pixelSize = 4,
  gap = 1,
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
  const maxValue = Math.max(...data.map(d => d.value1 + d.value2));
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
      
      const value1 = data[dataIndex].value1 + (data[nextIndex].value1 - data[dataIndex].value1) * smoothT;
      const value2 = data[dataIndex].value2 + (data[nextIndex].value2 - data[dataIndex].value2) * smoothT;
      
      const totalHeight = (value1 + value2) * yScale;
      const value1Height = value1 * yScale;
      
      const totalRows = Math.floor(totalHeight / pixelWithGap);
      const value1Rows = Math.floor(value1Height / pixelWithGap);
      
      for (let row = 0; row < totalRows; row++) {
        pixels.push({
          x: padding.left + col * pixelWithGap,
          y: padding.top + graphHeight - (row + 1) * pixelWithGap,
          color: row < value1Rows ? color1 : color2
        });
      }
    }
    
    return pixels;
  };

  const pixels = generateContinuousPixels();
  const xStep = graphWidth / (data.length - 1);

  return (
    <div className={cn("w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100", className)}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <span>SALES TREND</span>
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
            <h2 className="text-3xl font-bold text-gray-900">
              Total Revenue : <span className="ml-2">$20,320</span>
            </h2>
            <div className="flex gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color1 }} />
                NEW USER
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }} />
                EXISTING USER
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-full text-xs font-medium">
          {["Weekly", "Monthly", "Yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-all",
                timeRange === range
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full relative overflow-hidden bg-gray-50">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Y-axis labels */}
          {[0, 20, 40, 60, 80].map((tick) => (
            <g key={tick}>
              <text
                x={padding.left - 10}
                y={padding.top + graphHeight - (tick / 80 * graphHeight)}
                textAnchor="end"
                fontSize="12"
                fill="#9ca3af"
              >
                {tick}k
              </text>
              <line
                x1={padding.left}
                y1={padding.top + graphHeight - (tick / 80 * graphHeight)}
                x2={chartWidth - padding.right}
                y2={padding.top + graphHeight - (tick / 80 * graphHeight)}
                stroke="#e5e7eb"
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
              fill="#9ca3af"
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
                      stroke="#000"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.3"
                    />
                    <foreignObject
                      x={Math.min(x - 100, chartWidth - 220)}
                      y={padding.top - 10}
                      width="200"
                      height="100"
                    >
                      <CustomTooltip
                        active={true}
                        payload={[
                          { value: item.value1 },
                          { value: item.value2 }
                        ]}
                        label={item.name}
                        color1={color1}
                        color2={color2}
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
