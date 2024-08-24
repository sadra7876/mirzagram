export interface SignUpValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  accessToken: string;
}
