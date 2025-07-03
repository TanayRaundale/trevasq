export const fetchStock = async (symbol, interval = '1min') => {
  const apiKey = 'e1d69426daa3483e92db4413c85656d5';
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=10&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return {
      name: symbol,
      ticker: symbol,
      currentPrice: parseFloat(data.values[0].close),
      priceHistory: data.values.map(val => parseFloat(val.close)).reverse(),
    };
  } catch (err) {
    console.error("Error fetching stock:", symbol, err.message);
    return null;
  }
};
