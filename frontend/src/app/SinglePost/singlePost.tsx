import { useEffect, useState } from "react";
import siglepostImage from "../../assets/images/Singlepost-image.svg";
import LikeComponent from "../../Shared/Components/Like";
import SaveComponent from "../../Shared/Components/Save";
import profilePicture from "../../assets/images/Icons/picture frame.svg";
import { PostDetails } from "../../Shared/model/postDetails.interface";
import { MirzaComment } from "../../Shared/model/comment.interface";
import { useLocation } from "react-router-dom";
import InputComment from "../../Shared/Components/InputComment";
import CommentComponent from "../../Shared/Components/Comment";
// import { FaRegComment } from "react-icons/fa";

export default function SinglePost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract the query parameters you need
  const postId = queryParams.get("postId");

  // const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<MirzaComment>({ data: [], page: 0 });
  const [postDetails, setPostDetails] = useState<PostDetails | undefined>();
  // const SavedButton = () => {
  //   setSaved(!saved);
  // };

  // const toggleSave = () => {
  //   setSaved(!saved);
  // };

  useEffect(() => {
    init();

    return () => {};
  }, []);

  const init = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://37.32.6.153:81/comment?postId=${postId}&page=1&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responsePostDetails = await fetch(
      `http://37.32.6.153:81/post/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resultPostDetails = await responsePostDetails.json();
    if (resultPostDetails.isSuccess) {
      setPostDetails(resultPostDetails.result as PostDetails);
    }
    const result = await response.json();
    if (result.isSuccess) {
      setComments(result.result as MirzaComment);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-full w-full flex-row gap-x-2 px-6">
      <div className="flex w-96 flex-col items-center">
        {postDetails?.contents.map((item, index) => {
          return (
            <img
              key={index}
              className="h-full w-full rounded-3xl object-cover"
              src={item.url}
            />
          );
        })}
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-385 flex-row gap-4">
            <img className="h-12 w-12 rounded-full" src={profilePicture} />
            <p className="py-3">mahmz</p>
          </div>
          <div className="w-24 pb-4 text-xs">2 ماه پیش</div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="text-">{postDetails?.caption}</div>

            <div className="flex w-full flex-row gap-2 pt-4">
              <div className="rounded-md bg-mirza-orange px-1">
                <p className="text-white">جامعه</p>
              </div>
              <div className="rounded-md bg-mirza-orange px-1">
                <p className="text-white">جامعه</p>
              </div>
            </div>

            <div className="flex w-full flex-row justify-end">
              <LikeComponent />
              <SaveComponent />
              {/* <FaRegComment /> */}
            </div>

            <div className="w-100 flex h-10 flex-row items-center gap-4">
              <img className="h-10 w-10" src={profilePicture} />
              <div>
                <InputComment postId={postDetails?.id.toString() || ""} />
              </div>
            </div>
          </>
        )}

        <div className="felx w-full flex-col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CommentComponent comments={comments} />
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}
