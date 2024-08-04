import React, { useState } from "react";
import rahnamaLogo from "../assets/images/rahnema-logo.png";
import LoginComponent from "./components/LoginComponent";

type LoginRegistState = "LOGIN" | "REGISTER";
export default function LoginPage() {
  const [state, setState] = useState<LoginRegistState>("LOGIN");
  return (
    <div className="md:bg-background-auth w-full h-screen md:bg-cover flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col rounded-3xl bg-neutral-100 md:w-1/3 md:h-[688px] items-center px-20 py-16">
        <img src={rahnamaLogo} className="w-28 h-15" />

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

        {state === "LOGIN" ? <LoginComponent /> : <p>setayesh</p>}
      </div>
    </div>
  );
}
