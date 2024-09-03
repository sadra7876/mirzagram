import { ProfileId } from "@CommonTypes/profile.type";
import { INotificationRepository } from "../repository/notification.repo";
import { NotificationDTO } from "../dto/notification.dto";
import { convertFileNameToURL } from "@utils/utils";
import { strings } from "resources/strings";

interface Dependencies {
  notificationRepo: INotificationRepository;
}

export class NotificationService {
  constructor(private readonly deps: Dependencies) {}

  async getNotifications(profileId: ProfileId): Promise<NotificationDTO[]> {
    const likeNotifications = await this.getLikeNotifications(profileId);
    const mentionNotifications = await this.getMentionNotifications(profileId);
    const followNotifications = await this.getFollowNotifications(profileId);
    const followRequestNotifications =
      await this.getFollowRequestNotifications(profileId);
    const followRequestResultNotifications =
      await this.getFollowRequestResultNotifications(profileId);

    return [
      ...likeNotifications,
      ...mentionNotifications,
      ...followNotifications,
      ...followRequestNotifications,
      ...followRequestResultNotifications,
    ];
  }

  private async getFollowNotifications(profileId: ProfileId) {
    const notifications =
      await this.deps.notificationRepo.getFollowNotificationsByTarget(
        profileId
      );
    return notifications.map<NotificationDTO>((n) => {
      return {
        id: n.id,
        type: "FOLLOW",
        title: strings.FOLLOW_NOTIFICATION_TITLE(
          n.followedByProfile.firstName || "",
          n.followedByProfile.lastName || ""
        ),
        subtitle: n.createdAt.toDateString(),
        thumbnail: convertFileNameToURL(
          n.followedByProfile.profilePicture || "",
          "profile"
        ),
        isSeen: n.isRead,
      };
    });
  }

  private async getLikeNotifications(profileId: ProfileId) {
    const notifications =
      await this.deps.notificationRepo.getLikeNotificationsByTarget(profileId);
    return notifications.map<NotificationDTO>((n) => {
      return {
        id: n.id,
        type: "LIKE",
        title: strings.LIKE_NOTIFICATION_TITLE(
          n.likedByProfile.firstName || "",
          n.likedByProfile.lastName || ""
        ),
        subtitle: n.createdAt.toDateString(),
        thumbnail: convertFileNameToURL(
          n.likedPost.contents[0].fileName,
          "post"
        ),
        isSeen: n.isRead,
      };
    });
  }

  private async getMentionNotifications(profileId: ProfileId) {
    const notifications =
      await this.deps.notificationRepo.getMentionNotificationsByTarget(
        profileId
      );
    return notifications.map<NotificationDTO>((n) => {
      return {
        id: n.id,
        type: "MENTION",
        title: strings.MENTION_NOTIFICATION_TITLE(
          n.post.owner.firstName || "",
          n.post.owner.lastName || ""
        ),
        subtitle: n.createdAt.toDateString(),
        thumbnail: convertFileNameToURL(n.post.contents[0].fileName, "post"),
        isSeen: n.isRead,
      };
    });
  }

  private async getFollowRequestNotifications(profileId: ProfileId) {
    const notifications =
      await this.deps.notificationRepo.getFollowRequestNotificationsByTarget(
        profileId
      );
    return notifications.map<NotificationDTO>((n) => {
      return {
        id: n.id,
        type: "FOLLOW_REQUEST",
        title: strings.FOLLOW_REQUEST_NOTIFICATION_TITLE(
          n.requestorProfile.firstName || "",
          n.requestorProfile.lastName || ""
        ),
        subtitle: n.createdAt.toDateString(),
        thumbnail: convertFileNameToURL(
          n.requestorProfile.profilePicture || "",
          "profile"
        ),
        isSeen: n.isRead,
      };
    });
  }

  private async getFollowRequestResultNotifications(profileId: ProfileId) {
    const notifications =
      await this.deps.notificationRepo.getFollowRequestResultNotificationsByTarget(
        profileId
      );
    return notifications.map<NotificationDTO>((n) => {
      return {
        id: n.id,
        type: "FOLLOW_REQUEST",
        title: strings.FOLLOW_REQUEST_RESULT_NOTIFICATION_TITLE(
          n.requestedProfile.firstName || "",
          n.requestedProfile.lastName || ""
        ),
        subtitle: n.createdAt.toDateString(),
        thumbnail: convertFileNameToURL(
          n.requestedProfile.profilePicture || "",
          "profile"
        ),
        isSeen: n.isRead,
      };
    });
  }
}
