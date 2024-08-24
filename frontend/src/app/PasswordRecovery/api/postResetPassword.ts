import axiosInstance from "../../../api/axiosInstance";
import { ResetPasswordValue } from "../../../model/resetPsswrord.interface";

export const postResetPassword = async (data: ResetPasswordValue) => {
  const response: ResetPasswordValue = await axiosInstance.post(
    "auth/forgot-password",
    data,
  );
  return response;
};
