import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { FaMedal, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboard")
      .then((res) => {
        const sortedByBadges = res.data.sort(
          (a, b) => (b.badges?.length || 0) - (a.badges?.length || 0)
        );
        setLeaders(sortedByBadges);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="leaderboard-container">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="leaderboard-container">{error}</div>;
  }

  return (
    <div className="leaderboard-page-container">
      <div className="leaderboard-container">
        <h2>KQ Badge Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={leader._id}
                className={leader._id === currentUserId ? "highlight" : ""}
              >
                <td className={`rank ${index < 3 ? `rank-${index + 1}` : ""}`}>
                  {leader.change > 0 ? (
                    <span className="arrow-up">
                      <FaArrowUp />
                    </span>
                  ) : leader.change < 0 ? (
                    <span className="arrow-down">
                      <FaArrowDown />
                    </span>
                  ) : null}
                  {index + 1} {index < 3 && <FaMedal className="medal-icon" />}
                </td>
                <td>
                  {Array.isArray(leader.badges) && leader.badges.length > 0
                    ? leader.badges.join(", ")
                    : "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
