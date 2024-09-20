import axiosInstance from "../../../api/axiosInstance";
import { PostDetails } from "../../../Shared/model/postDetails.interface";

export const getExplore = async (): Promise<PostDetails[]> => {
  const response = await axiosInstance.get(`/explore?page=1&pagelimit=100`);
  return response as unknown as PostDetails[];
};
