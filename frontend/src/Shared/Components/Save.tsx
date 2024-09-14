import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { postSavePost } from "../api/postSavePost";
interface SaveComponentProps {
  initialCount?: number;
  postId?: string;
  isBookmarked?: boolean;
}

const SaveComponent: React.FC<SaveComponentProps> = ({
  initialCount = 0,
  postId,
  isBookmarked,
}) => {
  const [isSaved, setIsSaved] = useState(isBookmarked);
  const [SaveCount, setSaveCount] = useState(initialCount);
  const toggleSave = async () => {
    const res = await postSavePost(postId!);
    setIsSaved(!isSaved);
    setSaveCount(SaveCount + (isSaved ? -1 : 1));
    console.log(isBookmarked);
  };
  return (
    <button className="p-1" onClick={toggleSave}>
      <span>
        {isSaved ? (
          <FaBookmark className="fill-mirza-red text-mirza-red" />
        ) : (
          <FaRegBookmark className="text-mirza-red" />
        )}
      </span>
      <p className="text-mirza-red">{initialCount}</p>
    </button>
  );
};

export default SaveComponent;
