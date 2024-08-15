import { IProfileRepository } from "../repository/profile.repo";
import dotenv from "dotenv-flow";
import {
  hashPassword,
  passwordMatch,
  verifyPassword,
} from "feature/auth/utils/password.utils";
import { ProfileId } from "types/profile.type";
import {
  ExploreRequestDTO,
  profileRequestDTO,
  ProfileResponseDTO,
} from "../dto/profile.dto";
import { HttpError } from "utils/http-error";
import { strings } from "resources/strings";
import omit from "lodash/omit";
import { Profile } from "../repository/profile.entity";
dotenv.config();

interface dependencies {
  profileRepo: IProfileRepository;
}

export class ProfileService {
  constructor(private readonly deps: dependencies) {}

  async getUserProfile(id: ProfileId) {
    const user = await this.deps.profileRepo.getById(id);
    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }
    const result: ProfileResponseDTO = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isPrivate: user.isActive,
      bio: user.bio,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    };
    return result;
  }

  async updateUserProfile(profileDTO: profileRequestDTO, id: ProfileId) {
    const user = await this.deps.profileRepo.getById(id);
    if (profileDTO.password) {
      if (!passwordMatch(profileDTO.password, profileDTO.confirmPassword)) {
        throw new HttpError(400, strings.PASSWORDS_DO_NOT_MATCH_ERROR);
      }
    }

    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }
    try {
      user.firstName = profileDTO.firstName || user.firstName;
      user.lastName = profileDTO.lastName || user.lastName;
      user.email = profileDTO.email || user.email;
      user.password =
        (await hashPassword(profileDTO.password)) || user.password;
      user.isPrivate = profileDTO.isPrivate || user.isPrivate;
      user.bio = profileDTO.bio || user.bio;
      user.profilePicture = profileDTO.profilePicture || user.profilePicture;

      await this.deps.profileRepo.createOrUpdate(user);
    } catch (e) {
      console.log(e);
      throw new HttpError(500, strings.INTERNAL_SERVER_ERROR);
    }
  }
  async getExploreProfile(exploreRequestDTO: ExploreRequestDTO) {
    const user = await this.deps.profileRepo.getByUsername(
      exploreRequestDTO.username
    );
    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }
    const result: ProfileResponseDTO = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isPrivate: user.isActive,
      bio: user.bio,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    };
    return result;
  }
}
