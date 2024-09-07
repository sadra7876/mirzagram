import axiosInstance from "../../api/axiosInstance";

export const PostlikeComment = async (commentId: string): Promise<void> => {
  const url = "comment/like";
  const response = await axiosInstance.post(url, { commentId });
};
