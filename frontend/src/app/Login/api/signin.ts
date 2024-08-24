import axiosInstance from "../../../api/axiosInstance";
import { LoginResponse, LoginValues } from "../../../model/login.interface";

export const postSignin = async (data: LoginValues): Promise<LoginResponse> => {
  const response: LoginResponse = await axiosInstance.post(
    "auth/sign-in",
    data,
  );
  return response;
};
