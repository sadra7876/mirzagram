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
      `http://mirza-penguin.dev1403.rahnemacollege.ir:81/api/comment?postId=${postId}&page=1&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responsePostDetails = await fetch(
      `http://mirza-penguin.dev1403.rahnemacollege.ir:81/api/post/${postId}`,
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
    <div className="grid grid-cols-[396px_1fr] px-6">
      <div className="flex h-96 w-96 flex-col items-center">
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
            <img
              className="h-12 w-12 rounded-full"
              src={postDetails?.owner.profilePicture}
            />
            <p className="py-3">{postDetails?.owner.username}</p>
          </div>
          <div className="w-24 pb-4 text-xs">2 ماه پیش</div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            <div className="text-">{postDetails?.caption}</div>

            <div className="flex w-full flex-row gap-2 pt-4">
              {postDetails?.hashtags &&
                postDetails.hashtags.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-md bg-mirza-orange px-1"
                    >
                      <p className="text-white">{item.tag}</p>
                    </div>
                  );
                })}
            </div>

            <div className="flex w-full flex-row justify-end">
              <LikeComponent
                initialCount={postDetails?.likeCount}
                postId={postDetails?.id.toString()}
              />
              <SaveComponent
                initialCount={postDetails?.bookmarkCount}
                postId={postDetails?.id.toString()}
              />
            </div>

            <div className="flex h-10 w-full flex-row items-center gap-4">
              <img className="h-10 w-10" src={profilePicture} />
              <div className="">
                <InputComment postId={postDetails?.id.toString() || ""} />
              </div>
            </div>
          </div>
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
