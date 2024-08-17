import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IFollowRepository } from "../repository/follow.repo";
import { ProfileId, Username } from "@CommonTypes/profile.type";
import { Profile } from "@feature/profile/repository/profile.entity";
import { HttpError } from "@utils/http-error";
import { strings } from "resources/strings";
import { FollowRequestDTO } from "../dto/follow.dto";
import { Follow } from "../repository/follow.entity";

interface dependencies {
  followRepo: IFollowRepository;
  profileRepo: IProfileRepository;
}

export class FollowService {
  constructor(private readonly deps: dependencies) {}

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

    if (follower === following) {
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
}
