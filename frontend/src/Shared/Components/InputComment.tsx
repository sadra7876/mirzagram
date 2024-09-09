import { useState } from "react";
import { GrSend } from "react-icons/gr";
import { useUserProfile } from "../../context/UserProfileContext";
export interface sendComment {
  postId: "string";
  text: "string";
  parentCommentId?: "string";
  isSuccess: boolean;
}

export default function InputComment(props: {
  postId: string;
  parentCommentId?: string;
}) {
  // const [loading, setLoading] = useState(false);
  // const [comments, setComments] = useState<MirzaComment | undefined>(undefined);
  const [commentText, setCommentText] = useState("");
  const { userProfile } = useUserProfile();
  const sendComment = async (postId: string) => {
    const token = localStorage.getItem("token");
    const dataToSend = {
      postId,
      text: commentText,
      parentCommentId: props.parentCommentId?.toString(),
    };
    const responsePostComment = await fetch(
      "http://mirza-penguin.dev1403.rahnemacollege.ir:81/api/comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      },
    );

    const resultPostComment = await responsePostComment.json();
    if (resultPostComment.isSuccess) {
      setCommentText("");
    }
  };

  return (
    <form className="flex flex-row items-center gap-x-1">
      {props.parentCommentId && <div>@{userProfile?.username}</div>}
      <input
        className="h-9 w-[423px] rounded-2xl border-[1px] border-mirza-gray-comment px-4 py-1"
        placeholder="نظر خود را بنویسید...  "
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="h-8 w-6"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          sendComment(props.postId);
        }}
      >
        {<GrSend className="size-5 text-mirza-red" />}
      </button>
    </form>
  );
}
