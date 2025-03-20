import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { FaTrophy } from "react-icons/fa";
import { useWindowSize } from "react-use";
import Footer from "../components/Footer";
import DogWithBubble from "../components/DogWithBubble"; // The dog bubble component
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastBadge, setLastBadge] = useState(null);
  const [celebratedBadge, setCelebratedBadge] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  // Helper to map badge names to CSS classes
  const getBadgeClass = (badge) => {
    const lower = badge.toLowerCase();
    if (lower.includes("bronze")) return "bronze-badge";
    if (lower.includes("silver")) return "silver-badge";
    if (lower.includes("gold")) return "gold-badge";
    if (lower.includes("platinum")) return "platinum-badge";
    if (lower.includes("diamond")) return "diamond-badge";
    if (lower.includes("s-tier")) return "stier-badge";
    return "default-badge";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const userData = response.data.user;
          setUser(userData);
          setRecentActivities(userData.recentActivities || []);

          // Check if a new badge was earned
          const latestBadge =
            userData.badges.length > 0
              ? userData.badges[userData.badges.length - 1]
              : null;

          // If there's a new badge, trigger confetti
          if (
            latestBadge &&
            latestBadge !== lastBadge &&
            latestBadge !== celebratedBadge
          ) {
            setLastBadge(latestBadge);
            setCelebratedBadge(latestBadge);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate, lastBadge, celebratedBadge]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Calculate progress
  const REFERRAL_TIERS = [50, 500, 1250, 2500, 5000];
  const nextTier =
    REFERRAL_TIERS.find((tier) => tier > (user?.points || 0)) ||
    REFERRAL_TIERS[REFERRAL_TIERS.length - 1];
  const progressPercentage = user ? (user.points / nextTier) * 100 : 0;
  const pointsToNextTier = nextTier - (user?.points || 0);

  return (
    <div className="dashboard-container">
      {/* Show confetti if a new badge was earned */}
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="dashboard-content">
        {/* Header with Dog + Bubble and Logout */}
        <div className="dashboard-header">
          <div className="user-info">
            <DogWithBubble />
            <h2>
              Welcome! <span className="wave">👋</span>
            </h2>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* KQ Points Card */}
            <div className="dashboard-card total-points">
              <div className="points-container">
                <span className="points-label">Total KQ Points</span>
                <div className="points-right">
                  {loading ? "Loading..." : user ? user.points : "N/A"}
                  <div className="spinning-emoji">🪙</div>
                </div>
              </div>

              {/* Progress Bar with dog inside */}
              <div className="progress-bar-container">
                <span className="progress-text">
                  {loading
                    ? "Loading..."
                    : `Next Badge Points: ${nextTier} points | ${pointsToNextTier} more 🔥`}
                </span>
                <div className="progress-row">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>

                    {/* The dog image that moves along the bar */}
                    <img
                      src="/doggo3.jpg"
                      alt="Dog in progress bar"
                      className="progress-dog"
                      style={{ left: `${progressPercentage}%` }}
                    />
                  </div>
                  {!loading && (
                    <span className="progress-percentage">
                      {progressPercentage.toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Streak Progress */}
            <div className="dashboard-card">
              <h3>Streak Progress</h3>
              <div className="streak-container">
                <div className="streak-box">
                  <h4>Points Streak</h4>
                  <p>{loading ? "Loading..." : user?.pointsStreak || 0} Days</p>
                </div>
                <div className="streak-box">
                  <h4>Activity Streak</h4>
                  <p>
                    {loading ? "Loading..." : user?.activityStreak || 0} Days
                  </p>
                </div>
              </div>
            </div>

            {/* Earned Badges */}
            <div className="dashboard-card">
              <h3>Earned Badges</h3>
              {user?.badges?.length > 0 ? (
                <div className="badge-container">
                  <ul className="badge-list">
                    {user.badges.map((badge, index) => (
                      <li key={index} className={`badge ${getBadgeClass(badge)}`}>
                        <FaTrophy className="trophy-icon" />
                        {badge}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="no-badges">No badges earned yet</p>
              )}
            </div>

            {/* Missions Card */}
            <div className="dashboard-card missions-card">
              <h3>Daily Missions</h3>
              <ul className="mission-list">
                <li className="mission-item">
                  <span className="mission-task">
                    📌 Rate 5 movies today to get a bonus point
                  </span>
                </li>
                <li className="mission-item">
                  <span className="mission-task">
                    📌 Refer 5 friends today for a bonus point
                  </span>
                </li>
              </ul>
            </div>

            {/* Point History */}
            <div className="dashboard-card">
              <h3>Point History</h3>
              {loading ? (
                <p>Loading history...</p>
              ) : user?.pointHistory?.length > 0 ? (
                <div className="point-history-table-container">
                  <table className="point-history-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Points</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.pointHistory.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.type || "N/A"}</td>
                          <td>{entry.pointsAwarded}</td>
                          <td>{new Date(entry.date).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No recorded history</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="right-top-row">
              {/* Recent Activities */}
              <div className="dashboard-card recent-activities">
                <h3>Recent Activities</h3>
                {loading ? (
                  <p>Loading activities...</p>
                ) : recentActivities.length > 0 ? (
                  <div className="timeline">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-date">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                        <div className="timeline-content">
                          <p>
                            <strong>Review:</strong>{" "}
                            {activity.review || "N/A"}
                          </p>
                          <p>
                            <strong>Family:</strong> {activity.family}
                          </p>
                          <p>
                            <strong>Category:</strong> {activity.category}
                          </p>
                          <p>
                            <strong>Points Earned:</strong> {activity.points}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No recent activities</p>
                )}
              </div>

              {/* Leaderboard Update Card */}
              <div className="dashboard-card leaderboard-update">
                <h3>Leaderboard Updates</h3>
                <p>
                  Check out the latest rankings and see who's climbing the
                  leaderboard!
                </p>
                <button
                  className="view-leaderboard-btn"
                  onClick={() => navigate("/leaderboard")}
                >
                  View Leaderboard
                </button>
              </div>
            </div>

            {/* Keep Grinding Card with Animated Gold Coins */}
            <div className="dashboard-card empty-card">
              <h3>Keep Grinding for the Ultimate KQ points.</h3>
              <p>Strive for the 50,000 points milestone. You can do it! 🚀</p>
              <img
                src="https://thumb.r2.moele.me/t/28619/28609669/a-0144.png"
                alt="Animated Shiny Gold Coins"
                className="gold-coins"
              />
            </div>

            {/* How to Earn Points Card */}
            <div className="dashboard-card points-info-card">
              <h3>Wondering How to Earn Points?</h3>
              <p>
                Discover various ways to boost your points on KnowQuest. From
                writing reviews, referring friends, daily login bonuses, to
                completing missions, every action helps you climb the
                leaderboard and unlock exciting rewards! 😉
              </p>
              <button className="info-btn" onClick={() => navigate("/points-info")}>
                See How
              </button>
            </div>

            {/* Referral Code */}
            <div className="dashboard-card referral">
              <h3>Refer a Friend! 😊</h3>
              <p>Your Referral Code:</p>
              <input
                type="text"
                value={loading ? "Loading..." : user?.referralCode || "N/A"}
                readOnly
                className="referral-input"
              />
              <button className="copy-btn" onClick={copyReferralCode}>
                Copy Code
              </button>
              {copySuccess && (
                <p className="copy-success">Code copied successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
