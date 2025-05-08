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

function Crypto({ searchTerm }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=5&page=1&sparkline=true"
    )
      .then((res) => res.json())
      .then((data) => setCryptoData(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="crypto-container">
      <table>
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Price (INR)</th>
            <th>Chart (7d)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} className="name" />
                <span>{coin.symbol.toUpperCase()}</span>
              </td>
              <td>₹{coin.current_price.toLocaleString()}</td>
              <td>
                <div style={{ width: "80px", height: "40px" }}>
                  <Line
                    data={{
                      labels: coin.sparkline_in_7d.price.map((_, i) => i),
                      datasets: [
                        {
                          data: coin.sparkline_in_7d.price,
                          borderColor: "#00c853",
                          borderWidth: 1, // thin line
                          tension: 0.4,
                          pointRadius: 0, // no dots
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
