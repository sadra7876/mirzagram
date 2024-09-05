import { DataSource } from "typeorm";
import nodemailer from "nodemailer";
import { Profile } from "@feature/profile/repository/profile.entity";
import { AuthService } from "@feature/auth/service/auth.service";
import { ProfileService } from "@feature/profile/service/profile.service";
import { ProfileRepository } from "@feature/profile/repository/profile.repo";
// import dotenv from "dotenv-flow";
import { TokenRepository } from "@feature/auth/repository/token.repo";
import { ForgetPasswordToken } from "@feature/auth/repository/token.entity";
import { StorageRepository } from "@feature/storage/repository/storage.repo";
import { StorageService } from "@feature/storage/service/storage.service";
import { Storage } from "@feature/storage/repository/storage.entity";
import { PostService } from "@feature/post/service/post.service";
import { PostRepository } from "@feature/post/repository/post.repo";
import { Content } from "@feature/post/repository/entities/content.entity";
import { Hashtag } from "@feature/post/repository/entities/hashtag.entity";
import { Mention } from "@feature/post/repository/entities/mention.entity";
import { Post } from "@feature/post/repository/entities/post.entity";
import { FollowRepository } from "@feature/follow/repository/follow.repo";
import { FollowService } from "@feature/follow/service/follow.service";
import { Follow } from "@feature/follow/repository/follow.entity";
import { CommentRepository } from "@feature/comment/repository/comment.repo";
import { CommentService } from "@feature/comment/service/comment.service";
import {
  Comment,
  CommentLike,
} from "@feature/comment/repository/entity/comment.entity";
import { CommentLikeRepository } from "@feature/comment/repository/comment-like.repo";
import { BookmarkRepository } from "@feature/bookmark/repository/bookmark.repo";
import { Bookmark } from "@feature/bookmark/repository/bookmark.entity";
import { BookmarkService } from "@feature/bookmark/service/bookmark.service";
import { PostLikeRepository } from "@feature/post/repository/post-like.repo";
import { PostLike } from "@feature/post/repository/entities/post-like.entity";
import { MailerService } from "@feature/mailer/service/mailer.service";
import {
  Notification,
  LikeNotification,
  FollowRequestNotification,
  MentionNotification,
  FollowNotification,
  FollowRequestResultNotification,
} from "@feature/notification/repository/entity/notification.entity";
import { NotificationRepository } from "@feature/notification/repository/notification.repo";
import { NotificationService } from "@feature/notification/service/notification.service";
import { NotificationEventHandler } from "@feature/notification/event-handler/notification-event-handler";
import { NotificationEventEmitter } from "@feature/notification/event-handler/notification-event";
import { Explore } from "@feature/explore/service/explore.service";
import { appConfig } from "config";

// DataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT as unknown as number,
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASSWORD,
  database: appConfig.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Profile,
    ForgetPasswordToken,
    Storage,
    Post,
    Hashtag,
    Content,
    Mention,
    Follow,
    Comment,
    CommentLike,
    Bookmark,
    PostLike,
    Notification,
    LikeNotification,
    MentionNotification,
    FollowNotification,
    FollowRequestNotification,
    FollowRequestResultNotification,
  ],
  subscribers: [],
  migrations: [],
});

// Mailer service
export const transporter = nodemailer.createTransport({
  host: appConfig.SMTP_HOST,
  port: appConfig.SMTP_PORT,
  secure: false, // Set to true if using TLS
  auth: {
    user: appConfig.SMTP_USERNAME,
    pass: appConfig.SMTP_PASSWORD,
  },
});
const mailerService = new MailerService(transporter);

// Repositories
const profileRepository = new ProfileRepository(AppDataSource);
const tokenRepository = new TokenRepository(AppDataSource);
const storageRepository = new StorageRepository(AppDataSource);
const postRepository = new PostRepository(AppDataSource);
const followRepository = new FollowRepository(AppDataSource);
const commentRepository = new CommentRepository(
  AppDataSource.getRepository<Comment>(Comment)
);
const commentLikeRepository = new CommentLikeRepository(
  AppDataSource.getRepository<CommentLike>(CommentLike)
);
const bookmarkRepository = new BookmarkRepository(
  AppDataSource.getRepository<Bookmark>(Bookmark)
);
const postLikeRepository = new PostLikeRepository(
  AppDataSource.getRepository<PostLike>(PostLike)
);
const notificationRepository = new NotificationRepository({
  repo: AppDataSource.getRepository<Notification>(Notification),
  likeRepository:
    AppDataSource.getRepository<LikeNotification>(LikeNotification),
  followRequestRepository:
    AppDataSource.getRepository<FollowRequestNotification>(
      FollowRequestNotification
    ),
  mentionRepository:
    AppDataSource.getRepository<MentionNotification>(MentionNotification),
  followRepository:
    AppDataSource.getRepository<FollowNotification>(FollowNotification),
  acceptedFollowRequestRepository:
    AppDataSource.getRepository<FollowRequestResultNotification>(
      FollowRequestResultNotification
    ),
});

// Event emitters
export const notificationEventEmitter = new NotificationEventEmitter();
new NotificationEventHandler({
  notificationRepo: notificationRepository,
  profileRepo: profileRepository,
  followRepo: followRepository,
  notificationEventEmitter,
});

// Services
export const authService = new AuthService({
  profileRepo: profileRepository,
  tokenRepo: tokenRepository,
  mailerService,
});
export const profileService = new ProfileService({
  profileRepo: profileRepository,
  postRepo: postRepository,
  followRepo: followRepository,
});

export const storageService = new StorageService({
  storageRepo: storageRepository,
});
export const postService = new PostService({
  postLikeRepo: postLikeRepository,
  postRepo: postRepository,
  profileRepo: profileRepository,
  postLikeNotificationRepo: notificationRepository,
  notificationEventEmitter,
});

export const followService = new FollowService({
  followRepo: followRepository,
  profileRepo: profileRepository,
  notificationRepo: notificationRepository,
  notificationEventEmitter,
});
export const commentService = new CommentService({
  commentRepo: commentRepository,
  postRepo: postRepository,
  profileRepo: profileRepository,
  commentLikeRepo: commentLikeRepository,
});
export const bookmarkService = new BookmarkService({
  bookmarkRepo: bookmarkRepository,
  profileRepo: profileRepository,
  postRepo: postRepository,
});
export const notificationService = new NotificationService({
  notificationRepo: notificationRepository,
});
export const exploreService = new Explore({
  followRepo: followRepository,
  postRepo: postRepository,
  likeRepo: postLikeRepository,
  bookmarkRepo: bookmarkRepository,
  commentRepo: commentRepository,
});

//TODO:
namespace Services {}
