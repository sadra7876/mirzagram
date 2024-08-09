import React, { useState } from "react";
import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import MirzaInput from "./MirzaInput";
import Vector from "../../assets/images/Icons/Vector.jpg";
import MirzaButton from "./MirzaButton";
export default function Display(props: { title: string }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover">
      <div className="w-485 h-456 md:w-485 flex flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[456]">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div
          dir="rtl"
          className="py-12flex-row flex size-5 w-full justify-center"
        >
          بازیابی رمز عبور
        </div>
        <div>
          <div
            dir="rtl"
            className="flex flex-col justify-center gap-y-6 py-8 text-amber-950"
          >
            لطفا نام کاربری یا ایمیل خودتون رو وارد کنید:
          </div>

          <MirzaInput placeholder="نام کاربری یا ایمیل" inputIcon={Vector} />
          <div className="flex flex-row items-center gap-2 py-8">
            <MirzaButton
              title="ارسال لینک بازیابی رمز عبور"
              onClick={() => console.log("click me")}
            />
            <button className="flex-row bg-transparent text-black">
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
