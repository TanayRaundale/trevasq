TravasQ Stock Dashboard

A sleek, real-time stock tracking dashboard built with React, Vite, TailwindCSS, and powered by the TwelveData API.

This project was created as part of a frontend task for TravasQ to showcase state management, live data handling, component design, and API integration.

Live Demo:
Deployed on Vercel: https://trevasq.vercel.app

Features:
- Real-time stock updates every 10 seconds (free-tier safe)
- Sort by top gainers or losers
- Dark mode based on system 
- Search bar to add tickers dynamically
- Historical price chart using sparklines
- Responsive, fast, and mobile-friendly UI
- Fallback to mock data when API rate limit hits

Tech Stack:
- Frontend: React + Vite
- Styling: TailwindCSS (dark mode enabled)
- Charts: react-sparklines
- API: TwelveData (Free tier)
- Deployment: Vercel

Setup Instructions:

1. Clone the repo
   git clone https://github.com/TanayRaundale/trevasq.git
   cd trevasq

2. Install dependencies
   npm install

3. Get your VITE_API_KEY=your_twelvedata_api_key_here

4. Run the app locally
   npm run dev

Data Handling Strategy:

The app pulls real-time data using TwelveData’s free-tier API:
- The fetchStock() function gets the latest price and historical values.
- A background interval refreshes selected tickers every 10 seconds.
- Each ticker's priceHistory is preserved using previous state and updated seamlessly.
- API limits are handled by:
  - Limiting to 8 tickers
  - Delaying refreshes (interval)
  - Graceful fallback to static mock data

Note: If the API limit is hit, the dashboard temporarily switches to cached/mock data for uninterrupted UX.

Screenshots:
(Optional: Include screenshots of dark mode, charts, mobile view)

Contributing / Feedback:
This project was built under constraints — suggestions, forks, or contributions are welcome! Reach out on LinkedIn: 
linkedin.com/in/tanay-raundale-726086303/ or raise a GitHub issue.



Made with ❤️ by Tanay Raundale (https://github.com/TanayRaundale)
