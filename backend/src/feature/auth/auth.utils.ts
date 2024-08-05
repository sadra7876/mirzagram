import bcrypt from "bcrypt";

export const validatePassword = (
  password: string,
  passwordconfrim: string
): boolean => {
  return password === passwordconfrim;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  Password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(Password, hashedPassword);
  return isMatch;
};
