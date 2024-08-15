import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";
import vector from "../../assets/images/Icons/Vector.jpg";
import MirzaButton from "../../Shared/Components/MirzaButton";
import profilePicture from "../../assets/images/Icons/picture frame.svg";

export default function UserProfile() {
  return (
    <div className="flex h-full w-full flex-col gap-6 px-78">
      <div>
        <div className="flex pb-8">صفحه من</div>
        <div className="grid grid-cols-3 items-center gap-8 md:grid-cols-[0.5fr_2fr_1fr]">
          <div className="h-[8.33rem] w-[8.33rem]">
            <img src={profilePicture} className="rounded-full"></img>
          </div>
          <div
            dir="rtl"
            className="flex h-full w-full flex-col items-start gap-y-4"
          >
            <div className="text-mirza-gold font-normal">mahmz@</div>
            <div className="text-xl font-bold">مهشید منزه</div>
            <div className="flex flex-row">
              <p className="text-mirza-orange text-sm font-normal">
                12 دنبال کننده
              </p>
              <span className="text-gray-400">|</span>
              <p className="text-mirza-orange">7دنبال شونده</p>
              <span className="text-gray-400">|</span>
              <p>19 پست</p>
            </div>
            <div dir="ltr">
              {" "}
              Lover, not a fighter, spreading ✌️all over the 🌎
            </div>
          </div>
          <MirzaButton title="ویرایش پروفایل" />
        </div>
      </div>

      <div className="h-full w-full flex-col gap-8 rounded-3xl border-2 text-sm font-normal">
        <div className="flex flex-col items-center gap-y-8 px-[298px] py-[222px] text-center">
          {" "}
          هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
          <MirzaButton className="gap-y-8" title="ایجاد پست جدید"></MirzaButton>
        </div>
      </div>
    </div>
  );
}
