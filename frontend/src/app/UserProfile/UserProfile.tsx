import { useEffect, useState } from "react";
import MirzaButton from "../../Shared/Components/MirzaButton";
import { Modal } from "flowbite-react";
import PostComponent from "./postComponent";
import { UserProfileModel } from "../../model/userProfile.interface";
import { getProfile } from "./api/getProfile";
import UseProfileModal from "./useProfileModal";
import FlowListComponent from "./flowListComponent";
import { useUserProfile } from "../../context/UserProfileContext";
import { ResponsePosts } from "../../model/post.interface";
import { getUserPosts } from "./api/getPost";
import { IoImagesOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultProfilePic from "../../assets/images/defaultProfilePic.png";
import { jwtDecode } from "jwt-decode";
import { postFollowUser } from "./api/followUser";
import { postUnFollowUser } from "./api/unFollowUser";
export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract the query parameters you need
  const username = queryParams.get("username");

  const [openModal, setOpenModal] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);
  const [openModalFollowers, setOpenModalFollowers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<ResponsePosts[]>();
  const { setUserProfile } = useUserProfile();
  const [profile, setProfile] = useState<UserProfileModel>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPrivate: false,
    bio: "",
    username: "",
    id: 0,
  });
  const [isOtehrProfile, setIsOtherProfile] = useState(false);
  const fetchProfile = async () => {
    try {
      const reponseUserProfile = await getProfile(username ?? "");
      console.log("reponseUserProfile", reponseUserProfile);
      const responseUserPosts = await getUserPosts();
      setPosts(responseUserPosts);
      setProfile(reponseUserProfile);
      setUserProfile(reponseUserProfile);
    } catch (error) {
      // toast.error('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };
  const fetchOtherProfile = async () => {
    const decoded = jwtDecode(localStorage.getItem("token")!);
    try {
      const reponseUserProfile = await getProfile(username ?? "");
      console.log("reponseUserProfile", reponseUserProfile);
      if (decoded.sub != (reponseUserProfile.id ?? "").toString()) {
        setIsOtherProfile(true);
      }
      // const responseUserPosts = await getUserPosts();
      // setPosts(responseUserPosts);
      setProfile(reponseUserProfile);
    } catch (error) {
      // toast.error('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (username) {
      fetchOtherProfile();
    } else {
      fetchProfile();
    }
  }, []);

  const followUser = async () => {
    // Call the followUser API
    try {
      const response = await postFollowUser({ username: profile.username! });
      console.log("followUser response", response);
      // Update the profile state
      setProfile((prevProfile) => ({
        ...prevProfile,
        isFollowed: true,
      }));
    } catch (error) {
      // toast.error('Failed to follow
    }
  };
  const unFollowUser = async () => {
    // Call the followUser API
    try {
      const response = await postUnFollowUser({ username: profile.username! });
      console.log("followUser response", response);
      // Update the profile state
      setProfile((prevProfile) => ({
        ...prevProfile,
        isFollowed: false,
      }));
    } catch (error) {
      // toast.error('Failed to follow
    }
  };
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
                src={
                  profile.profilePicture && profile.profilePicture
                    ? profile.profilePicture
                    : DefaultProfilePic
                }
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
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (profile.followerCount! > 0) setOpenModalFollowers(true);
                  }}
                >
                  <p className="pt-4 text-sm font-normal text-mirza-orange">
                    {profile.followerCount} دنبال کننده
                  </p>
                </button>
                <span className="pt-4 text-gray-400">|</span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (profile.followingCount! > 0)
                      setOpenModalFollowing(true);
                  }}
                >
                  <p className="pt-4 text-sm font-normal text-mirza-orange">
                    {profile.followingCount}دنبال شونده
                  </p>
                </button>
                <span className="pt-4 text-gray-400">|</span>
                <p className="pt-4">{profile.postCount} پست</p>
              </div>
              <div dir="ltr">{profile.bio}</div>
            </div>
            {isOtehrProfile ? (
              profile.isFollowed ? (
                <MirzaButton title="دنبال شده" onClick={() => unFollowUser()} />
              ) : (
                <MirzaButton
                  title="دنبال کردن" // Follow
                  onClick={() => followUser()}
                />
              )
            ) : (
              <MirzaButton
                title="ویرایش پروفایل"
                onClick={() => setOpenModal(true)}
              />
            )}
          </div>
        )}
      </div>
      <hr />
      <div className="h-full w-full flex-col gap-8 rounded-3xl text-sm font-normal">
        {posts && posts?.length === 0 ? (
          <div className="flex flex-col items-center gap-y-8 px-[298px] py-[222px] text-center text-xl font-bold">
            هنوز هیچ پستی توی صفحه‌ات نذاشتی! <br /> بجنب تا دیر نشده
            <MirzaButton
              onClick={() => setOpenModalPost(true)}
              className="gap-y-8"
              title="ایجاد پست جدید"
            ></MirzaButton>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {posts?.map((post, index) => (
              <div
                key={index}
                onClick={() => navigate(`/singlePost?postId=${post.id}`)}
                className="group relative block size-60 cursor-pointer overflow-hidden rounded-3xl bg-black md:size-60"
              >
                <img
                  alt=""
                  src={post.thumbnail.url}
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />

                <div className="absolute left-0 p-5 sm:p-6 lg:p-8">
                  <IoImagesOutline className="size-6 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-neutral-100">
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
      <Modal
        dismissible
        show={openModalFollowing}
        onClose={() => setOpenModalFollowing(false)}
      >
        <Modal.Body>
          <FlowListComponent
            isFollowing={true}
            onClose={() => setOpenModalFollowing(false)}
          />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openModalFollowers}
        onClose={() => setOpenModalFollowers(false)}
      >
        <Modal.Body>
          <FlowListComponent
            isFollowing={false}
            onClose={() => setOpenModalFollowers(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
