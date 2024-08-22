import { DataSource } from "typeorm";
import nodemailer from "nodemailer";
import { Profile } from "feature/profile/repository/profile.entity";
import { AuthService } from "./feature/auth/service/auth.service";
import { ProfileService } from "./feature/profile/service/profile.service";
import { ProfileRepository } from "./feature/profile/repository/profile.repo";
import dotenv from "dotenv-flow";
import { TokenRepository } from "./feature/auth/repository/token.repo";
import { ForgetPasswordToken } from "feature/auth/repository/token.entity";
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
import { Comment, CommentLike } from "@feature/comment/repository/entity/comment.entity";
import { CommentLikeRepository } from "@feature/comment/repository/comment-like.repo";
dotenv.config();

// DataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
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
  ],
  subscribers: [],
  migrations: [],
});

// Mailer service
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // Set to true if using TLS
  auth: {
    user: "e417952c53db95",
    pass: "527a2f4dc9004d",
  },
});

// Repositories
const profileRepository = new ProfileRepository(AppDataSource);
const tokenRepository = new TokenRepository(AppDataSource);
const storageRepository = new StorageRepository(AppDataSource);
const postRepository = new PostRepository(AppDataSource);
const followRepository = new FollowRepository(AppDataSource);
const commentRepository = new CommentRepository(AppDataSource.getRepository<Comment>(Comment));
const commentLikeRepository = new CommentLikeRepository(AppDataSource.getRepository<CommentLike>(CommentLike));

// Services
export const authService = new AuthService({
  profileRepo: profileRepository,
  tokenRepo: tokenRepository,
});
export const profileService = new ProfileService({
  profileRepo: profileRepository,
  postRepo: postRepository,
  followRepo: followRepository,
});

export const storageService = new StorageService({
  storageRepo: storageRepository,
});
export const postService = new PostService(postRepository, profileRepository);

export const followService = new FollowService({
  followRepo: followRepository,
  profileRepo: profileRepository,
});
export const commentService = new CommentService({
  commentRepo: commentRepository,
  postRepo: postRepository,
  profileRepo: profileRepository,
  commentLikeRepo: commentLikeRepository,
})
