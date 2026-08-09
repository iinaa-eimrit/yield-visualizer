import React from 'react'
import { cva } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
  {
    variants: {
      trend: {
        positive: 'bg-fin-green-100 text-fin-green-700',
        negative: 'bg-fin-red-100 text-fin-red-700',
        neutral: 'bg-gray-100 text-gray-600',
      },
      variant: {
        pill: 'rounded-full',
        compact: 'rounded-md px-1 text-2xs',
      },
    },
    defaultVariants: { variant: 'pill' },
  }
)

export interface TickerBadgeProps {
  symbol: string;
  changePercent: number;
  variant?: 'pill' | 'compact';
  className?: string;
}

export const TickerBadge = ({ symbol, changePercent, variant = 'pill', className }: TickerBadgeProps) => {
  const trend = changePercent > 0 ? 'positive' : changePercent < 0 ? 'negative' : 'neutral'
  const arrow = trend === 'positive' ? '↑' : trend === 'negative' ? '↓' : '→'
  const ariaLabel = `${symbol} ${trend === 'positive' ? 'increased' : trend === 'negative' ? 'decreased' : 'unchanged'} by ${Math.abs(changePercent)}%`

  return (
    <span className={`${badgeVariants({ trend, variant })} ${className || ''}`} aria-label={ariaLabel}>
      <span className="font-mono">{symbol}</span>
      <span aria-hidden="true">{arrow}</span>
      <span className="font-mono tabular-nums">{changePercent > 0 ? '+' : ''}{changePercent}%</span>
    </span>
  )
}
