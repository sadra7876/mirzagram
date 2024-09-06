import axiosInstance from "../../../api/axiosInstance";
import { ResponsePosts } from "../../../model/post.interface";

export const getUserPosts = async (): Promise<ResponsePosts[]> => {
  let url = "post";

  const response = await axiosInstance.get(url);

  return response as unknown as ResponsePosts[];
};
