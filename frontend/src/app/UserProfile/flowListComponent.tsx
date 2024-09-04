import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import pic from "../../assets/images/picture_profile.jpg";
import { getFollowingList } from "./api/getFollower";
import { useUserProfile } from "../../context/UserProfileContext";
import { UserProfileModel } from "../../model/userProfile.interface";
import { Spinner } from "flowbite-react";
import { getFollowersList } from "./api/getFollowing";
export default function FlowListComponent(props: {
  isFollowing: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [flowList, setFlowList] = useState<UserProfileModel[]>();
  const { userProfile } = useUserProfile();

  const fetchFlowingList = async () => {
    if (!userProfile?.username) {
      console.error("Username is not defined");
      setLoading(false);
      return;
    }
    try {
      const followingList = await getFollowingList({
        username: userProfile?.username,
      });
      setFlowList(followingList);
    } catch (error) {
      // toast.error('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowersList = async () => {
    if (!userProfile?.username) {
      console.error("Username is not defined");
      setLoading(false);
      return;
    }
    try {
      const followersList = await getFollowersList({
        username: userProfile?.username!,
      });

      setFlowList(followersList);
    } catch (error) {
      // toast.error('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userProfile?.username) {
      if (props.isFollowing) {
        fetchFlowingList();
      } else {
        fetchFollowersList();
      }
    } else {
      setLoading(false);
    }
  }, [userProfile]);

  return (
    <>
      <p className="text-center">
        {props.isFollowing ? "دنبال کننده" : "دنبال شونده"}
      </p>
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : (
        flowList?.map((item, index) => (
          <div
            key={index}
            className="mx-auto rounded-xl border border-gray-100 bg-slate-50 p-4"
          >
            <div className="flex flex-row justify-between gap-4">
              <button className="text-gray-500 transition hover:text-gray-600">
                <span className="sr-only">Dismiss popup</span>
                <IoMdMore className="size-7 fill-red-600" />
              </button>
              <div className="flex flex-row-reverse items-center gap-x-2">
                <span className="size-16 overflow-hidden rounded-full">
                  <img
                    src={pic}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="flex-1">
                  <strong className="block font-medium text-gray-900">
                    {item.username}
                  </strong>
                  <p className="mt-1 text-sm text-gray-700">170 دنبال‌کننده</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
