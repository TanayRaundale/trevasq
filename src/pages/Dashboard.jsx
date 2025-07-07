import React, { useEffect, useRef, useState } from 'react';
import StockCard from '../components/StockCard';
import { fetchStock } from '../utils/fetchstock';
import Loader from '../components/Loader';
import Logo from '../components/Logo'
// Loader Component



// Logo Component (SVG)


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
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
  <svg
    className="h-20 w-20 text-blue-400 dark:text-blue-500 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15a4 4 0 01.88-7.9A5.5 5.5 0 1119 13h-1"
    />
  </svg>
  <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
    No stocks to display
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Try searching for a stock ticker (e.g., <span className="font-medium text-blue-600">AAPL</span>, <span className="font-medium text-blue-600">TSLA</span>)
  </p>
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
