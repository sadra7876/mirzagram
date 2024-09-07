import axiosInstance from "../../api/axiosInstance";

export const Postlikepost = async (postId: string): Promise<void> => {
  const url = "post/like";
  const response = await axiosInstance.post(url, { postId });
};
