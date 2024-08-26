import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
interface SaveComponentProps {
  initialCount?: number;
}

const SaveComponent: React.FC<SaveComponentProps> = ({ initialCount = 0 }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [SaveCount, setSaveCount] = useState(initialCount);
  const toggleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(SaveCount + (isSaved ? -1 : 1));
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
