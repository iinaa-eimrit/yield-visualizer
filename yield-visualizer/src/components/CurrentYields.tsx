import { FinMetric, Sparkline } from '@amrit_16/core'
import { useYieldData } from '../hooks/useYieldData'

const maturities = ['1M', '2Y', '5Y', '10Y', '30Y']

export const CurrentYields = () => {
  const { latestData, history } = useYieldData()

  if (!latestData || !history) {
    return (
      <div className="w-full h-24 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg shadow-slate-200/50 flex items-center justify-center text-slate-400">
        Loading yields...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {maturities.map(maturity => {
        const yieldVal = latestData.yields[maturity]
        // Get history for this maturity
        const sparklineData = history
          .map(h => h.yields[maturity])
          .filter((v): v is number => v != null)
        
        // Determine trend based on last two points
        let trend: 'positive' | 'negative' | 'neutral' = 'neutral'
        if (sparklineData.length >= 2) {
          const last = sparklineData[sparklineData.length - 1]
          const prev = sparklineData[sparklineData.length - 2]
          trend = last > prev ? 'positive' : last < prev ? 'negative' : 'neutral'
        }

        return (
          <div key={maturity} className="relative group hover:-translate-y-1 transition-transform duration-300">
            {/* We wrap FinMetric to add the Sparkline neatly inside or alongside */}
            <div className="absolute right-4 top-4 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
               <Sparkline 
                 data={sparklineData} 
                 width={40} 
                 height={15} 
                 positive={trend === 'positive'} 
               />
            </div>
            {/* The FinMetric component has a hardcoded bg-white and border, which will render normally */}
            <div className="shadow-lg shadow-slate-200/50 rounded-lg overflow-hidden">
              <FinMetric
                label={`${maturity} Yield`}
                value={typeof yieldVal === 'number' ? Number(yieldVal.toFixed(3)) : 0}
                trend={trend}
                formatter="percentage"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
