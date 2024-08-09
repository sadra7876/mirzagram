import { IProfileRepository } from "../repository/profile.repo";
import dotenv from "dotenv-flow";
import {
  hashPassword,
  passwordMatch,
  verifyPassword,
} from "../../auth/utils/password.utils";
import { ProfileId } from "types/profile.type";
import { profileDTO } from "../routes/dto/profile.dto";
import { HttpError } from "@utils/http-error";
import { strings } from "resources/strings";
dotenv.config();

interface dependencies {
  profileRepo: IProfileRepository;
}

export class ProfileService {
  constructor(private readonly deps: dependencies) {}

  async getUserProfile(id: ProfileId) {
    return await this.deps.profileRepo.getById(id);
  }

  async updateUserProfile(profileDTO: profileDTO, id: ProfileId) {
    const user = await this.deps.profileRepo.getById(id);
    if (!passwordMatch(profileDTO.password, profileDTO.confirmPassword)) {
      throw new HttpError(400, strings.PASSWORDS_DO_NOT_MATCH_ERROR);
    }

    if (!user) {
      throw new HttpError(404, strings.RESET_PASSWORD_TOKEN_EXPIRED_ERROR);
    }
    try {
      user.firstName = profileDTO.firstName || user.firstName;
      user.lastName = profileDTO.lastName || user.lastName;
      user.email = profileDTO.email || user.email;
      user.password =
        (await hashPassword(profileDTO.password)) || user.password;
      user.isPrivate = profileDTO.isPrivate || user.isPrivate;
      user.bio = profileDTO.bio || user.bio;

      await this.deps.profileRepo.createOrUpdate(user);
    } catch (e) {
      console.log(e);
      throw new HttpError(500, strings.INTERNAL_SERVER_ERROR);
    }
  }
}
