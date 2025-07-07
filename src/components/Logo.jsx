import React from 'react'

const Logo = () => 
    {
        return (
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
    };
export default Logo