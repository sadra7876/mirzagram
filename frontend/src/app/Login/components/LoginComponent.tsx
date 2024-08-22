import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
import MirzaAuthLinks from "../../../Shared/Components/MirzaAuthLinks";
import arow from "../../../assets/images/Icons/arrow.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../Shared/Components/ToastComponent";
import axiosInstance from "../../../api/axiosInstance";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

interface FormValues {
  identifier: string;
  password: string;
}
export default function LoginComponent(props: { onClick: () => void }) {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    const response = await axiosInstance.post("auth/sign-in", data);
    if (response.data.isSuccess) {
      setTimeout(() => {
        localStorage.setItem("token", response.data.result.accessToken);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <form
      className="mr-0 w-full content-center py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="w-400 leading-24px text-right text-sm text-amber-950">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خود‌تون رو وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput
          name="identifier"
          type="text"
          register={register("identifier", { required: true })}
          placeholder="نام کاربری/ایمیل"
          inputIcon={GmailIcon}
        />
        <MirzaInput
          name="password"
          type="password"
          register={register("password", { required: true })}
          placeholder="رمز عبور"
          inputIcon={keyIcon}
        />
      </div>
      <label className="flex flex-row items-end gap-2 pb-4 text-center text-xs">
        <input type="checkbox" className="h-3 w-3 rounded-[4px]" />
        مرا به خاطر بسپار
      </label>
      <div>
        <MirzaButton type="submit" title="ورود" icon="" />
      </div>
      <div className="h-12 w-full items-center gap-9 py-12">
        <MirzaAuthLinks
          title="بازیابی رمز عبور"
          onClick={() => navigate("/passwordRecovery")}
          icon={arow}
        />
        <MirzaAuthLinks
          title="ثبت نام در میرزاگرام"
          onClick={() => props.onClick()}
          icon={arow}
        />
      </div>
    </form>
  );
}
