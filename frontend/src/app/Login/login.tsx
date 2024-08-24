import { useState } from "react";
import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

type LoginRegistState = "LOGIN" | "REGISTER";
export default function LoginPage() {
  const [state, setState] = useState<LoginRegistState>("LOGIN");
  return (
    <div className="h-s flex w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover">
      <div className="flex h-full w-full flex-col items-center rounded-3xl bg-neutral-100 px-20 py-16 md:h-[688px] md:w-1/3">
        <img src={rahnamaLogo} className="h-15 w-28" />

        <div className="my-6 flex flex-row divide-black">
          <button
            className={`px-3 ${state === "LOGIN" ? "" : "text-gray-400"}`}
            onClick={() => setState("LOGIN")}
          >
            ورود
          </button>

          <hr className="h-full border border-gray-500" />

          <button
            className={`px-3 ${state === "REGISTER" ? "" : "text-gray-400"}`}
            onClick={() => setState("REGISTER")}
          >
            ثبت نام
          </button>
        </div>

        {state === "LOGIN" ? (
          <LoginComponent onClick={() => setState("REGISTER")} />
        ) : (
          <RegisterComponent />
        )}
      </div>
    </div>
  );
}
