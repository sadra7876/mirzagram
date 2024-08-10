import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import MirzaInput from "./../../Shared/Components/MirzaInput";
import key from "../../assets/images/Icons/key.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { useForm } from "react-hook-form";
export default function SetNewPassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover"
    >
      <div className="flex h-456 w-485 flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[456] md:w-485">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div
          dir="rtl"
          className="flex size-5 w-full flex-row justify-center py-2"
        >
          تنظیم رمز عبور جدید
        </div>
        <div>
          <div>
            <div
              dir="rtl"
              className="flex flex-col justify-center gap-y-6 text-amber-950"
            >
              لطفا رمز جدیدی برای حساب خود انتخاب کنید:
            </div>
            <div className="flex flex-col justify-center gap-y-6 py-8">
              <MirzaInput placeholder="رمز عبور جدید" inputIcon={key} />
              <MirzaInput placeholder="تکرار رمز عبور جدید" inputIcon={key} />
              <MirzaButton
                title="ثبت رمز عبور جدید"
                onClick={() => console.log("click me")}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
