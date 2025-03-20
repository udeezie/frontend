import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`
        );
        setResults(res.data);
      } catch {
        setError("Failed to fetch rewards.");
      }
      setLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="search-overlay-popup">
      <div className="search-popup-header">
        <input
          type="text"
          placeholder="Search Rewards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          className="close-btn"
          onClick={handleClose}
        >
          ✖
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="search-popup-results">
        {results.length > 0 ? (
          results.map((reward) => (
            <li key={reward._id} className="reward-item">
              <div className="reward-image-wrapper">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="reward-image"
                />
              </div>
              <div className="reward-info">
                <span className="reward-name">{reward.name}</span>
                <span className="reward-points">
                  {reward.pointsRequired} points
                </span>
              </div>
              <div className="reward-category">{reward.category}</div>
              <button
                className={`redeem-btn ${reward.isRedeemable ? "" : "disabled"}`}
                disabled={!reward.isRedeemable}
              >
                {reward.isRedeemable ? "Redeem Now" : "Not Enough Points"}
              </button>
            </li>
          ))
        ) : (
          !loading && query && <p className="no-results">No rewards found.</p>
        )}
      </ul>
    </div>
  );
};

export default Search;
