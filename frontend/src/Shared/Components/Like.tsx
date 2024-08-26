import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
interface LikeComponentProps {
  initialCount?: number;
}

const LikeComponent: React.FC<LikeComponentProps> = ({ initialCount = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(likeCount + (isLiked ? -1 : 1));
  };
  return (
    <button className="p-1" onClick={toggleLike}>
      <span>
        {isLiked ? (
          <FaHeart className="fill-mirza-red text-mirza-red" />
        ) : (
          <FaRegHeart className="text-mirza-red" />
        )}
      </span>
      <p className="text-mirza-red">{initialCount}</p>
    </button>
  );
};

export default LikeComponent;
