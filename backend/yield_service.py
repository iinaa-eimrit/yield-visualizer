import asyncio
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timezone

TICKERS = {
    "1M": "^IRX",   # 13-week T-bill (proxy for 1M)
    "5Y": "^FVX",
    "10Y": "^TNX",
    "30Y": "^TYX"
}

class YieldService:
    def __init__(self):
        self.latest_data = {}
        self._fetch_task = None

    async def _fetch_latest(self):
        loop = asyncio.get_event_loop()
        # yfinance is blocking; run in executor
        data = await loop.run_in_executor(None, lambda: yf.download(list(TICKERS.values()), period="1d"))
        if data.empty:
            return
            
        # yfinance returns a MultiIndex column (e.g. ('Close', '^TNX')) when querying multiple tickers
        close_prices = data['Close'] if 'Close' in data else data
        last_row = close_prices.iloc[-1]
        
        yields = {}
        for name, ticker in TICKERS.items():
            if ticker in last_row and not pd.isna(last_row[ticker]):
                yields[name] = float(last_row[ticker])
                
        # Interpolate the missing 2-Year Yield using 3-Month (0.25yr) and 5-Year (5yr) yields
        if "1M" in yields and "5Y" in yields:
            yields["2Y"] = yields["1M"] + (yields["5Y"] - yields["1M"]) * (1.75 / 4.75)
        
        # fallback for missing yields, just mock them slightly if Yahoo finance failed entirely
        if not yields:
            yields = {"1M": 5.3, "2Y": 4.8, "5Y": 4.2, "10Y": 4.1, "30Y": 4.3}

        self.latest_data = yields

    def _add_jitter(self, yields: dict) -> dict:
        jittered = {}
        for k, v in yields.items():
            noise = np.random.normal(0, 0.005)   # 0.5 basis point stddev
            new_val = v + noise
            # ensure yield doesn't go negative (realistic lower bound 0.01)
            jittered[k] = max(new_val, 0.01)
        return jittered

    def calculate_spread(self, yields: dict) -> float:
        if "10Y" in yields and "2Y" in yields:
            return yields["10Y"] - yields["2Y"]
        return 0

    async def run(self, manager):
        # Initial fetch
        await self._fetch_latest()
        while True:
            if not self.latest_data:
                await self._fetch_latest()
            jittered = self._add_jitter(self.latest_data)
            spread = self.calculate_spread(jittered)
            payload = {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "yields": jittered,
                "spread": round(spread, 3)
            }
            await manager.broadcast(payload)
            await asyncio.sleep(2)   # push every 2 seconds
            # Re-fetch underlying data every 60 seconds
            if int(datetime.now(timezone.utc).timestamp()) % 60 < 2:
                await self._fetch_latest()
