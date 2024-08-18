import { useState } from "react";

interface StarRatingProps {
  maxLength: number;
  color: string;
  size: number;
  getRating: (rate: number) => void;
}

type StarTypes = { full: number | boolean; color: string };

function Star({ full, color }: StarTypes) {
  return full ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

const LayoutStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
  gap: "16px",
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
      <p>{tmpRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;
