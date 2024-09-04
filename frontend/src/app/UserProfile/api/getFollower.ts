import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const getFollowingList = async ({
  username,
}: {
  username: string;
}): Promise<UserProfileModel[]> => {
  const response = await axiosInstance.get(
    `/follow/following?username=${username}&page=1&pagelimit=10`,
  );

  console.log("getFlowingList", response);
  return response as unknown as UserProfileModel[];
};
