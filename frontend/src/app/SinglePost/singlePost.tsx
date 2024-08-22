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
import saved from "../../assets/images/Icons/savevector.svg";

import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";

import profilePicture from "../../assets/images/Icons/picture frame.svg";

const iconStyle = {
  marginRight: "8px",
  display: "flex",
  alignItems: "center",
};
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  display: "flex",
  alignItems: "center",
};

export default function SinglePost() {
  const [liked, setLiked] = useState(false);
  const LikeButton = () => {
    setLiked(!liked);
  };
  const [saved, setSaved] = useState(false);
  const SavedButton = () => {
    setSaved(!saved);
  };
  const toggleLike = () => {
    setLiked(!liked);
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
        <div className="w-full pt-4">tags</div>
        <div className="h-[335px] w-full">
          <div className="flex w-full flex-row justify-end">
            {" "}
            <button onClick={toggleLike} style={buttonStyle}>
              <span style={iconStyle}>
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    width="24px"
                    height="24px"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24px"
                    height="24px"
                  >
                    <path d="M20.84 4.61c-1.88-1.88-4.92-1.88-6.8 0l-1.04 1.04-1.04-1.04c-1.88-1.88-4.92-1.88-6.8 0-1.88 1.88-1.88 4.92 0 6.8l1.04 1.04 7.8 7.8 7.8-7.8 1.04-1.04c1.88-1.88 1.88-4.92 0-6.8z" />
                  </svg>
                )}
              </span>
              {liked ? "" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
