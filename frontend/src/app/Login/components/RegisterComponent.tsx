import React from "react";

import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import Vector from "../../../assets/images/Icons/Vector.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
export default function RegisterComponent() {
  return (
    <div className="mr-0 w-full content-center py-6">
      <p
        dir="rtl"
        className="w-400 leading-24px text-right text-sm text-amber-950"
      >
        برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput placeholder="نام کاربری" inputIcon={Vector} />
        <MirzaInput placeholder="ایمیل" inputIcon={GmailIcon} />
        <MirzaInput placeholder="رمز عبور" inputIcon={keyIcon} />
        <MirzaInput placeholder="تکرار رمز عبور" inputIcon={keyIcon} />
      </div>
      <MirzaButton title="ثبت نام " onClick={() => console.log("click me")} />
    </div>
  );
}
