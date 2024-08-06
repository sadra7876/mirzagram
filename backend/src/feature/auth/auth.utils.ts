import bcrypt from "bcrypt";

export const validatePassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
