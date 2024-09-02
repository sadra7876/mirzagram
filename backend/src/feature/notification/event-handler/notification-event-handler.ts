/* eslint @typescript-eslint/no-unused-expressions: 0 */

import { IFollowRepository } from "@feature/follow/repository/follow.repo";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import {
  NotificationEventEmitter,
  LikeNotificationEvent,
  MentionNotificationEvent,
  FollowNotificationEvent,
  FollowRequestNotificationEvent,
  FollowRequestResultNotificationEvent,
} from "./notification-event";
import { INotificationRepository } from "../repository/notification.repo";
import {
  LikeNotification,
  MentionNotification,
  FollowNotification,
  FollowRequestNotification,
  FollowRequestResultNotification,
} from "../repository/entity/notification.entity";

interface Dependencies {
  notificationRepo: INotificationRepository;
  profileRepo: IProfileRepository;
  followRepo: IFollowRepository;
  notificationEventEmitter: NotificationEventEmitter;
}

export class NotificationEventHandler {
  constructor(private readonly deps: Dependencies) {
    this.handleNotificationEvents();
  }

  private async handleNotificationEvents() {
    this.deps.notificationEventEmitter.on(
      "POST_LIKE_NOTIFICATION",
      async (notification) => {
        notification.action === "like"
          ? this.handleLikeNotification(notification)
          : this.handleDislikeNotification(notification);
      }
    );

    this.deps.notificationEventEmitter.on(
      "MENTION_NOTIFICATION",
      async (notification) => {
        notification.action === "mentioned"
          ? this.handleMentionNotification(notification)
          : {};
      }
    );

    this.deps.notificationEventEmitter.on(
      "FOLLOW_NOTIFICATION",
      async (notification) => {
        notification.action === "follow"
          ? this.handleFollowNotification(notification)
          : {};
      }
    );

    this.deps.notificationEventEmitter.on(
      "FOLLOW_REQUEST",
      async (notification) => {
        notification.action === "requested"
          ? this.handleFollowRequestNotification(notification)
          : {};
      }
    );

    this.deps.notificationEventEmitter.on(
      "FOLLOW_REQUEST_RESULT",
      async (notification) => {
        notification.action === "accepted"
          ? this.handleAcceptedFollowRequestNotification(notification)
          : {};
      }
    );
  }

  private async handleLikeNotification(event: LikeNotificationEvent) {
    const followers = await this.deps.followRepo.getAllFollowerByProfileId(
      event.likedByProfile.id
    );
    if (followers) {
      followers.forEach(async (follower) => {
        const notification = new LikeNotification();
        notification.likedPost = event.likedPost;
        notification.likedByProfile = event.likedByProfile;
        notification.targetProfile = follower.follower;
        await this.deps.notificationRepo.insertLikeNotification(notification);
      });
    }
  }

  private async handleDislikeNotification(event: LikeNotificationEvent) {
    await this.deps.notificationRepo.removeLikeNotification(
      event.likedPost.id,
      event.likedByProfile.id
    );
  }

  private async handleMentionNotification(event: MentionNotificationEvent) {
    await Promise.all(
      event.mentions.map(async (m) => {
        const notification = new MentionNotification();
        notification.post = event.post;
        notification.targetProfile = m.mentionedProfile;
        await this.deps.notificationRepo.insertMentionNotification(
          notification
        );
      })
    );
  }

  private async handleFollowNotification(event: FollowNotificationEvent) {
    const notification = new FollowNotification();
    notification.followedByProfile = event.followedBy;
    notification.targetProfile = event.target;
    await this.deps.notificationRepo.insertFollowNotification(notification);
  }

  private async handleFollowRequestNotification(
    event: FollowRequestNotificationEvent
  ) {
    const notification = new FollowRequestNotification();
    notification.requestorProfile = event.requestor;
    notification.targetProfile = event.target;
    await this.deps.notificationRepo.insertFollowRequestNotification(
      notification
    );
  }

  private async handleAcceptedFollowRequestNotification(
    event: FollowRequestResultNotificationEvent
  ) {
    const notification = new FollowRequestResultNotification();
    notification.requestedProfile = event.requestedProfile;
    notification.targetProfile = event.target;
    await this.deps.notificationRepo.insertFollowRequestResultNotification(
      notification
    );
  }
}
