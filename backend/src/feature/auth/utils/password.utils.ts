import bcrypt from "bcrypt";
import { Password } from "@CommonTypes/profile.type";

export const passwordMatch = (
  password: Password,
  confirmPassword: Password
): boolean => {
  return password === confirmPassword;
};

export const hashPassword = async (password: Password): Promise<Password> => {
  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword as Password;
};

export const verifyPassword = async (
  password: Password,
  hashedPassword: Password
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
