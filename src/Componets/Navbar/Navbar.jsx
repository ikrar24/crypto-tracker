import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input.trim().toLowerCase()); // lowercase for case-insensitive search
  };

  return (
    <header>
      <nav>
        <ul>
          <li className="SearchBox">
            <input
              type="text"
              placeholder="Search"
              className="searchInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
