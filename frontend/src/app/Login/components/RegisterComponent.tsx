import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import UserIcon from "../../../assets/images/Icons/user_icon.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../Shared/Components/ToastComponent";
import axiosInstance from "../../../api/axiosInstance";
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
    watch,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await axiosInstance.post("auth/sign-up", data);

    if (response.data.isSuccess) {
      toast.success("حساب کاربری شما با موفقیت ایجاد شد");
      setTimeout(() => {
        localStorage.setItem("token", response.data.result.accessToken);
        navigate("/");
      }, 2000);
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
      <div className="flex flex-col justify-center py-8">
        <MirzaInput
          register={register("username", { required: true })}
          placeholder="نام کاربری"
          inputIcon={UserIcon}
        />
        {errors.username && (
          <span className="text-xs text-red-500">نام کاربری الزامی است</span>
        )}
        <MirzaInput
          name="email"
          type="email"
          register={register("email", { required: true })}
          placeholder="ایمیل"
          inputIcon={GmailIcon}
        />
        {errors.email && (
          <span className="text-xs text-red-500">ایمیل الزامی است</span>
        )}
        <MirzaInput
          type="password"
          name="password"
          register={register("password", { required: true })}
          placeholder="رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.password && (
          <span className="text-xs text-red-500">رمز عبور الزامی است</span>
        )}
        <MirzaInput
          type="password"
          name="confirmPassword"
          register={register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === watch("password") || "رمز عبور مطابقت ندارد",
          })}
          placeholder="تکرار رمز عبور"
          inputIcon={keyIcon}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <MirzaButton title="ثبت نام " icon="" />
    </form>
  );
}
