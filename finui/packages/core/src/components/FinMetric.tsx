import React from 'react'

export interface FinMetricProps {
  label: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  formatter?: 'currency' | 'percentage' | 'bps';
  loading?: boolean;
  error?: string;
}

const formatValue = (val: string | number, formatter: FinMetricProps['formatter']) => {
  const num = Number(val);
  if (isNaN(num)) return val;
  if (formatter === 'currency') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  if (formatter === 'percentage') return `${val}%`;
  if (formatter === 'bps') return `${val} bps`;
  return val;
};

export const FinMetric = ({ label, value, trend, formatter = 'percentage', loading, error }: FinMetricProps) => {
  if (loading) return <div className="h-20 w-full animate-pulse bg-gray-200 rounded-lg" />
  if (error) return <div className="border border-red-500 p-2 text-red-600 rounded-lg">{error}</div>

  const formattedValue = formatValue(value, formatter)

  return (
    <div className="flex flex-col border border-gray-200 bg-white p-4 rounded-lg shadow-sm">
      <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-2xl font-mono font-bold tabular-nums">{formattedValue}</span>
        {trend && (
          <span className={trend === 'positive' ? 'text-fin-green-600' : trend === 'negative' ? 'text-fin-red-600' : 'text-gray-400'}>
            {trend === 'positive' ? '▲' : trend === 'negative' ? '▼' : '●'}
          </span>
        )}
      </div>
    </div>
  )
}
