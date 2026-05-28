import { YieldCurveChart } from './components/YieldCurveChart'
import { SpreadMonitor } from './components/SpreadMonitor'
import { YieldHistoryTable } from './components/YieldHistoryTable'
import { CurrentYields } from './components/CurrentYields'
import '@amrit_16/core/dist/index.css' // Import FinUI styles

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 font-sans flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col space-y-6">
        <header className="border-b border-gray-200 pb-4 shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">US Treasury Yield Curve</h1>
            <p className="text-slate-500 mt-1 font-medium">Term structure and inversion monitoring</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase">Live</span>
          </div>
        </header>
        
        {/* New dense data panel */}
        <CurrentYields />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-4">
          <div className="lg:col-span-2 flex flex-col">
            <YieldCurveChart />
          </div>
          <div className="flex flex-col space-y-6">
            <SpreadMonitor />
            <div className="flex-1">
              <YieldHistoryTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
