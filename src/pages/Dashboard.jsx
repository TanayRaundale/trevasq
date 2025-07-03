import React, { useEffect, useRef, useState } from 'react';
import StockCard from '../components/StockCard';
import { fetchStock } from '../utils/fetchstock';

// Loader Component
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span className="text-lg text-blue-600 font-semibold tracking-wide">Loading stocks...</span>
  </div>
);

// Logo Component (SVG)
const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="24" width="8" height="20" rx="2" fill="#2563eb"/>
      <rect x="16" y="16" width="8" height="28" rx="2" fill="#38bdf8"/>
      <rect x="28" y="8" width="8" height="36" rx="2" fill="#fbbf24"/>
      <rect x="40" y="2" width="8" height="42" rx="2" fill="#22c55e"/>
    </svg>
    <span className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-400 to-yellow-400 bg-clip-text text-transparent tracking-tight">
     S&amp;P 500
    </span>
  </div>
);

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [tickers, setTickers] = useState(['AAPL', 'TSLA']);
  const tickersRef = useRef(['AAPL', 'TSLA']);
  const [searchInput, setSearchInput] = useState('');
  const [sortMode, setSortMode] = useState('default');
  const [interval, setIntervalOption] = useState('1min');
  
  const [loading, setLoading] = useState(false);



  const fetchData = async () => {
    setLoading(true);
    const results = await Promise.all(
      tickersRef.current.map(symbol => fetchStock(symbol, interval))
    );
    const validStocks = results.filter(stock => stock !== null);
    setStocks(() => {
      return validStocks.map(newStock => ({
        ...newStock,
        priceHistory: newStock.priceHistory,
      }));
    });
    setLoading(false);
  };

  useEffect(() => {
    setStocks([]);
    fetchData();
    if (interval === '1day') return;
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);

  }, [interval]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput) return;
    const upper = searchInput.toUpperCase();
    setLoading(true);
    const stock = await fetchStock(upper, interval);
    if (stock) {
      setStocks(prev => {
        const exists = prev.find(s => s.ticker === upper);
        if (exists) return prev;
        return [...prev, stock];
      });
      setTickers(prev => {
        if (prev.includes(upper)) return prev;
        const updated = [...prev, upper];
        tickersRef.current = updated;
        return updated;
      });
    }
    setSearchInput('');
    setLoading(false);
  };

  const calculateChange = (history) => {
    const first = history[0];
    const last = history[history.length - 1];
    return ((last - first) / first) * 100;
  };

  let sortedStocks = [...stocks];
  if (sortMode === 'gainers') {
    sortedStocks.sort((a, b) => calculateChange(b.priceHistory) - calculateChange(a.priceHistory));
  } else if (sortMode === 'losers') {
    sortedStocks.sort((a, b) => calculateChange(a.priceHistory) - calculateChange(b.priceHistory));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        <Logo />
    
          
  
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mb-8 gap-2">
          <input
            type="text"
            placeholder="Search stock (e.g., NFLX)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-5 py-3 rounded-l-lg w-72 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none shadow"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition font-semibold shadow"
          >
            🔍 Search
          </button>
        </form>

        {/* Sort & Interval Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex gap-2 bg-blue-50 dark:bg-blue-900 rounded-lg px-4 py-2 shadow-inner">
            {['gainers', 'losers', 'default'].map(mode => (
              <button
                key={mode}
                onClick={() => setSortMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg hover:scale-105 duration-200 ${
                  sortMode === mode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white'
                    : 'bg-blue-200 dark:bg-blue-700 text-gray-900 dark:text-white'
                }`}
              >
                {mode === 'gainers' ? '🔼 Gainers' : mode === 'losers' ? '🔽 Losers' : '🔁 Default'}
              </button>
            ))}
          </div>

          <div className="flex gap-2 bg-yellow-50 dark:bg-yellow-900 rounded-lg px-4 py-2 shadow-inner">
            {['1min', '5min', '1day'].map(opt => (
              <button
                key={opt}
                onClick={() => setIntervalOption(opt)}
                className={`px-4 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg hover:scale-105 duration-200 ${
                  interval === opt
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                    : 'bg-yellow-200 dark:bg-yellow-700 text-gray-900 dark:text-white'
                }`}
              >
                ⏱ {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Cards or Loader */}
        {loading ? (
          <Loader />
        ) : sortedStocks.length === 0 ? (
          <div className="flex flex-col items-center mt-16">
            <svg className="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 01.88-7.9A5.5 5.5 0 1119 13h-1" />
            </svg>
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg">No stocks to display. Try searching for a ticker.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStocks.map((stock, index) => (
              <StockCard
                key={index}
                name={stock.name}
                ticker={stock.ticker}
                currentPrice={stock.currentPrice}
                priceHistory={stock.priceHistory}
              />
            ))}
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} 500 S&amp;P Dashboard. Powered by Twelve Data API.
      </footer>
    </div>
  );
};

export default Dashboard;
