import React, { useState, useRef } from "react";
import { GrSend } from "react-icons/gr";

export interface sendComment {
  postId: "string";
  text: "string";
  parentCommentId?: "string";
}
export interface IGetCommentById {
  isSuccess: boolean;
  statusCode: number;
  result?: {
    page: number;
    data: {
      id: string;
      text: string;
      postId: string;
      author: {
        displayName: string;
      };
      likeCount: number;
      replies: {
        id: string;
        text: string;
        postId: string;
        author: {
          displayName: string;
        };
      }[];
    };
  };
}
export default function Comment(postId: string) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IGetCommentById | undefined>(
    undefined,
  );
  const [commentText, setCommentText] = useState("");
  function GetComment() {}

  const sendComment = async (postId: string) => {
    const token = localStorage.getItem("token");
    const dataToSend = { postId, text: commentText };
    console.log(dataToSend);
    // const x = await fetch("http://37.32.6.153:81/comment",
    //    {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(dataToSend),
    // });
  };

  return (
    <form
      className="flex flex-row items-center gap-x-1"
      // onSubmit={handleSubmit}
    >
      <input
        className="h-9 w-[423px] rounded-2xl border-[1px] border-mirza-gray-comment px-4 py-1"
        placeholder="نظر خود را بنویسید...  "
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button className="h-8 w-6" onClick={() => sendComment(postId)}>
        {<GrSend className="size-5 text-mirza-red" />}{" "}
      </button>
    </form>
  );
}
