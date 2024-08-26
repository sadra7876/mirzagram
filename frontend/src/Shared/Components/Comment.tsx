import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";

interface CommentComponentProps {
  initialCount?: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  initialCount = 0,
}) => {
  const [isCommented, setIsCommentd] = useState(false);
  const [CommentCount, setCommentCount] = useState(initialCount);
  const [CommentChild, setCommentChild] = useState(false);
  const toggleComment = () => {
    setIsCommentd(!isCommented);
    setCommentCount(CommentCount + (isCommented ? -1 : 1));
  };
  return (
    <button className="p-1" onClick={toggleComment}>
      <span>
        <FaRegComment className="text-mirza-red" />
      </span>
      <p className="text-mirza-red">{initialCount}</p>
    </button>
  );
};

export default CommentComponent;
