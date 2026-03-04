"use client";

import { useEffect, useState } from "react";
import MarketChart from "../components/MarketChart";
import { generateMockData, MarketDataPoint } from "../lib/mockData";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<MarketDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchData = () => {
    setLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full bg-[#1C1C1E] border border-gray-800 rounded-2xl p-6 shadow-xl">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-textSecondary text-sm font-semibold tracking-wider uppercase mb-1">
              TEMPEST I RECIPE
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-textPrimary">
                {currentPrice.toLocaleString()}
              </span>
              <span className="text-accent text-sm font-bold opacity-80">
                SEEDS
              </span>
            </div>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-textSecondary ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Chart Section */}
        <div className="bg-black/20 rounded-xl p-4 mb-4">
          {loading && data.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center">
              <span className="text-textSecondary">Loading market data...</span>
            </div>
          ) : (
            <MarketChart data={data} />
          )}
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center text-xs text-textSecondary">
          <span>Source: Metaforge API (Simulated)</span>
          <span>Updated {lastUpdated}</span>
        </div>
      </div>
    </main>
  );
}
