import axiosInstance from "../../../api/axiosInstance";
import { ResponseBookmark } from "../../../model/bookmark.interface";

export const getBookmarks = async (): Promise<ResponseBookmark[]> => {
  const response = await axiosInstance.get(`/bookmark`);
  return response as unknown as ResponseBookmark[];
};
