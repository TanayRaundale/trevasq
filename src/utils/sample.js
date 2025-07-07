import yahooFinance from 'yahoo-finance2';

const quote = await yahooFinance.quote('AAPL');

console.log(quote);