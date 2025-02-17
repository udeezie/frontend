import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer"; // adjust the path as needed
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // If you're storing the logged-in user's ID in localStorage:
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboard")
      .then((res) => {
        setLeaders(res.data); // expecting an array of users
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
    <>
      <div className="leaderboard-container">
        <h2>Global Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={leader._id}
                className={leader._id === currentUserId ? "highlight" : ""}
              >
                <td>{index + 1}</td>
                <td>{leader.name}</td>
                <td>{leader.points}</td>
                <td>{leader.badges ? leader.badges.join(", ") : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;
