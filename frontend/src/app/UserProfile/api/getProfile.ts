import axiosInstance from "../../../api/axiosInstance";
import { UserProfileModel } from "../../../model/userProfile.interface";

export const getProfile = async (
  username?: string,
): Promise<UserProfileModel> => {
  // setLoading(true);

  const response = await axiosInstance.get(
    `profile?${username && `username=${username}`}`,
  );

  console.log("response", response);
  return response as UserProfileModel;
  // const response = await fetch(`${BASE_URL}profile`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // const result = await response.json();
  // if (result.isSuccess) {
  //   setProfile(result.result);
  // }
  // setLoading(false);
};
