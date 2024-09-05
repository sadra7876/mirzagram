import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const getProfile = async (
  username?: string,
): Promise<UserProfileModel> => {
  let url = "profile";

  if (username) {
    url += `?username=${username}`;
  }

  const response = await axiosInstance.get(url);

  return response as UserProfileModel;
};
