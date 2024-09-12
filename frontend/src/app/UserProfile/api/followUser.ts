import axiosInstance from "../../../api/axiosInstance";
export const postFollowUser = async ({
  username,
}: {
  username: string;
}): Promise<void> => {
  const url = `/follow/follow`;
  const data = { followingUserName: username };
  const response = await axiosInstance.post(url, data);
};
