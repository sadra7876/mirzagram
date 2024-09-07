import MirzaButton from "../../Shared/Components/MirzaButton";
import MirzaMenuButton from "../../Shared/Components/MirzaMenuButton";
import PlusIcon from "../../assets/images/Icons/plus.svg";
import { useNavigate, Outlet } from "react-router-dom";
import PinIcon from "../../assets/images/Icons/pin.svg";
import { Modal } from "flowbite-react";
import Saved from "../../assets/images/Icons/saved.svg";
import explore from "../../assets/images/Icons/explore.svg";
import SpeachIcon from "../../assets/images/Icons/speech.svg";
import BellIcon from "../../assets/images/Icons/bell.svg";
import TagIcon from "../../assets/images/Icons/Tag.svg";
import { FaSearch } from "react-icons/fa";
import rahnemaLogo from "../../assets/images/rahnema-college-logo-fars1.png";
import More from "../../assets/images/Icons/more.svg";
import { useUserProfile } from "../../context/UserProfileContext";
import { useEffect, useState } from "react";
import UseProfileModal from "../UserProfile/useProfileModal";
import { getProfile } from "../UserProfile/api/getProfile";
import PostComponent from "../UserProfile/postComponent";

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
    <div className="grid h-full grid-cols-[310px_1fr] bg-neutral-100 pr-14 pt-10">
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
              src={userProfile?.profilePicture || "path/to/default/image.jpg"}
              alt="User Profile"
            />
            <p>{userProfile && userProfile.username}</p>
          </div>
          <MirzaMenuButton
            title="صفحه من"
            icon={<img src={PinIcon} alt="pin icon" />}
            onClick={() => navigate("/profile")}
          />
          <MirzaMenuButton
            title="ذخیره‌‌ها"
            icon={<img src={Saved} alt="save icon" />}
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
                icon={<img src={explore} alt="explore icon" />}
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
              icon={<img src={More} alt="pin icon" />}
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-neutral-100">
          <PostComponent onClose={() => setOpenModal(false)} />

          {/* <UseProfileModal
            onClose={() => {
              setOpenModal(false);
              fetchProfile();
            }}
            profile={userProfile!}
          /> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashboardLayout;
