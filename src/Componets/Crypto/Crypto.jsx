import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Crypto.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

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
      <div className="table-wrapper">
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
                    <div style={{ width: "100px", height: "50px" }}>
                      <Line
                        data={{
                          labels: coin.sparkline_in_7d.price.map((_, i) => i),
                          datasets: [
                            {
                              data: coin.sparkline_in_7d.price,
                              borderColor: "#00c853",
                              borderWidth: 1,
                              tension: 0.4,
                              pointRadius: 0,
                            },
                          ],
                        }}
                        options={{
                          plugins: { legend: { display: false } },
                          scales: { x: { display: false }, y: { display: false } },
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Crypto;
