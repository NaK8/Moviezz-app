import { useState } from "react";
import { FullStar, HalfStar } from "./Icons";

interface StarRatingProps {
  maxLength: number;
  color: string;
  size: number;
  getRating: (rate: number) => void;
}

type StarTypes = { full?: boolean; color: string };

function Star({ full, color }: StarTypes) {
  return full ? <FullStar color={color} /> : <HalfStar color={color} />;
}

const LayoutStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  gap: "16px",
  minHeight: "25.2px",
};

const starFix = {
  display: "flex",
  gap: "5px",
};

const StarRating = ({ maxLength, color, size, getRating }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [tmpRating, setTempRating] = useState(0);

  const spanStar = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  function handleClick(i: number) {
    const newRating = i + 1;
    setRating(newRating);
    getRating(newRating);
  }

  const showRating = tmpRating || rating;

  return (
    <div style={LayoutStyle}>
      <div style={starFix} className="star-resp">
        {Array.from({ length: maxLength }, (_, i) => (
          <span
            style={spanStar}
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => setTempRating(() => i + 1)}
            onMouseLeave={() => setTempRating(() => 0)}
          >
            <Star
              color={color}
              full={tmpRating ? tmpRating >= i + 1 : rating >= i + 1}
            />
          </span>
        ))}
      </div>
      {showRating && <p>{showRating}</p>}
    </div>
  );
};

export default StarRating;
