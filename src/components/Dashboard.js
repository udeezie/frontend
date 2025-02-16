import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { FaTrophy } from "react-icons/fa";
import { useWindowSize } from "react-use";
import Footer from "../components/Footer";
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
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const userData = response.data.user;
          setUser(userData);
          setRecentActivities(userData.recentActivities || []);

          const latestBadge =
            userData.badges.length > 0
              ? userData.badges[userData.badges.length - 1]
              : null;

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

  const REFERRAL_TIERS = [50, 500, 1250, 2500, 5000];
  const nextTier =
    REFERRAL_TIERS.find((tier) => tier > (user?.points || 0)) ||
    REFERRAL_TIERS[REFERRAL_TIERS.length - 1];
  const progressPercentage = user ? (user.points / nextTier) * 100 : 0;
  const pointsToNextTier = nextTier - (user?.points || 0);

  const profileAvatar = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=ff914d&color=ffffff&rounded=true&size=100`
    : "https://ui-avatars.com/api/?name=User&background=ff914d&color=ffffff&rounded=true&size=100";

  return (
    <div className="dashboard-container">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="user-info">
            <img
              src={profileAvatar}
              alt="User Avatar"
              className="user-avatar"
            />
            <h2>Welcome, {user?.name || "Guest"}! 👋</h2>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* Referral Points */}
            <div className="dashboard-card total-points">
              <div className="points-container">
                <span className="points-label">Total Referral Points</span>
                <div className="points-right">
                  {loading ? "Loading..." : user ? user.points : "N/A"}
                  <div className="spinning-emoji">🪙</div>
                </div>
              </div>

              {/* Progress Bar Container with percentage label */}
              <div className="progress-bar-container">
                <span className="progress-text">
                  {loading
                    ? "Loading..."
                    : `Next Tier: ${nextTier} points / ${pointsToNextTier} more 🔥`}
                </span>
                <div className="progress-row">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
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
                      <li
                        key={index}
                        className={`badge ${getBadgeClass(badge)}`}
                      >
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
            {/* Recent Activities */}
            <div className="dashboard-card recent-activities">
              <h3>Recent Activities</h3>
              {loading ? (
                <p>Loading activities...</p>
              ) : recentActivities.length > 0 ? (
                <div className="activities-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-card">
                      <p>Review:</p>
                      <p>Family: {activity.family}</p>
                      <p>Category: {activity.category}</p>
                      <p>Points Earned: {activity.points}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No recent activities</p>
              )}
            </div>

            {/* Empty Card with GIF */}
            <div className="dashboard-card empty-card">
              <h3>Keep Grinding for the Ultimate KQ points.</h3>
              <p>Strive for the 50,000 points milestone. You can do it! 🚀</p>
              <img
                src="https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif"
                alt="Cute little boy cheering"
                className="cute-animation"
              />
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
