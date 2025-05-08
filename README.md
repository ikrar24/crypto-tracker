# 🪙 Crypto Tracker App (INR Based)

A sleek and minimal React-based Crypto Tracker that fetches real-time cryptocurrency data in **Indian Rupees (INR)** using the [CoinGecko API](https://www.coingecko.com/en/api), and displays a 7-day mini chart for each coin.

---

## ✨ Features

- 🔍 **Search Functionality** — Instantly filter crypto by name via top navbar.
- 📉 **Mini Line Charts** — Clean 7-day sparkline charts for quick trend overview.
- 🇮🇳 **INR Currency Support** — Prices displayed in Indian Rupees.
- 📊 **Top 5 Cryptos** — Focused view of the top 5 coins by market cap.
- ⚡ **Fast & Lightweight** — Uses `fetch`, no external state managers or Axios.

---

## 🖥️ Screenshots

| Search & Display | Responsive Chart |
|------------------|------------------|
| ![screenshot](./assets/screenshot1.png) | ![chart](./assets/chart.png) |

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite or Create React App)
- **Charting**: Chart.js with react-chartjs-2
- **Styling**: Custom CSS

---

## 📦 Installation

```bash
git clone https://github.com/ikrar24/crypto-tracker.git
cd crypto-tracker
npm install
npm start
