import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IFollowRepository } from "../repository/follow.repo";
import { ProfileId, Username } from "@CommonTypes/profile.type";
import { HttpError } from "@utils/http-error";
import { strings } from "resources/strings";
import { FollowRequestDTO, FollowResponseDTO } from "../dto/follow.dto";
import { Follow } from "../repository/follow.entity";

interface Dependencies {
  followRepo: IFollowRepository;
  profileRepo: IProfileRepository;
}

export class FollowService {
  constructor(private readonly deps: Dependencies) {}

  async followUser(followerId: ProfileId, followRequestDTO: FollowRequestDTO) {
    const follower = await this.deps.profileRepo.getById(followerId);
    const following = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!follower || !following) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }

    if (await this.deps.followRepo.getFollowByTwoProfile(follower, following)) {
      throw new HttpError(404, strings.USER_IS_ALREADY_FOLLOWED);
    }

    if (follower.username === following.username) {
      throw new HttpError(404, strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
    }

    const newFollow = new Follow();
    newFollow.follower = follower;
    newFollow.following = following;

    await this.deps.followRepo.followProfile(newFollow);
  }

  async unFollowUser(
    followerId: ProfileId,
    followRequestDTO: FollowRequestDTO
  ) {
    const follower = await this.deps.profileRepo.getById(followerId);
    const following = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!follower || !following) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }

    const newUnFollow = await this.deps.followRepo.getFollowByTwoProfile(
      follower,
      following
    );

    if (!newUnFollow) {
      throw new HttpError(404, strings.USER_IS_NOT_FOLLOWED);
    }

    await this.deps.followRepo.unFollowProfile(newUnFollow);
  }

  async getFollowing(
    id: ProfileId,
    username: Username | null,
    page: number,
    pagelimit: number
  ) {
    let user;
    if (username) {
      user = await this.deps.profileRepo.getByUsername(username);
    } else {
      user = await this.deps.profileRepo.getById(id);
    }
    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }

    const follow = await this.deps.followRepo.getFollowingByProfileId(user.id);
    if (!follow) {
      throw new HttpError(404, strings.HAVE_NOT_ANY_FOLLOWING);
    }

    const following = await Promise.all(
      follow.map(
        async (i) => await this.deps.profileRepo.getById(i.following.id)
      )
    );

    const result = following.map((i) => {
      if (!i) return null;
      const result: FollowResponseDTO = {
        username: i.username,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        isActive: i.isActive,
        isPrivate: i.isPrivate,
        bio: i.bio,
        profilePicture: i.profilePicture,
        createdAt: i.createdAt,
      };
      return result;
    });

    return this.paginateResult(result, page, pagelimit);
  }

  async getFollower(
    id: ProfileId,
    username: Username | null,
    page: number,
    pagelimit: number
  ) {
    let user;
    if (username) {
      user = await this.deps.profileRepo.getByUsername(username);
    } else {
      user = await this.deps.profileRepo.getById(id);
    }
    if (!user) {
      throw new HttpError(404, strings.USER_NOT_FOUND);
    }

    const follow = await this.deps.followRepo.getFollowerByProfileId(user.id);
    if (!follow) {
      throw new HttpError(404, strings.HAVE_NOT_ANY_FOLLOWER);
    }

    const follower = await Promise.all(
      follow.map((i) => this.deps.profileRepo.getById(i.follower.id))
    );

    const result = follower.map((i) => {
      if (!i) return null;
      const result: FollowResponseDTO = {
        username: i.username,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        isActive: i.isActive,
        isPrivate: i.isPrivate,
        bio: i.bio,
        profilePicture: i.profilePicture,
        createdAt: i.createdAt,
      };
      return result;
    });

    return this.paginateResult(result, page, pagelimit);
  }

  private paginateResult<T>(array: T[], page: number, pagelimit: number): T[] {
    if (page < 1 || pagelimit < 1) return [];

    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / pagelimit);

    if (page > totalPages) return [];

    const startIndex = (page - 1) * pagelimit;
    const endIndex = Math.min(startIndex + pagelimit, totalItems);

    return array.slice(startIndex, endIndex);
  }
}
