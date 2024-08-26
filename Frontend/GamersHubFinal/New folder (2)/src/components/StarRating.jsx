import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRatingSelect }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingSelect) {
      onRatingSelect(value);
    }
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div style={{ display: "flex" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            height="25"
            width="25"
            viewBox="0 0 24 24"
            fill={(hoverRating || rating) >= starValue ? "orange" : "gray"}
            style={{ cursor: "pointer" }}
          >
            <path d="M12 .587l3.668 7.451L24 9.753l-6 5.853 1.415 8.447L12 18.902l-7.415 4.151L6 15.606 0 9.753l8.332-1.715z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
