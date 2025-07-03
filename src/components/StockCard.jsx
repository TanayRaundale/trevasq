import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const StockCard = ({ name, ticker, currentPrice, priceHistory }) => {
  const calculateChange = (history) => {
    const first = history[0];
    const last = history[history.length - 1];
    return ((last - first) / first) * 100;
  };

  const percentChange = calculateChange(priceHistory).toFixed(2);
  const isPositive = percentChange >= 0;
  const lineColor = isPositive ? "#22c55e" : "#ef4444";
  const bgColor = "bg-white/80 dark:bg-gray-800/80";

  return (
    <div className={`${bgColor} shadow-lg rounded-xl px-6 py-5 border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col gap-4`} style={{minWidth: 270}}>
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{name}</span>
        <span className="text-xs font-medium text-blue-400 dark:text-blue-200">{ticker}</span>
      </div>
      <div>
        <span className="text-gray-700 dark:text-gray-200 text-base">Price: <span className="font-bold">${Number(currentPrice).toFixed(2)}</span></span>
        <span className={`block mt-1 text-sm font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{percentChange}% Today
        </span>
      </div>
      <div className="h-16 flex items-center bg-gray-50 dark:bg-gray-900 rounded-md px-2 py-1">
        <Sparklines data={priceHistory} width={80} height={32} margin={4}>
          <SparklinesLine color={lineColor} style={{ strokeWidth: 2, stroke: lineColor, fill: "none", strokeLinecap: "round" }} />
          <SparklinesSpots size={3} style={{ fill: lineColor, stroke: "#fff", strokeWidth: 1 }} />
        </Sparklines>
      </div>
      <div className="flex justify-end">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
          {isPositive ? 'Bullish' : 'Bearish'}
        </span>
      </div>
    </div>
  );
};

export default StockCard;
