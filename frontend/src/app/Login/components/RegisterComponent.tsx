import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import Vector from "../../../assets/images/Icons/Vector.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../Shared/Components/ToastComponent";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result.isSuccess) {
        toast.success("حساب کاربری شما با موفقیت ایجاد شد");
        setTimeout(() => {
          localStorage.setItem("token", result.result.accessToken);
          navigate("/dashboard");
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
      className="mr-0 w-full content-center py-6"
    >
      <p
        dir="rtl"
        className="w-400 leading-24px text-right text-sm text-amber-950"
      >
        برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput
          name="username"
          register={register}
          placeholder="نام کاربری"
          inputIcon={Vector}
        />
        <MirzaInput
          name="email"
          register={register}
          placeholder="ایمیل"
          inputIcon={GmailIcon}
        />
        <MirzaInput
          type="password"
          name="password"
          register={register}
          placeholder="رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.password && <span>رمز عبور الزامی است</span>}
        <MirzaInput
          type="password"
          name="confirmPassword"
          register={register}
          placeholder="تکرار رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>
      <MirzaButton title="ثبت نام " icon="" />
    </form>
  );
}
