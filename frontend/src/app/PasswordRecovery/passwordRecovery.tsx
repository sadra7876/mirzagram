import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import MirzaInput from "./../../Shared/Components/MirzaInput";
import Vector from "../../assets/images/Icons/Vector.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { useForm } from "react-hook-form";
export default function Display() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover"
    >
      <div className="w-485 h-456 md:w-485 flex flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[456]">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div
          dir="rtl"
          className="py-12flex-row flex size-5 w-full justify-center"
        >
          بازیابی رمز عبور
        </div>
        <div>
          <div
            dir="rtl"
            className="flex flex-col justify-center gap-y-6 py-8 text-amber-950"
          >
            لطفا نام کاربری یا ایمیل خودتون رو وارد کنید:
          </div>

          <MirzaInput
            name="email"
            placeholder="نام کاربری یا ایمیل"
            inputIcon={Vector}
            register={register}
          />
          <div className="flex flex-row items-center gap-2 py-8">
            <MirzaButton title="ارسال لینک بازیابی رمز عبور" type="submit" />
            <button className="flex-row bg-transparent text-black">
              انصراف
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
