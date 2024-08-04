import keyIcon from "../../../assets/images/Icons/key.jpg";
import GmailIcon from "../../../assets/images/Icons/gmail.jpg";
import MirzaInput from "../../../Shared/Components/MirzaInput";
export default function LoginComponent() {
  return (
    <div className="mr-0 w-full content-center py-6">
      <p className="w-400 leading-24px text-sm text-amber-950">
        به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز عبور
        خود‌تون رو وارد کنید:
      </p>
      <div className="flex flex-col justify-center gap-y-6 py-8">
        <MirzaInput placeholder="نام کاربری/ایمیل" inputIcon={GmailIcon} />
        <MirzaInput placeholder="رمز عبور" inputIcon={keyIcon} />
      </div>
    </div>
  );
}
