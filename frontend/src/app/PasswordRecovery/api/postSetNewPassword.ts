import axiosInstance from "../../../api/axiosInstance";
import { SetNewPasswordValue } from "../../../model/setpassword.interface";

export const postSetNewPassword = async (data: SetNewPasswordValue) => {
  const response = await axiosInstance.post("auth/reset-password", data);
  return response;
};
