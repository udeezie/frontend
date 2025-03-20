import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { FaGift } from "react-icons/fa";
import "./RewardsTable.css";

const userPoints = 300;

const RewardsTable = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("pointsAsc");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rewards");
        setRewards(response.data);
      } catch {
        setError("Failed to load rewards.");
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const handleRedeem = (reward) => {
    if (userPoints < reward.pointsRequired) {
      setToastMessage(
        `You need ${reward.pointsRequired - userPoints} more points!`
      );
    } else {
      setToastMessage(`${reward.name} redeemed successfully!`);
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const filteredRewards = rewards.filter((rw) =>
    categoryFilter ? rw.category === categoryFilter : true
  );

  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortOption === "pointsAsc") return a.pointsRequired - b.pointsRequired;
    return b.pointsRequired - a.pointsRequired;
  });

  return (
    <div className="rewards-page">
      {toastMessage && <div className="toast-message">{toastMessage}</div>}
      <div className="rewards-container">
        <h2 className="rewards-title">
          <FaGift className="gift-icon" /> Available Rewards
        </h2>
        <div className="controls-container">
          <div className="filter-group">
            <label htmlFor="categoryFilter">Filter by Category:</label>
            <select
              id="categoryFilter"
              className="select-input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Gift Cards">Gift Cards</option>
              <option value="Travel">Travel</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Education">Education</option>
              <option value="Charity">Charity</option>
              <option value="Gaming">Gaming</option>
              <option value="Luxury">Luxury</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Outdoors">Outdoors</option>
              <option value="Music">Music</option>
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="Photography">Photography</option>
              <option value="Art">Art</option>
            </select>
          </div>
          <div className="sort-group">
            <label htmlFor="sortOption">Sort by Points:</label>
            <select
              id="sortOption"
              className="select-input"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="pointsAsc">Ascending</option>
              <option value="pointsDesc">Descending</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="skeleton-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="rewards-grid">
            {sortedRewards.map((reward) => (
              <div
                key={reward._id}
                className={`reward-card ${
                  userPoints >= reward.pointsRequired
                    ? "redeemable"
                    : "not-redeemable"
                }`}
              >
                <div className="reward-image-wrapper">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="reward-image"
                  />
                </div>
                <div className="reward-details">
                  <h3 className="reward-name">{reward.name}</h3>
                  <p className="reward-description">{reward.description}</p>
                  <span
                    className={`reward-category ${reward.category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {reward.category}
                  </span>
                  <p className="reward-points">
                    <strong>{reward.pointsRequired} Points</strong>
                  </p>
                  <button
                    className="redeem-btn"
                    onClick={() => handleRedeem(reward)}
                    disabled={userPoints < reward.pointsRequired}
                  >
                    {userPoints >= reward.pointsRequired
                      ? "Redeem"
                      : "Not enough points"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RewardsTable;
