import axiosInstance from "../../../api/axiosInstance";
import { toast } from "../../../Shared/Components/ToastComponent";
import { MirzaPost } from "../../../Shared/model/post.interface";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const postCreatePost = async (data: MirzaPost): Promise<boolean> => {
  const response = await axiosInstance.post("post", data);

  return true;
};
