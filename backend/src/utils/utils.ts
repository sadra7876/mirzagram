import { Response } from "express";
import { signupDTO } from "../feature/auth/routes/dto/signup.dto";
import { UserAuth } from "../feature/auth/respositories/user-auth.entity";
import { v4 as uuidv4 } from "uuid";

export const handleHttpRequest = async <A>(
  res: Response,
  fn: () => Promise<A>
) => {
  try {
    res.send(await fn());
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};

export const validatePassword = (
  password: string,
  passwordconfrim: string
): boolean => {
  return password === passwordconfrim;
};

export const newUserAuth = (signupDTO: signupDTO): UserAuth => {
  const newUserAuth: UserAuth = {
    id: uuidv4(),
    username: signupDTO.username,
    email: signupDTO.email,
    password: signupDTO.password,
  };
  return newUserAuth;
};
