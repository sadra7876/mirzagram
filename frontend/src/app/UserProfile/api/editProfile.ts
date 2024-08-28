import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const putProfile = async (
  profile: UserProfileModel,
): Promise<UserProfileModel> => {
  const response = await axiosInstance.put(`profile`, profile);

  return response as UserProfileModel;
};
