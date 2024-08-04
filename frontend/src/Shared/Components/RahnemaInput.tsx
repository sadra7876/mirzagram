import React from "react";
import KeyICon from "../../assets/images/Icons/key.jpg";
import GmailIcon from "../../assets/images/Icons/gmail.jpg";

function RahnemaInput(props: { placeholder: string; inputIcon: string }) {
  return (
    <div className="flex flex-row-reverse bg-white text-right items-center gap-x-1 px-3.5 rounded-2xl h-9 text-xs ">
      <img src={props.inputIcon} className="h-4 w-4  object-cover"></img>
      <input
        placeholder={props.placeholder}
        className="focus:outline-none w-full text-right"
      />
    </div>
  );
}
export default RahnemaInput;
