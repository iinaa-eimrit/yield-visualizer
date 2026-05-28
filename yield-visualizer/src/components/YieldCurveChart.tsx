import { useEffect, useRef } from 'react'
import { createChart, ColorType, AreaSeries } from 'lightweight-charts'
import { useYieldData } from '../hooks/useYieldData'

const maturities = ['1M', '2Y', '5Y', '10Y', '30Y']
const maturityMap: Record<string, number> = {
  '1M': 0.08,   // approx years
  '2Y': 2,
  '5Y': 5,
  '10Y': 10,
  '30Y': 30
}

export const YieldCurveChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null)
  const seriesRef = useRef<any>(null)

  const { latestData } = useYieldData()
  console.log("Rendering YieldCurveChart v2")

  useEffect(() => {
    if (!chartContainerRef.current) return
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 400,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b', // slate-500
      },
      grid: {
        vertLines: { color: '#f1f5f9' }, // slate-100
        horzLines: { color: '#f1f5f9' },
      },
      timeScale: {
        visible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      }
    })

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#3b82f6', // blue-500
      topColor: 'rgba(59, 130, 246, 0.4)',
      bottomColor: 'rgba(59, 130, 246, 0.0)',
      lineWidth: 3,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    })

    chartRef.current = chart
    seriesRef.current = areaSeries

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef.current) { return; }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ width: newRect.width, height: newRect.height });
    });

    resizeObserver.observe(chartContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [])

  useEffect(() => {
    if (!seriesRef.current || !latestData) return
    const data = maturities.map(m => ({
      time: maturityMap[m],
      value: latestData.yields[m] ?? null,
    })).filter(d => d.value != null)
    
    // Lightweight charts expects data sorted by time
    data.sort((a, b) => a.time - b.time)
    
    seriesRef.current.setData(data as any)
  }, [latestData])

  return (
    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-lg shadow-slate-200/50 w-full flex flex-col min-h-[500px]">
      <h2 className="text-lg font-bold text-slate-800 mb-4 tracking-tight">Yield Curve</h2>
      <div className="flex-1 min-h-0 relative">
        <div ref={chartContainerRef} className="absolute inset-0" />
      </div>
    </div>
  )
}
