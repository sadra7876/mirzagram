import { useState } from "react";
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

export default function SinglePost() {
  const [saved, setSaved] = useState(false);
  const SavedButton = () => {
    setSaved(!saved);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="h-full w-full px-216">
      <div className="h-20 w-full py-4">
        <div className="flex h-12 w-full flex-row gap-2">
          <div className="flex w-385 flex-row gap-4">
            <img className="h-12 w-12 rounded-full" src={profilePicture} />
            <p className="py-3">mahmz</p>
          </div>
          <MirzaButton
            title="ویرایش پست"
            icon={<img src={Editicon} alt="Edit Icon" />}
          />
        </div>
      </div>
      <div className="h-376 w-full items-center">
        <img src={siglepostImage} />
      </div>
      <div className="h-15 w-full"></div>
      <div className="w-full">
        <div className="w-24 pb-4 text-xs">2 ماه پیش</div>
        <div className="">
          ترس یکی از عوامل #قدرت است. کسی که بتواند در #جامعه سمت و سوی ترس را{" "}
          معین کند
        </div>
        <div className="flex w-full flex-row gap-2 pt-4">
          <p className="bg-green-400">جامعه</p>
          <p className="bg-blue-500">قدرت</p>
        </div>
        <div className="h-[335px] w-full">
          <div className="flex w-full flex-row justify-end">
            {" "}
            {/* <button className="p-1">
              <span>{<FaRegComment className="text-mirza-red" />}</span>
            </button> */}
            {/* <button className="p-1" onClick={toggleLike}>
              <span>
                {liked ? (
                  <FaHeart className="fill-mirza-red text-mirza-red" />
                ) : (
                  <FaRegHeart className="text-mirza-red" />
                )}
              </span>
            </button> */}
            <div>
              <CommentComponent />
            </div>
            <div>
              <LikeComponent />
            </div>
            <div>
              <SaveComponent />
            </div>
            {/* <button className="p-1" onClick={toggleSave}>
              <span>
                {saved ? (
                  <FaBookmark className="text-mirza-red" />
                ) : (
                  <FaRegBookmark className="text-mirza-red" />
                )}
              </span>
            </button> */}
          </div>

          <div className="w-100 flex h-10 flex-row gap-4">
            <img className="h-10 w-10" src={profilePicture} />
            <input
              className="h-9 w-[423px] rounded-2xl border-[1px] border-mirza-gray-comment px-4 py-1"
              placeholder="نظر خود را بنویسید...  "
            />{" "}
            <button className="h-8 w-6 pt-2">
              {<GrSend className="size-5 text-mirza-red" />}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
