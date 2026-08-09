import React from 'react'

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  positive?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, width = 60, height = 20, positive = true }) => {
  if (!data || data.length === 0) return <svg width={width} height={height}></svg>;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = positive ? '#059669' : '#dc2626'; // fin-green-600 or fin-red-600

  return (
    <svg width={width} height={height} className="overflow-visible" aria-hidden="true">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};
