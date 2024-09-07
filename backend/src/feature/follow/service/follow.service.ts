import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IFollowRepository } from "../repository/follow.repo";
import { ProfileId, Username } from "@CommonTypes/profile.type";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import { FollowRequestDTO, FollowResponseDTO } from "../dto/follow.dto";
import { Follow } from "../repository/follow.entity";
import { INotificationRepository } from "@feature/notification/repository/notification.repo";
import { NotificationEventEmitter } from "@feature/notification/event-handler/notification-event";
import { convertFileNameToURL } from "@utils/utils";

interface Dependencies {
  followRepo: IFollowRepository;
  profileRepo: IProfileRepository;
  notificationRepo: INotificationRepository;
  notificationEventEmitter: NotificationEventEmitter;
}

export class FollowService {
  constructor(private readonly deps: Dependencies) {}

  async followUser(followerId: ProfileId, followRequestDTO: FollowRequestDTO) {
    const follower = await this.deps.profileRepo.getById(followerId);
    const following = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!follower || !following) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    if (await this.deps.followRepo.getFollowByTwoProfile(follower, following)) {
      throw new ClientError(strings.USER_IS_ALREADY_FOLLOWED);
    }

    if (follower.username === following.username) {
      throw new ClientError(strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
    }

    const newFollow = new Follow();
    newFollow.follower = follower;
    newFollow.following = following;

    await this.deps.followRepo.followProfile(newFollow);

    this.deps.notificationEventEmitter.emit("FOLLOW_NOTIFICATION", {
      followedBy: follower,
      target: following,
      action: "follow",
    });
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
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    const newUnFollow = await this.deps.followRepo.getFollowByTwoProfile(
      follower,
      following
    );

    if (!newUnFollow) {
      throw new ClientError(strings.USER_IS_NOT_FOLLOWED);
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
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    const follow = await this.deps.followRepo.getFollowingByProfileId(
      user.id,
      page,
      pagelimit
    );
    if (!follow) {
      throw new ClientError(strings.HAVE_NOT_ANY_FOLLOWING);
    }

    const following = await Promise.all(
      follow.map((i) => this.deps.profileRepo.getById(i.following.id))
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
        profilePicture: convertFileNameToURL(i.profilePicture || "", "profile"),
        createdAt: i.createdAt,
      };
      return result;
    });

    return result;
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
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    const follow = await this.deps.followRepo.getFollowerByProfileId(
      user.id,
      page,
      pagelimit
    );
    if (!follow) {
      throw new ClientError(strings.HAVE_NOT_ANY_FOLLOWER);
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
        profilePicture: convertFileNameToURL(i.profilePicture || "", "profile"),
        createdAt: i.createdAt,
      };
      return result;
    });

    return result;
  }
}
