import { IProfileRepository } from "../repository/profile.repo";
import { SigninDTO } from "../routes/dto/signin.dto";
import jwt from 'jsonwebtoken';
import { HttpError } from "../../../utils/http-error";
import dotenv from "dotenv-flow";
import { comparePasswords } from "../../auth/auth.utils";
dotenv.config();

export class ProfileService {

  constructor(private readonly profileRepo: IProfileRepository) {}
  
  async signin(signinDTO: SigninDTO): Promise<string> {
    let user;
    if(signinDTO.username.indexOf("@")) {
      user = this.profileRepo.getByEmail(signinDTO.username);
    }
    user = await this.profileRepo.getByUsername(signinDTO.username);

    if(!user) {
      throw new HttpError(400, "User not found");
    }

    if(!await comparePasswords(signinDTO.password, user.password)) {
      throw new HttpError(400, "Username or password is wrong!");
    }

    const jwtPayload = {
      subjectId: user.id,
      username: user.username,
    }

    return jwt.sign(jwtPayload, process.env.JWT_SECRET!.toString());
  }
}
