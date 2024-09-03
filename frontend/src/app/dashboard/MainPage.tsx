import MirzaButton from "../../Shared/Components/MirzaButton";
import MirzaMenuButton from "../../Shared/Components/MirzaMenuButton";
import PlusIcon from "../../assets/images/Icons/plus.svg";
import { useNavigate, Outlet } from "react-router-dom";
import PinIcon from "../../assets/images/Icons/pin.svg";
import { FaRegBookmark } from "react-icons/fa6";
import SpeachIcon from "../../assets/images/Icons/speech.svg";
import BellIcon from "../../assets/images/Icons/bell.svg";
import TagIcon from "../../assets/images/Icons/Tag.svg";
import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="grid h-full grid-cols-[310px_1fr] bg-neutral-100 pr-14 pt-10">
      {/* right sidebar */}
      <div className="flex flex-col items-center pt-10">
        <MirzaButton
          title="ایجاد پست جدید"
          // onClick={() => console.log("new post")}
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
            onClick={() => navigate("/profile")}
          />
          <MirzaMenuButton
            title="ذخیره‌‌ها"
            icon={<FaRegBookmark />}
            onClick={() => navigate("/messages")}
          />

          <MirzaMenuButton
            title="پیام‌ها"
            icon={<img src={SpeachIcon} alt="pin icon" />}
            onClick={() => {}}
          />
          <MirzaMenuButton
            title="اعلانات"
            icon={<img src={BellIcon} alt="pin icon" />}
            onClick={() => {}}
          />
          <MirzaMenuButton
            title="تگ‌ شده‌ها"
            icon={<img src={TagIcon} alt="pin icon" />}
            onClick={() => {}}
          />
          <hr className="my-8 h-px w-full border-0 bg-gray-300" />
          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <MirzaMenuButton
                title="اکسپلور"
                icon={<img src={TagIcon} alt="pin icon" />}
                onClick={() => {}}
              />
              <MirzaMenuButton
                title="جستجو"
                icon={<img src={TagIcon} alt="pin icon" />}
                onClick={() => {}}
              />
            </div>
            <MirzaMenuButton
              title="بیشتر"
              icon={<img src={TagIcon} alt="pin icon" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      {/* left sidebar */}
      {/*  */}
      <div className="flex flex-col items-start">
        <div className="flex w-full flex-row justify-end py-5 pb-20 pt-3">
          <img src={rahnemaLogo} />
        </div>
        <Outlet />
        {/* <DashboardPages /> */}
      </div>
    </div>
  );
};
export default DashboardLayout;
