import { useEffect, useState } from "react";
import picProfile from "../../assets/images/picture_profile.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Modal } from "flowbite-react";
import MirzaInput from "../../Shared/Components/MirzaInput";
import { Controller, useForm } from "react-hook-form";
import UserIcon from "../../assets/images/Icons/user_icon.jpg";
import EmailIcon from "../../assets/images/Icons/gmail.jpg";
import KeyIcon from "../../assets/images/Icons/key.jpg";
import { ToggleSwitch, Label, Textarea } from "flowbite-react";
import Editicon from "../../assets/images/Icons/editIcon.svg";
import siglepostImage from "../../assets/images/Singlepost-image.svg";
import { GrSend } from "react-icons/gr";

import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import LikeComponent from "../../Shared/Components/Like";
import SaveComponent from "../../Shared/Components/Save";
import CommentComponent from "../../Shared/Components/Comment";

import profilePicture from "../../assets/images/Icons/picture frame.svg";
import Comment from "../../Shared/Components/Comment";
import { PostDetails } from "../../Shared/model/postDetails.interface";
import { MirzaComment } from "../../Shared/model/comment.interface";
import { useLocation } from "react-router-dom";
export default function SinglePost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract the query parameters you need
  const postId = queryParams.get("postId");

  console.log("postId", postId);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<MirzaComment | undefined>(undefined);
  const [postDetails, setPostDetails] = useState<PostDetails | undefined>();
  const SavedButton = () => {
    setSaved(!saved);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  useEffect(() => {
    init();

    return () => {};
  }, []);

  const init = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://37.32.6.153:81/comment?postId=23&page=1&pageSize=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const responsePostDetails = await fetch(`http://37.32.6.153:81/post/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("responsePostDetails", responsePostDetails);
    const resultPostDetails = await response.json();
    if (resultPostDetails.isSuccess) {
      // setComments(resultPostDetails.result as IGetCommentById);
      setPostDetails(responsePostDetails.result as PostDetails);
    }
    const result = await response.json();
    if (result.isSuccess) {
      setComments(result.result as MirzaComment);
    }
    // console.log("response", result);
    setLoading(false);
  };

  return (
    <div className="flex h-full w-full flex-row px-6">
      <div className="h-376 w-full items-center">
        <img className="rounded-3xl" src={siglepostImage} />
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-385 flex-row gap-4">
            <img className="h-12 w-12 rounded-full" src={profilePicture} />
            <p className="py-3">mahmz</p>
          </div>
          <div className="w-24 pb-4 text-xs">2 ماه پیش</div>
        </div>

        <div className="text-">
          ترس یکی از مهمترین عوامل #قدرت است؛ کسی که بتواند در #جامعه سمت و سوی
          ترس را معین کند #قدرت زیادی بر آن جامعه پیدا می‌کند. شاید بتوان هم صدا
          با جورجو آگامبنِ فیلسوف گفت که ما امروزه همیشه در یک حالت اضطراری
          زندگی می‌کنیم
        </div>
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
        </div>

        <div className="w-100 flex h-10 flex-row items-center gap-4">
          <img className="h-10 w-10" src={profilePicture} />
          <div>
            {/* <CommentComponent
              onCommentSubmit={function (comment: CommentComponent): void {
                throw new Error("Function not implemented.");
              }}
            /> */}
            <Comment postId="" />
          </div>
        </div>
        <div className="felx w-full flex-col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-x-1">
                <p className="text-xs font-bold">
                  {comments &&
                    (comments?.data.author.displayName || "موجود نیست")}
                </p>
                <p className="text-[10px] font-normal text-gray-500">
                  ۵ هفته پیش
                </p>
              </div>
              <div></div>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}
