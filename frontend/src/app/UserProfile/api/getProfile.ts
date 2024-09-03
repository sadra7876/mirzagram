import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const getProfile = async (
  username?: string,
): Promise<UserProfileModel> => {
  const response = await axiosInstance.get(
    `profile?${username && `username=${username}`}`,
  );

  return response as UserProfileModel;
};
