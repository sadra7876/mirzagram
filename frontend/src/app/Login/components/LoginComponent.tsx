import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
import MirzaButton from "../../../Shared/Components/MirzaButton";
export default function LoginComponent() {
  return (
    <div className="mr-0 w-full content-center py-6">
      <p
        dir="rtl"
        className="w-400 leading-24px text-right text-sm text-amber-950"
      >
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خود‌تون رو وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput placeholder="نام کاربری/ایمیل" inputIcon={GmailIcon} />
        <MirzaInput placeholder="رمز عبور" inputIcon={keyIcon} />
      </div>
      <label className="flex flex-row-reverse items-end gap-2 text-center text-xs">
        <input type="checkbox" className="h-3 w-3 rounded-[4px]" />
        مرا به خاطر بسپار
      </label>
      <MirzaButton title="ورود" onClick={() => console.log("click me")} />
    </div>
  );
}
