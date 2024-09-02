import { DeleteResult, Repository } from "typeorm";
import {
  FollowNotification,
  FollowRequestResultNotification,
  FollowRequestNotification,
  LikeNotification,
  MentionNotification,
  Notification,
} from "./entity/notification.entity";
import { ProfileId } from "@CommonTypes/profile.type";

export interface INotificationRepository {
  insertLikeNotification(notif: LikeNotification): Promise<void>;
  removeLikeNotification(
    postId: string,
    likedByProfileId: ProfileId
  ): Promise<DeleteResult>;
  insertMentionNotification(notif: MentionNotification): Promise<void>;
  insertFollowNotification(notif: FollowNotification): Promise<void>;
  insertFollowRequestNotification(
    notif: FollowRequestNotification
  ): Promise<void>;
  insertFollowRequestResultNotification(
    notif: FollowRequestResultNotification
  ): Promise<void>;
  getLikeNotificationsByTarget(
    targetId: ProfileId
  ): Promise<LikeNotification[]>;
  getMentionNotificationsByTarget(
    targetId: ProfileId
  ): Promise<MentionNotification[]>;
  getFollowNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowNotification[]>;
  getFollowRequestNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowRequestNotification[]>;
  getFollowRequestResultNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowRequestResultNotification[]>;
}

interface Dependencies {
  repo: Repository<Notification>;
  likeRepository: Repository<LikeNotification>;
  followRequestRepository: Repository<FollowRequestNotification>;
  acceptedFollowRequestRepository: Repository<FollowRequestResultNotification>;
  mentionRepository: Repository<MentionNotification>;
  followRepository: Repository<FollowNotification>;
}

export class NotificationRepository implements INotificationRepository {
  constructor(private readonly deps: Dependencies) {}

  async getFollowRequestNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowRequestNotification[]> {
    return this.deps.followRequestRepository.find({
      where: {
        targetProfile: {
          id: targetId,
        },
      },
      relations: ["requestorProfile"],
    });
  }

  async getFollowRequestResultNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowRequestResultNotification[]> {
    return this.deps.acceptedFollowRequestRepository.find({
      where: {
        targetProfile: {
          id: targetId,
        },
      },
      relations: ["requestedProfile"],
    });
  }

  async insertFollowRequestResultNotification(
    notif: FollowRequestResultNotification
  ): Promise<void> {
    await this.deps.acceptedFollowRequestRepository.save(notif);
  }

  async insertFollowRequestNotification(
    notif: FollowRequestNotification
  ): Promise<void> {
    await this.deps.followRequestRepository.save(notif);
  }

  getLikeNotificationsByTarget(
    targetId: ProfileId
  ): Promise<LikeNotification[]> {
    return this.deps.likeRepository.find({
      where: {
        targetProfile: {
          id: targetId,
        },
      },
      relations: ["likedByProfile", "likedPost", "likedPost.contents"],
    });
  }

  getMentionNotificationsByTarget(
    targetId: ProfileId
  ): Promise<MentionNotification[]> {
    return this.deps.mentionRepository.find({
      where: {
        targetProfile: {
          id: targetId,
        },
      },
      relations: ["post", "post.contents", "post.owner"],
    });
  }

  getFollowNotificationsByTarget(
    targetId: ProfileId
  ): Promise<FollowNotification[]> {
    return this.deps.followRepository.find({
      where: {
        targetProfile: {
          id: targetId,
        },
      },
      relations: ["followedByProfile"],
    });
  }

  async insertFollowNotification(notif: FollowNotification): Promise<void> {
    await this.deps.followRepository.save(notif);
  }

  async removeLikeNotification(
    postId: string,
    likedByProfileId: ProfileId
  ): Promise<DeleteResult> {
    return this.deps.likeRepository
      .createQueryBuilder()
      .delete()
      .from(LikeNotification)
      .where("postId = :postId", { postId })
      .where("likedByProfileId = :likedByProfileId", { likedByProfileId })
      .execute();
  }

  async insertLikeNotification(notif: LikeNotification): Promise<void> {
    await this.deps.likeRepository.save(notif);
  }

  async insertMentionNotification(notif: MentionNotification): Promise<void> {
    await this.deps.mentionRepository.save(notif);
  }
}
