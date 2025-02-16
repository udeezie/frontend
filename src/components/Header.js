import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <div className="logo-container">
        <img src="/knowquest1.png" alt="KnowQuest Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/rewards">Rewards</Link>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
