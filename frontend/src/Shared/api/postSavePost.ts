import axiosInstance from "../../api/axiosInstance";

export const postSavePost = async (postId: string): Promise<void> => {
  const url = "/bookmark";
  const response = await axiosInstance.post(url, { postId });
};
