import { EventEmitter } from "stream";
import { Post } from "@feature/post/repository/entities/post.entity";
import { Profile } from "@feature/profile/repository/profile.entity";
import { Mention } from "@feature/post/repository/entities/mention.entity";

export class NotificationEventEmitter extends EventEmitter<{
  POST_LIKE_NOTIFICATION: [LikeNotificationEvent];
  FOLLOW_NOTIFICATION: [FollowNotificationEvent];
  MENTION_NOTIFICATION: [MentionNotificationEvent];
  FOLLOW_REQUEST: [FollowRequestNotificationEvent];
  FOLLOW_REQUEST_RESULT: [FollowRequestResultNotificationEvent];
}> {}

export type LikeNotificationEvent = {
  action: "like" | "dislike";
  likedPost: Post;
  likedByProfile: Profile;
};

export type MentionNotificationEvent = {
  mentions: Mention[];
  post: Post;
  action: "mentioned" | "unmentioned";
};

export type FollowNotificationEvent = {
  followedBy: Profile;
  target: Profile;
  action: "follow" | "unfollow";
};

export type FollowRequestNotificationEvent = {
  requestor: Profile;
  target: Profile;
  action: "requested" | "canceled";
};

export type FollowRequestResultNotificationEvent = {
  requestedProfile: Profile;
  target: Profile;
  action: "accepted" | "rejected";
};
