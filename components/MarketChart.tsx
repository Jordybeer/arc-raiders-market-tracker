"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { MarketDataPoint } from "../lib/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MarketChartProps {
  data: MarketDataPoint[];
}

export default function MarketChart({ data }: MarketChartProps) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        type: "line" as const,
        label: "Price (Seeds)",
        data: data.map((d) => d.price),
        borderColor: "#FF9F0A",
        backgroundColor: "#FF9F0A",
        borderWidth: 2,
        tension: 0.4,
        yAxisID: "y-price",
      },
      {
        type: "bar" as const,
        label: "Volume (Trades)",
        data: data.map((d) => d.volume),
        backgroundColor: "rgba(48, 209, 88, 0.4)",
        yAxisID: "y-volume",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.15)",
        },
        ticks: {
          color: "#8E8E93",
          maxTicksLimit: 6,
        },
      },
      "y-price": {
        type: "linear" as const,
        position: "left" as const,
        grid: {
          color: "rgba(255, 255, 255, 0.15)",
        },
        ticks: {
          color: "#FF9F0A",
          callback: function (value: any) {
            return value >= 1000 ? (value / 1000).toFixed(1) + "k" : value;
          },
        },
      },
      "y-volume": {
        type: "linear" as const,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "rgba(48, 209, 88, 0.8)",
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}
