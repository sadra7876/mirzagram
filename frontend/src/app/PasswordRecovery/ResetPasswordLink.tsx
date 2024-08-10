// import { useState } from "react";
import rahnamaLogo from "../../assets/images/rahnema-logo.png";
// import MirzaInput from "./../../Shared/Components/MirzaInput";
// import key from "../../assets/images/Icons/key.jpg";
// import MirzaButton from "../../Shared/Components/MirzaButton";
export default function ResetLinkPassword() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover">
      <div className="h-300 w-485 md:w-485 flex flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[300]">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div
          dir="rtl"
          className="flex size-5 w-80 w-full flex-row justify-center py-10 text-center font-extralight"
        >
          لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو
          چک کنید.
        </div>
      </div>
    </div>
  );
}
