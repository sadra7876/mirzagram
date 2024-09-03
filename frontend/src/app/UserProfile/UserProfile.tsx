import { useEffect, useState } from "react";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Modal } from "flowbite-react";
import PostComponent from "./postComponent";
import { UserProfileModel } from "../../model/userProfile.interface";
import { getProfile } from "./api/getProfile";
import UseProfileModal from "./useProfileModal";

export default function UserProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileModel>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPrivate: false,
    bio: "",
    username: "",
  });
  const fetchProfile = async () => {
    try {
      const userProfile = await getProfile();
      setProfile(userProfile);
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
    <div className="flex h-full w-full flex-col gap-6 px-78">
      <div>
        <div className="flex pb-8">صفحه من</div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 items-center gap-8 md:grid-cols-[0.5fr_2fr_1fr]">
            <div className="h-[8.33rem] w-[8.33rem]">
              <img
                src={profile.profilePicture && profile.profilePicture}
                className="rounded-full"
              ></img>
            </div>
            <div
              dir="rtl"
              className="flex h-full w-full flex-col items-start gap-y-4"
            >
              <p className="font-normal text-mirza-gold">{profile.username}</p>
              <p className="text-xl font-bold">
                {profile.firstName != null
                  ? `${profile.firstName} ${profile.lastName}`
                  : ""}
              </p>
              <div className="flex flex-row gap-x-3">
                <p className="text-sm font-normal text-mirza-orange">
                  {profile.followerCount} دنبال کننده
                </p>
                <span className="text-gray-400">|</span>
                <p className="text-mirza-orange">
                  {profile.followingCount}دنبال شونده
                </p>
                <span className="text-gray-400">|</span>
                <p>{profile.postCount} پست</p>
              </div>
              <div dir="ltr">{profile.bio}</div>
            </div>
            <MirzaButton
              title="ویرایش پروفایل"
              onClick={() => setOpenModal(true)}
            />
          </div>
        )}
      </div>

      <div className="h-full w-full flex-col gap-8 rounded-3xl border-2 text-sm font-normal">
        <div className="flex flex-col items-center gap-y-8 px-[298px] py-[222px] text-center">
          هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
          <MirzaButton
            onClick={() => setOpenModalPost(true)}
            className="gap-y-8"
            title="ایجاد پست جدید"
          ></MirzaButton>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-neutral-100 px-[90px]">
          <UseProfileModal
            onClose={() => {
              setOpenModal(false);
              fetchProfile();
            }}
            profile={profile}
          />
        </Modal.Body>
      </Modal>
      <Modal show={openModalPost} onClose={() => setOpenModalPost(false)}>
        <Modal.Body>
          <PostComponent onClose={() => setOpenModalPost(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
