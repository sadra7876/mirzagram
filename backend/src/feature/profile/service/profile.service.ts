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
import { Profile } from "../repository/profile.entity";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { IFollowRepository } from "@feature/follow/repository/follow.repo";
dotenv.config();

interface dependencies {
  profileRepo: IProfileRepository;
  postRepo: IPostRepository;
  followRepo: IFollowRepository;
}

export class ProfileService {
  constructor(private readonly deps: dependencies) {}

  async getUserProfile(id: ProfileId) {
    const user = await this.deps.profileRepo.getById(id);
    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }
    const postCount = await this.deps.postRepo.getPostCountByProfile(id);
    const followerCount =
      await this.deps.followRepo.getFollowerCountByPorofileId(id);
    const followingCount =
      await this.deps.followRepo.getFollowingCountByPorofileId(id);

    const result: ProfileResponseDTO = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isPrivate: user.isActive,
      bio: user.bio,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      postCount: postCount,
      followerCount: followerCount,
      followingCount: followingCount,
    };
    return result;
  }

  async updateUserProfile(profileDTO: profileRequestDTO, id: ProfileId) {
    const user = await this.deps.profileRepo.getById(id);
    if (profileDTO.password && profileDTO.confirmPassword) {
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
      user.isPrivate = profileDTO.isPrivate || user.isPrivate;
      user.bio = profileDTO.bio || user.bio;
      user.profilePicture = profileDTO.profilePicture || user.profilePicture;
      if (profileDTO.password && profileDTO.confirmPassword) {
        user.password = await hashPassword(profileDTO.password);
      }

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
    const postCount = await this.deps.postRepo.getPostCountByProfile(user.id);
    const followerCount =
      await this.deps.followRepo.getFollowerCountByPorofileId(user.id);
    const followingCount =
      await this.deps.followRepo.getFollowingCountByPorofileId(user.id);

    const result: ProfileResponseDTO = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isPrivate: user.isActive,
      bio: user.bio,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      postCount: postCount,
      followerCount: followerCount,
      followingCount: followingCount,
    };
    return result;
  }
}
