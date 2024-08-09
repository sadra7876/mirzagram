import MirzaButton from "../../Shared/Components/MirzaButton";
import MirzaMenuButton from "../../Shared/Components/MirzaMenuButton";
import PlusIcon from "../../assets/images/Icons/plus.svg";

import PinIcon from "../../assets/images/Icons/pin.svg";
import SavedIcon from "../../assets/images/Icons/saved.svg";
import SpeachIcon from "../../assets/images/Icons/speech.svg";
import BellIcon from "../../assets/images/Icons/bell.svg";
import TagIcon from "../../assets/images/Icons/Tag.svg";

export default function MainPage() {
  return (
    <div className="grid h-screen grid-cols-[310px_1fr] bg-neutral-100 pr-14 pt-10">
      {/* right sidebar */}
      <div className="flex flex-col items-center pt-10">
        <MirzaButton
          title="ایجاد پست جدید"
          onClick={() => console.log("new post")}
          icon={<img src={PlusIcon} alt="Plus Icon" />}
        />
        <div className="mt-8 flex h-full w-full flex-col items-center rounded-t-2xl border bg-white py-10">
          <div className="flex flex-row">
            <div className="rounded-full bg-neutral-400 shadow-md">aa</div>
            <p>mahnaz</p>
          </div>
          <MirzaMenuButton
            title="صفحه من"
            icon={<img src={PinIcon} alt="pin icon" />}
            onClick={() => console.log("aaa")}
          />
          <MirzaMenuButton
            title="ذخیره‌‌ها"
            icon={<img src={SavedIcon} alt="pin icon" />}
            onClick={() => console.log("aaa")}
          />

          <MirzaMenuButton
            title="پیام‌ها"
            icon={<img src={SpeachIcon} alt="pin icon" />}
            onClick={() => console.log("aaa")}
          />
          <MirzaMenuButton
            title="اعلانات"
            icon={<img src={BellIcon} alt="pin icon" />}
            onClick={() => console.log("aaa")}
          />
          <MirzaMenuButton
            title="تگ‌ شده‌ها"
            icon={<img src={TagIcon} alt="pin icon" />}
            onClick={() => console.log("aaa")}
          />
          <hr className="my-8 h-px w-full border-0 bg-gray-300" />
          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <MirzaMenuButton
                title="اکسپلور"
                icon={<img src={TagIcon} alt="pin icon" />}
                onClick={() => console.log("aaa")}
              />
              <MirzaMenuButton
                title="جستجو"
                icon={<img src={TagIcon} alt="pin icon" />}
                onClick={() => console.log("aaa")}
              />
            </div>
            <MirzaMenuButton
              title="بیشتر"
              icon={<img src={TagIcon} alt="pin icon" />}
              onClick={() => console.log("aaa")}
            />
          </div>
        </div>
      </div>
      {/* left sidebar */}
      <div className="flex flex-col items-start"></div>
    </div>
  );
}
