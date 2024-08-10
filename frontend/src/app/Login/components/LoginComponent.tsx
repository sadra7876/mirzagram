import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
import MirzaAuthLinks from "../../../Shared/Components/MirzaAuthLinks";
import arow from "../../../assets/images/Icons/arrow.svg";
import { useForm } from "react-hook-form";

interface FormValues {
  identifier: string;
  password: string;
}
export default function LoginComponent() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      className="mr-0 w-full content-center py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p
        dir="rtl"
        className="w-400 leading-24px text-right text-sm text-amber-950"
      >
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خود‌تون رو وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput
          name="identifier"
          type="email"
          register={register}
          placeholder="نام کاربری/ایمیل"
          inputIcon={GmailIcon}
        />
        <MirzaInput
          name="password"
          type="password"
          register={register}
          placeholder="رمز عبور"
          inputIcon={keyIcon}
        />
      </div>
      <label className="flex flex-row-reverse items-end gap-2 text-center text-xs">
        <input type="checkbox" className="h-3 w-3 rounded-[4px]" />
        مرا به خاطر بسپار
      </label>
      <div>
        <MirzaButton title="ورود" icon="" />
      </div>
      <div className="h-12 w-full items-center gap-9 py-12">
        <MirzaAuthLinks
          title="بازیابی رمز عبور"
          onClick={() => console.log("clickme")}
          icon={arow}
        />
        <MirzaAuthLinks
          title="ثبت نام در میرزاگرام"
          onClick={() => console.log("clickme")}
          icon={arow}
        />
      </div>
    </form>
  );
}
