import React, { useEffect, useState } from "react";
import "./Crypto.css";

function formatINR(value) {
  return "₹" + value.toLocaleString("en-IN");
}

function percentageColor(value) {
  return { color: value >= 0 ? "green" : "red" };
}

function Crypto({ searchTerm }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
    )
      .then((res) => res.json())
      .then((data) => setCryptoData(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crypto-container">
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src="https://media.tenor.com/NOYF3f82b_gAAAAC/not-found.gif"
                  alt="Not Found"
                  style={{ width: "200px", marginBottom: "10px" }}
                />
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>No results found</p>
              </td>
            </tr>
          ) : (
            filteredData.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img src={coin.image} alt={coin.name} width="32" height="32" />
                </td>
                <td>{coin.name}</td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>{formatINR(coin.current_price)}</td>
                <td style={percentageColor(coin.price_change_percentage_1h_in_currency)}>
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td style={percentageColor(coin.price_change_percentage_24h_in_currency)}>
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                </td>
                <td style={percentageColor(coin.price_change_percentage_7d_in_currency)}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td>{formatINR(coin.market_cap)}</td>
                <td>{formatINR(coin.total_volume)}</td>
                <td>{coin.circulating_supply?.toLocaleString()}</td>
                <td>{coin.max_supply ? coin.max_supply.toLocaleString() : "∞"}</td>
                <td>
                  <img
                    src="https://www.svgrepo.com/show/489253/line-chart-growth.svg"
                    alt="7D Chart"
                    width="70"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
