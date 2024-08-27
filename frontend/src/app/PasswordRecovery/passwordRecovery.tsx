import rahnamaLogo from "../../assets/images/rahnema-logo.png";
import MirzaInput from "./../../Shared/Components/MirzaInput";
import UserIcon from "../../assets/images/Icons/user_icon.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetPasswordValue } from "../../model/resetPsswrord.interface";
import { postResetPassword } from "./api/postResetPassword";
export default function PasswordRecovery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValue>();
  const navigate = useNavigate();
  const onSubmit = async (data: ResetPasswordValue) => {
    const response = await postResetPassword(data);
    if (response) {
      setTimeout(() => {
        navigate("/resetPasswordLink");
      }, 100);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover"
    >
      <div className="flex h-456 w-485 flex-col items-center gap-8 rounded-3xl bg-neutral-100 px-20 py-16 md:h-[456] md:w-485">
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
            register={register("email", {
              required: "ایمیل یا نام کاربری الزامی است",
            })}
            placeholder="نام کاربری یا ایمیل"
            inputIcon={UserIcon}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
          <div className="flex flex-row items-center justify-end gap-x-2 py-8">
            <button
              onClick={() => navigate("/login")}
              className="flex-row bg-transparent text-black"
            >
              انصراف
            </button>
            <MirzaButton title="ارسال لینک بازیابی رمز عبور" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
}
