import React from "react";
import KeyICon from "../../assets/images/Icons/key.jpg";
import GmailIcon from "../../assets/images/Icons/gmail.jpg";

function MirzaInput(props: { placeholder: string; inputIcon: string }) {
  return (
    <div className="flex h-9 flex-row-reverse items-center gap-x-1 rounded-2xl bg-white px-3.5 text-right text-xs">
      <img src={props.inputIcon} className="h-4 w-4 object-cover"></img>
      <input
        placeholder={props.placeholder}
        className="w-full text-right focus:outline-none"
      />
    </div>
  );
}
export default MirzaInput;
