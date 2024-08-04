import React, { useState } from "react";
import rahnamaLogo from "../assets/images/rahnema-logo.png";

type LoginRegistState = "LOGIN" | "REGISTER";
export default function LoginPage() {
  const [state, setState] = useState<LoginRegistState>("LOGIN");
  return (
    <div className="md:bg-background-auth flex h-screen w-full flex-col items-center justify-center md:bg-cover">
      <div className="flex h-full w-full flex-col items-center rounded-3xl bg-neutral-100 px-20 py-16 md:h-3/4 md:w-1/3">
        <img src={rahnamaLogo} className="h-15 w-28" />

        <div className="my-6 grid grid-cols-2 divide-x-2 divide-black">
          <button
            className={`px-3 ${state === "REGISTER" ? "" : "text-gray-400"}`}
            onClick={() => setState("REGISTER")}
          >
            ثبت نام
          </button>
          <button
            className={`px-3 ${state === "LOGIN" ? "" : "text-gray-400"}`}
            onClick={() => setState("LOGIN")}
          >
            ورود
          </button>
        </div>

        {state === "LOGIN" ? (
          <div className="flex flex-row bg-white">
            <p>icon</p>
            <input placeholder="amir" className="focus:outline-none" />
          </div>
        ) : (
          <p>setayesh</p>
        )}
      </div>
    </div>
  );
}
