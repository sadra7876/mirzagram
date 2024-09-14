import axiosInstance from "../../../api/axiosInstance";
import { ResponsePosts } from "../../../model/post.interface";

export const getUserPosts = async (
  username?: string,
): Promise<ResponsePosts[]> => {
  let url = "post";

  if (username) {
    url += `?username=${username}`;
  }

  const response = await axiosInstance.get(url);

  return response as unknown as ResponsePosts[];
};
