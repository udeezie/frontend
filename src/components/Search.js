import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results.");
    }
    setLoading(false);
  };

  return (
    <div className="search-page-container">
      <div className="search-overlay">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Leaderboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading results...</p>}
        {error && <p className="error">{error}</p>}
        {results.length > 0 ? (
          <ul className="search-results">
            {results.map((user) => (
              <li key={user._id}>
                <span className="user-name">{user.name}</span> —{" "}
                <span className="user-points">{user.points} points</span>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
