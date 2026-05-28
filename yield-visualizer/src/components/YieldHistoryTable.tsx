import { DenseDataTable } from '@amrit_16/core'
import { useYieldData } from '../hooks/useYieldData'
import { useRef, useState, useEffect } from 'react'

export const YieldHistoryTable = () => {
  const { history } = useYieldData()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tableHeight, setTableHeight] = useState(400)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        // Subtract a tiny amount to avoid any subpixel overflow issues
        setTableHeight(Math.max(0, entry.contentRect.height - 2))
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!history || history.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-lg shadow-slate-200/50 text-center text-slate-400 h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-pulse mb-2 h-2 w-12 bg-slate-200 rounded-full"></div>
        Waiting for live tick data...
      </div>
    )
  }

  // Define columns for the DenseDataTable
  const columns = [
    { 
      accessorKey: 'time', 
      header: 'Time',
      cell: (info: any) => <span className="text-slate-500 font-mono text-xs">{info.getValue()}</span>
    },
    { 
      accessorKey: 'spread', 
      header: '10Y-2Y Spread', 
      meta: { isNumeric: true },
      cell: (info: any) => {
        const val = info.getValue()
        const colorClass = val < 0 ? 'text-red-500' : val > 0 ? 'text-emerald-500' : 'text-slate-500'
        return (
          <span className={`font-mono font-medium ${colorClass}`}>
            {val > 0 ? '+' : ''}{val.toFixed(3)}%
          </span>
        )
      }
    },
    { 
      accessorKey: 'y2', 
      header: '2Y Yield', 
      meta: { isNumeric: true },
      cell: (info: any) => <span className="font-mono text-slate-700">{info.getValue().toFixed(3)}%</span>
    },
    { 
      accessorKey: 'y10', 
      header: '10Y Yield', 
      meta: { isNumeric: true },
      cell: (info: any) => <span className="font-mono text-slate-700">{info.getValue().toFixed(3)}%</span>
    },
  ]

  // Map the raw websocket history payload to table rows
  const data = history.map(item => {
    return {
      id: item.timestamp,
      time: new Date(item.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
      spread: item.spread,
      y2: item.yields['2Y'] ?? 0,
      y10: item.yields['10Y'] ?? 0,
    }
  })

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-lg shadow-slate-200/50 flex flex-col h-[400px] min-h-0 overflow-hidden">
      <h2 className="text-lg font-bold text-slate-800 mb-3 tracking-tight">Tick History</h2>
      <div className="flex-1 min-h-0 relative" ref={containerRef}>
        <div className="absolute inset-0">
          <DenseDataTable columns={columns} data={data} height={tableHeight} />
        </div>
      </div>
    </div>
  )
}
