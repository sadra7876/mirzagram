import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import MirzaInput from "./../../Shared/Components/MirzaInput";
import key from "../../assets/images/Icons/key.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "../../Shared/Components/ToastComponent";
import { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
interface FromValueSetNewPassword {
  password: string;
  confirmPassword: string;
}
export default function SetNewPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FromValueSetNewPassword>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      navigate("/login");
    }
  }, [location, navigate]);

  const onSubmit: SubmitHandler<FromValueSetNewPassword> = async (data) => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    try {
      const response = await fetch(`${BASE_URL}auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        result.messages.map((message: string) => {
          toast.error(message);
        });
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("There was a problem with the registration");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover"
    >
      <div className="h-456 w-485 md:w-485 flex flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[456]">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div
          dir="rtl"
          className="flex size-5 w-full flex-row justify-center py-2"
        >
          تنظیم رمز عبور جدید
        </div>

        <div dir="rtl" className="flex flex-col justify-center text-amber-950">
          لطفا رمز جدیدی برای حساب خود انتخاب کنید:
        </div>
        <div className="flex w-full flex-col items-end justify-center">
          <MirzaInput
            name="password"
            type="password"
            register={register("password", { required: true })}
            placeholder="رمز عبور جدید"
            inputIcon={key}
          />
          <MirzaInput
            name="confirmPassword"
            type="password"
            register={register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "رمز عبور مطابقت ندارد",
            })}
            placeholder="تکرار رمز عبور جدید"
            inputIcon={key}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
          <MirzaButton title="ثبت رمز عبور جدید" type="submit" />
        </div>
      </div>
    </form>
  );
}
