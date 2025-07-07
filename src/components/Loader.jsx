import React from 'react'

const Loader = () => 
{
    return(
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-blue-400 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      <div className="absolute inset-2 rounded-full bg-blue-500"></div>
    </div>
    <p className="text-lg font-semibold tracking-wide text-blue-600 animate-pulse">
      Fetching real-time stock data...
    </p>
  </div>
);
};
export default Loader
