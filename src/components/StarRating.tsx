import React from "react";

interface StarRatingProps {
  rating: number; // define rating 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          style={{
            fontSize: "20px",
            color: index < rating ? "gold" : "gray", 
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
