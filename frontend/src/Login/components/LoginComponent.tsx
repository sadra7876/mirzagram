import React from "react";
import RahnemaInput from "../../Shared/Components/RahnemaInput";
import keyIcon from "../../assets/images/Icons/key.jpg";
import GmailIcon from "../../assets/images/Icons/gmail.jpg";
export default function LoginComponent() {
  return (
    <div className="content-center mr-0 py-6 w-full  ">
      <p className="w-400 leading-24px text-amber-950  text-sm">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خود‌تون رو وارد کنید:
      </p>
      <div className="py-8  flex flex-col gap-y-6  justify-center">
        <RahnemaInput placeholder="نام کاربری/ایمیل" inputIcon={GmailIcon} />
        <RahnemaInput placeholder="رمز عبور" inputIcon={keyIcon} />
      </div>
    </div>
  );
}
