import rahnamaLogo from "../../assets/images/rahnema-logo.png";
export default function ResetLinkPassword() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:bg-background-auth md:bg-cover">
      <div className="h-300 w-485 md:w-485 flex flex-col items-center rounded-3xl bg-neutral-100 px-20 py-16 md:h-[300]">
        <img src={rahnamaLogo} className="h-15 w-28" />
        <div className="flex w-80 flex-row justify-center py-10 text-center text-xl font-normal leading-9">
          لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً ایمیل‌تون رو
          چک کنید.
        </div>
      </div>
    </div>
  );
}
