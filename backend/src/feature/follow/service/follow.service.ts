import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IFollowRepository } from "../repository/follow.repo";
import { ProfileId, Username } from "@CommonTypes/profile.type";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import {
  FollowRequestDTO,
  FollowRequestResponseDTO,
  FollowResponseDTO,
} from "../dto/follow.dto";
import { Follow } from "../repository/entities/follow.entity";
import { INotificationRepository } from "@feature/notification/repository/notification.repo";
import { NotificationEventEmitter } from "@feature/notification/event-handler/notification-event";
import { convertFileNameToURL } from "@utils/utils";
import { IFollowRequestRepository } from "../repository/follow-request.repo";
import { IBlockProfilesRepository } from "@feature/profile-manager/repository/blocked-profiles.repo";

interface Dependencies {
  followRepo: IFollowRepository;
  followRequestRepo: IFollowRequestRepository;
  profileRepo: IProfileRepository;
  notificationRepo: INotificationRepository;
  blockRepo: IBlockProfilesRepository;
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

    const isBlocked = await this.deps.blockRepo.isBlocked(
      follower.id,
      following.id
    );
    if (isBlocked) {
      throw new ClientError(strings.USER_IS_BLOCKED, 403);
    }
    const isBlockedTheOtherWay = await this.deps.blockRepo.isBlocked(
      following.id,
      follower.id
    );
    if (isBlockedTheOtherWay) {
      throw new ClientError(strings.USER_IS_BLOCKED, 403);
    }

    if (following.isPrivate) {
      const followRequest =
        await this.deps.followRequestRepo.getFollowRequestByBoth(
          follower.id,
          following.id
        );
      if (followRequest) {
        throw new ClientError(strings.FOLLOW_REQUEST_IS_ALREADY_SENT);
      }

      const newFollowRequest =
        await this.deps.followRequestRepo.createFollowRequest(
          follower,
          following
        );
      this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST", {
        requestor: follower,
        target: following,
        action: "requested",
      });

      return { message: strings.FOLLOW_REQUEST_SENT };
    } else {
      const newFollow = new Follow();
      newFollow.follower = follower;
      newFollow.following = following;

      await this.deps.followRepo.followProfile(newFollow);

      this.deps.notificationEventEmitter.emit("FOLLOW_NOTIFICATION", {
        followedBy: follower,
        target: following,
        action: "follow",
      });

      return { message: strings.FOLLOWED_SUCCESSFULLY };
    }
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
    const authUser = await this.deps.profileRepo.getById(id);
    let targetUser;

    if (!authUser) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    if (username && authUser?.username !== username) {
      targetUser = await this.deps.profileRepo.getByUsername(username);

      if (!targetUser) {
        throw new ClientError(strings.USER_NOT_FOUND);
      }

      const isBlocked = await this.deps.blockRepo.isBlocked(
        targetUser.id,
        authUser.id
      );
      const isBlockedTheOtherWay = await this.deps.blockRepo.isBlocked(
        authUser.id,
        targetUser.id
      );
      if (isBlocked || isBlockedTheOtherWay) {
        throw new ClientError(strings.USER_IS_BLOCKED, 403);
      }

      if (targetUser.isPrivate) {
        const isFollowed = await this.deps.followRepo.getFollowByTwoProfile(
          authUser,
          targetUser
        );
        if (!isFollowed) {
          throw new ClientError(strings.USER_IS_NOT_FOLLOWED, 403);
        }
      }
    }

    const follow = await this.deps.followRepo.getFollowingByProfileId(
      targetUser?.id || authUser.id,
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

  async getRecivedRequests(id: ProfileId, page: number, pageLimit: number) {
    const user = await this.deps.profileRepo.getById(id);
    if (!user) {
      throw new ClientError(strings.USER_NOT_FOUND, 404);
    }

    const followRequests = await this.deps.followRequestRepo.getRecivedRequests(
      user.id,
      page,
      pageLimit
    );
    if (followRequests.length === 0) {
      throw new ClientError(strings.HAVE_NOT_ANY_FOLLOW_REQUEST, 404);
    }
    console.log("damn man");
    const result = await Promise.all(
      followRequests.map((i) => {
        const result: FollowRequestResponseDTO = {
          username: i.requester.username,
        };
        return result;
      })
    );

    return result;
  }

  async getSentRequest(id: ProfileId, page: number, pageLimit: number) {
    const user = await this.deps.profileRepo.getById(id);
    if (!user) {
      throw new ClientError(strings.USER_NOT_FOUND, 404);
    }

    const followRequests = await this.deps.followRequestRepo.getSentRequests(
      user.id,
      page,
      pageLimit
    );
    if (followRequests.length === 0) {
      throw new ClientError(strings.HAVE_NOT_ANY_FOLLOW_REQUEST, 404);
    }

    const result = await Promise.all(
      followRequests.map((i) => {
        const result: FollowRequestResponseDTO = {
          username: i.requested.username,
        };
        return result;
      })
    );

    return result;
  }

  async getFollower(
    id: ProfileId,
    username: Username | null,
    page: number,
    pagelimit: number
  ) {
    const authUser = await this.deps.profileRepo.getById(id);
    let targetUser;

    if (!authUser) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    if (username && authUser?.username !== username) {
      targetUser = await this.deps.profileRepo.getByUsername(username);

      if (!targetUser) {
        throw new ClientError(strings.USER_NOT_FOUND);
      }

      const isBlocked = await this.deps.blockRepo.isBlocked(
        targetUser.id,
        authUser.id
      );
      const isBlockedTheOtherWay = await this.deps.blockRepo.isBlocked(
        authUser.id,
        targetUser.id
      );
      if (isBlocked || isBlockedTheOtherWay) {
        throw new ClientError(strings.USER_IS_BLOCKED, 403);
      }

      if (targetUser.isPrivate) {
        const isFollowed = await this.deps.followRepo.getFollowByTwoProfile(
          authUser,
          targetUser
        );
        if (!isFollowed) {
          throw new ClientError(strings.USER_IS_NOT_FOLLOWED, 403);
        }
      }
    }

    const follow = await this.deps.followRepo.getFollowerByProfileId(
      targetUser?.id || authUser.id,
      page,
      pagelimit
    );
    if (!follow) {
      throw new ClientError(strings.HAVE_NOT_ANY_FOLLOWER, 404);
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

  async cancelFollowRequest(
    currentProfileId: ProfileId,
    followRequestDTO: FollowRequestDTO
  ) {
    const currentProfile =
      await this.deps.profileRepo.getById(currentProfileId);
    const following = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!currentProfile || !following) {
      throw new ClientError(strings.USER_NOT_FOUND, 404);
    }

    if (currentProfile.username === following.username) {
      throw new ClientError(strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
    }

    const followRequest =
      await this.deps.followRequestRepo.getFollowRequestByBoth(
        currentProfile.id,
        following.id
      );
    if (!followRequest) {
      throw new ClientError(strings.FOLLOW_REQUEST_NOT_FOUND, 404);
    }

    await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

    this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST", {
      requestor: currentProfile,
      target: following,
      action: "canceled",
    });
  }

  async rejectFollowRequest(
    currentProfileId: ProfileId,
    followRequestDTO: FollowRequestDTO
  ) {
    const currentProfile =
      await this.deps.profileRepo.getById(currentProfileId);
    const follower = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!currentProfile || !follower) {
      throw new ClientError(strings.USER_NOT_FOUND, 404);
    }

    if (currentProfile.username === follower.username) {
      throw new ClientError(strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
    }

    const followRequest =
      await this.deps.followRequestRepo.getFollowRequestByBoth(
        follower.id,
        currentProfile.id
      );
    if (!followRequest) {
      throw new ClientError(strings.FOLLOW_REQUEST_NOT_FOUND, 404);
    }

    await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

    this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST_RESULT", {
      requestedProfile: follower,
      target: currentProfile,
      action: "rejected",
    });
  }

  async acceptFollowRequest(
    currentProfileId: ProfileId,
    followRequestDTO: FollowRequestDTO
  ) {
    const currentProfile =
      await this.deps.profileRepo.getById(currentProfileId);
    const follower = await this.deps.profileRepo.getByUsername(
      followRequestDTO.followingUserName
    );

    if (!currentProfile || !follower) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }

    if (currentProfile.username === follower.username) {
      throw new ClientError(strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
    }

    const followRequest =
      await this.deps.followRequestRepo.getFollowRequestByBoth(
        follower.id,
        currentProfile.id
      );
    if (!followRequest) {
      throw new ClientError(strings.FOLLOW_REQUEST_NOT_FOUND);
    }

    if (
      await this.deps.followRepo.getFollowByTwoProfile(follower, currentProfile)
    ) {
      throw new ClientError(strings.USER_IS_ALREADY_FOLLOWED);
    }

    const newFollow = new Follow();
    newFollow.following = currentProfile;
    newFollow.follower = follower;

    await this.deps.followRepo.followProfile(newFollow);

    this.deps.notificationEventEmitter.emit("FOLLOW_NOTIFICATION", {
      followedBy: currentProfile,
      target: follower,
      action: "follow",
    });

    await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

    this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST_RESULT", {
      requestedProfile: currentProfile,
      target: follower,
      action: "accepted",
    });
  }

  //   async updateFollowRequest(
  //     followerId: ProfileId,
  //     updatedFollowRequest: UpdateFollowRequest
  //   ) {
  //     const currentProfile = await this.deps.profileRepo.getById(followerId);
  //     const otherProfile = await this.deps.profileRepo.getByUsername(
  //       updatedFollowRequest.followingUserName
  //     );
  //     console.log(currentProfile, otherProfile, updatedFollowRequest);
  //     if (!currentProfile || !otherProfile) {
  //       throw new ClientError(strings.USER_NOT_FOUND);
  //     }

  //     if (currentProfile.username === otherProfile.username) {
  //       throw new ClientError(strings.FOLLOWER_AND_FOLLOWING_IS_SAME);
  //     }

  //     const followRequest =
  //       await this.deps.followRequestRepo.getFollowRequestByBoth(
  //         otherProfile.id,
  //         currentProfile.id
  //       );
  //     console.log(followRequest);
  //     if (!followRequest) {
  //       throw new ClientError(strings.FOLLOW_REQUEST_NOT_FOUND);
  //     }
  //     console.log(updatedFollowRequest, " here 3");
  //     if (updatedFollowRequest.status === "accept") {
  //       if (
  //         await this.deps.followRepo.getFollowByTwoProfile(
  //           currentProfile,
  //           otherProfile
  //         )
  //       ) {
  //         throw new ClientError(strings.USER_IS_ALREADY_FOLLOWED);
  //       }
  //       const newFollow = new Follow();
  //       newFollow.following = currentProfile;
  //       newFollow.follower = otherProfile;

  //       await this.deps.followRepo.followProfile(newFollow);

  //       this.deps.notificationEventEmitter.emit("FOLLOW_NOTIFICATION", {
  //         followedBy: otherProfile,
  //         target: currentProfile,
  //         action: "follow",
  //       });
  //       console.log(followRequest.id);
  //       await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

  //       this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST_RESULT", {
  //         requestedProfile: otherProfile,
  //         target: currentProfile,
  //         action: "accepted",
  //       });

  //       return;
  //     } else if (updatedFollowRequest.status === "reject") {
  //       await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

  //       this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST_RESULT", {
  //         requestedProfile: otherProfile,
  //         target: currentProfile,
  //         action: "rejected",
  //       });

  //       return;
  //     } else if (updatedFollowRequest.status === "canceled") {
  //       await this.deps.followRequestRepo.deleteFollowRequest(followRequest.id);

  //       this.deps.notificationEventEmitter.emit("FOLLOW_REQUEST", {
  //         requestor: otherProfile,
  //         target: currentProfile,
  //         action: "canceled",
  //       });

  //       return;
  //     }
  //   }
}
