import React from "react";
import Footer from "../components/Footer";
import "./PointsInfo.css";

const PointsInfo = () => {
  return (
    <>
      <div className="points-info-container notepad">
        <h2 className="points-info-title">How to Earn Points on KnowQuest</h2>
        <p className="points-info-description">
          At KnowQuest, every action counts! Earning points is like adding strokes to your notepad—each entry brings you closer to exclusive rewards, badges, and a higher rank on our global leaderboard.
        </p>
        <ul className="points-list">
          <li>
            <strong>Write a Review</strong>: Earn <span className="highlight">10 points</span> for every genuine review you write. Your insights help our community!
          </li>
          <li>
            <strong>Refer a Friend</strong>: Share your referral code and earn <span className="highlight">10 points</span> when a friend joins.
          </li>
          <li>
            <strong>Daily Login Bonus</strong>: Log in each day to grab a bonus of <span className="highlight">5 points</span> and maintain your streak.
          </li>
          <li>
            <strong>Complete Daily Missions</strong>: Challenges like writing 2 reviews or referring 5 friends can earn you bonus points.
          </li>
          <li>
            <strong>Streak Bonus</strong>: Keep your daily or weekly streak alive to earn extra points that grow with every consecutive day.
          </li>
          <li>
            <strong>Special Events & Promotions</strong>: Participate in community challenges and events for extra points!
          </li>
        </ul>
        <p className="points-info-tip">
          Tip: Check your Dashboard regularly to see your progress and stay motivated!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PointsInfo;
