import axiosInstance from "../../../api/axiosInstance";
export const postUnFollowUser = async ({
  username,
}: {
  username: string;
}): Promise<void> => {
  const url = `/follow/unfollow`;
  const data = { followingUserName: username };
  const response = await axiosInstance.post(url, data);
};
