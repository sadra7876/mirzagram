import React, { useState, useRef } from "react";
import { GrSend } from "react-icons/gr";

interface CommentProps {
  parentId?: string; // Optional parent ID for replies
  onCommentSubmit: (comment: Comment) => void;
}

interface Comment {
  id: string;
  parentId?: string;
  text: string;
  createdAt: Date;
}

const Comment: React.FC<CommentProps> = ({ parentId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const commentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText.trim() === "") {
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      parentId,
      text: commentText,
      createdAt: new Date(),
    };

    onCommentSubmit(newComment);
    setCommentText("");
    commentRef.current?.focus();
  };

  return (
    <form
      className="flex flex-row items-center gap-x-1"
      onSubmit={handleSubmit}
    >
      <input
        className="h-9 w-[423px] rounded-2xl border-[1px] border-mirza-gray-comment px-4 py-1"
        placeholder="نظر خود را بنویسید...  "
        type="text"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        ref={commentRef}
      />
      <button className="h-8 w-6">
        {<GrSend className="size-5 text-mirza-red" />}{" "}
      </button>
    </form>
  );
};

export default Comment;
