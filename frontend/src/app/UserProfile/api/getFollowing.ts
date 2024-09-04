import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const getFollowersList = async ({
  username,
}: {
  username: string;
}): Promise<UserProfileModel[]> => {
  const response = await axiosInstance.get(
    `/follow/follower?username=${username}&page=1&pagelimit=10`,
  );

  return response as unknown as UserProfileModel[];
};
