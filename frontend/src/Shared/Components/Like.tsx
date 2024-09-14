import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Postlikepost } from "../api/postlikePost";
import { PostlikeComment } from "../api/postlikeComment";

interface LikeComponentProps {
  initialCount?: number;
  postId?: string;
  commentId?: string;
  isLiked?: boolean;
}

const LikeComponent: React.FC<LikeComponentProps> = ({
  initialCount = 0,
  postId,
  commentId,
  isLiked,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const toggleLike = async () => {
    if (postId != undefined) {
      await Postlikepost(postId!);
    } else {
      await PostlikeComment(commentId!);
    }
    setLiked(!isLiked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  };
  return (
    <button className="p-1" onClick={toggleLike}>
      <span>
        {liked ? (
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
