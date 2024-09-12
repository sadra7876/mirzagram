import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Postlikepost } from "../api/postlikePost";
import { PostlikeComment } from "../api/postlikeComment";

interface LikeComponentProps {
  initialCount?: number;
  postId?: string;
  commentId?: string;
}

const LikeComponent: React.FC<LikeComponentProps> = ({
  initialCount = 0,
  postId,
  commentId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const toggleLike = async () => {
    if (postId != undefined) {
      await Postlikepost(postId!);
    } else {
      await PostlikeComment(commentId!);
    }
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
