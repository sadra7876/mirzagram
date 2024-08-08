import { IProfileRepository } from "../repository/profile.repo";
// import { IProfileRepository } from "@repository/profile.repo";
import { HttpError } from "@utils/http-error";
import { SigninDTO } from "feature/auth/dto";
import jwt from "jsonwebtoken";
// import { HttpError } from "../../../utils/http-error";
import dotenv from "dotenv-flow";
import { verifyPassword } from "../../auth/utils/password.utils";
dotenv.config();

interface dependencies {
  profileRepo: IProfileRepository;
}

export class ProfileService {
  constructor(private readonly deps: dependencies) {}
}
