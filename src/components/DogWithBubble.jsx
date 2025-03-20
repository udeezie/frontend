import React, { useState } from "react";
import "./DogWithBubble.css";

const DogWithBubble = () => {
  // Toggle bubble on hover or keep it always visible if you prefer
  const [showBubble] = useState(true);

  const handleMouseEnter = () => {};

  const handleMouseLeave = () => {
    // setShowBubble(false);
  };

  return (
    <div
      className="dog-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* The dog image */}
      <img src="/doggo.jpg" alt="Dog" className="dog-image" />

      {/* Speech bubble (only show if showBubble === true) */}
      {showBubble && (
        <div className="speech-bubble">
          <p>Welcome, I'm the official KQ Mascot.🐶</p>
        </div>
      )}
    </div>
  );
};

export default DogWithBubble;
