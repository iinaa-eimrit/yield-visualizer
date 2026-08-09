import { useState, useEffect, useRef } from 'react'

export interface YieldPayload {
  timestamp: string;
  yields: Record<string, number>;
  spread: number;
}

export const useYieldData = () => {
  const [latestData, setLatestData] = useState<YieldPayload | null>(null)
  const [history, setHistory] = useState<YieldPayload[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Use environment variable if available, otherwise default to production Render URL
    const wsUrl = import.meta.env.VITE_WS_URL || 'wss://yield-visualizer.onrender.com/ws'
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        setLatestData(payload)
        setHistory(prev => {
          const updated = [payload, ...prev].slice(0, 20)
          return updated
        })
      } catch (e) {
        console.error('Failed to parse WS message', e)
      }
    }

    ws.onclose = () => console.log('WebSocket closed')
    ws.onerror = (err) => console.error('WebSocket error', err)

    return () => {
      ws.close()
    }
  }, [])

  return { latestData, history }
}
