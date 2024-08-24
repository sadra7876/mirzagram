import axiosInstance from "../../../api/axiosInstance";
import { SignUpResponse, SignUpValue } from "../../../model/signup.intreface";

export const postSignUp = async (
  data: SignUpValue,
): Promise<SignUpResponse> => {
  const response: SignUpResponse = await axiosInstance.post(
    "auth/sign-up",
    data,
  );
  return response;
};
