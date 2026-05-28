import { FinMetric, TickerBadge } from '@amrit_16/core'
import { useYieldData } from '../hooks/useYieldData'

export const SpreadMonitor = () => {
  const { latestData } = useYieldData()
  const spread = latestData?.spread ?? 0
  const isInverted = spread < 0

  return (
    <div className={`p-5 rounded-2xl transition-all duration-300 backdrop-blur-sm border shadow-lg ${isInverted ? 'bg-red-50/80 border-red-200 shadow-red-200/50 hover:shadow-red-200/80' : 'bg-white/80 border-white/50 shadow-slate-200/50 hover:shadow-slate-300/60'}`}>
      <FinMetric
        label="10Y–2Y Spread"
        value={spread}
        trend={isInverted ? 'negative' : spread > 0 ? 'positive' : 'neutral'}
        formatter="percentage"
      />
      {isInverted && (
        <div className="mt-4 flex items-center gap-3 bg-red-100/80 p-3 rounded-xl border border-red-200">
          <TickerBadge symbol="INVERSION" changePercent={spread} variant="compact" />
          <span className="text-sm text-red-700 font-bold uppercase tracking-wide">Recession Warning</span>
        </div>
      )}
    </div>
  )
}
