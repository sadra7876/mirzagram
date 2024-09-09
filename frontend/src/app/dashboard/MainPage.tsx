import MirzaButton from "../../Shared/Components/MirzaButton";
import MirzaMenuButton from "../../Shared/Components/MirzaMenuButton";
import PlusIcon from "../../assets/images/Icons/plus.svg";
import { useNavigate, Outlet } from "react-router-dom";
import { Modal } from "flowbite-react";

import { FaSearch } from "react-icons/fa";
import { GiPin } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdDashboard } from "react-icons/md";

import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";
import { useUserProfile } from "../../context/UserProfileContext";
import { useEffect, useState } from "react";
import UseProfileModal from "../UserProfile/useProfileModal";
import { getProfile } from "../UserProfile/api/getProfile";
import PostComponent from "../UserProfile/postComponent";
import DefaultProfilePic from "../../assets/images/defaultProfilePic.png";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUserProfile } = useUserProfile();
  const fetchProfile = async () => {
    try {
      const userProfile = await getProfile();

      setUserProfile(userProfile);
    } catch (error) {
      // toast.error('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-[310px_1fr] bg-neutral-100 pr-14 pt-10">
      {/* right sidebar */}
      <div className="flex flex-col items-center pt-10">
        <MirzaButton
          title="ایجاد پست جدید"
          onClick={() => setOpenModal(true)}
          icon={<img src={PlusIcon} alt="Plus Icon" />}
        />

        <div className="mt-8 flex h-full w-full flex-col items-center rounded-t-2xl border bg-white py-10">
          <div className="flex flex-row items-center gap-x-2">
            <img
              className="flex h-24 w-24 flex-col items-center justify-center rounded-full"
              src={userProfile?.profilePicture || DefaultProfilePic}
              alt="User Profile"
            />
            <p>{userProfile && userProfile.username}</p>
          </div>
          <MirzaMenuButton
            title="صفحه من"
            icon={<GiPin className="text-xl" />}
            onClick={() => navigate("/profile")}
          />
          <MirzaMenuButton
            title="ذخیره‌‌ها"
            icon={<IoMdBookmark className="text-xl" />}
            onClick={() => navigate("/bookmarks")}
          />

          <MirzaMenuButton
            title="پیام‌ها"
            icon={<BiSolidMessageRoundedDots className="text-xl" />}
            onClick={() => {}}
          />
          <MirzaMenuButton
            title="اعلانات"
            icon={<IoNotifications className="text-xl" />}
            onClick={() => {}}
          />
          <MirzaMenuButton
            title="تگ‌ شده‌ها"
            icon={<FaTag className="text-xl" />}
            onClick={() => {}}
          />
          <hr className="my-8 h-px w-full border-0 bg-gray-300" />
          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <MirzaMenuButton
                title="اکسپلور"
                icon={<MdDashboard className="text-2xl" />}
                onClick={() => {}}
              />
              <MirzaMenuButton
                title="جستجو"
                icon={<FaSearch className="text-xl" />}
                onClick={() => {}}
              />
            </div>
            <MirzaMenuButton
              title="بیشتر"
              icon={<TfiMenuAlt className="rotate-180 text-2xl" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      {/* left sidebar */}
      {/*  */}
      <div className="flex flex-col items-start">
        <div className="flex w-full flex-row justify-end py-5 pb-20 pl-4 pt-3">
          <img className="pl-8" src={rahnemaLogo} />
        </div>
        <Outlet />
        {/* <DashboardPages /> */}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-neutral-100">
          <PostComponent onClose={() => setOpenModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashboardLayout;
