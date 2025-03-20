import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
// You can use any icon library or an SVG. For demonstration, let's use a simple unicode or a data URI
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the search page (or do direct fetch) with the query
    navigate(`/search?q=${searchQuery}`);
    // Optionally close the search box after submit
    setShowSearch(false);
  };

  return (
    <header className="custom-header">
      <div className="logo-container">
        <img src="/knowquest1.png" alt="KnowQuest Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/rewards">Rewards</Link>
        <Link to="/points-info">How to Earn Points</Link>
        {/* Toggle icon to open/close the search input */}
        <div className="search-icon" onClick={toggleSearch}>
          <FaSearch />
        </div>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </nav>

      {/* Conditionally render the search bar */}
      {showSearch && (
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search Rewards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
