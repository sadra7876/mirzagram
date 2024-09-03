import { ProfileId } from "@CommonTypes/profile.type";
import { DeleteResult, Repository } from "typeorm";
import { PostLike } from "./entities/post-like.entity";

export interface IPostLikeRepository {
  getLike(profileId: ProfileId, postId: string): Promise<PostLike | null>;
  addLikeToPost(like: PostLike): Promise<void>;
  removeLikeFromPost(
    profileId: ProfileId,
    postId: string
  ): Promise<DeleteResult>;
  getLikeCountForPost(postId: string): Promise<number>;
  getPaginatedLikesForPost(
    postId: string,
    page: number,
    pageSize: number
  ): Promise<PostLike[]>;
}

export class PostLikeRepository implements IPostLikeRepository {
  constructor(private readonly repo: Repository<PostLike>) {
    this.repo = repo;
  }

  getLike(profileId: ProfileId, postId: string): Promise<PostLike | null> {
    return this.repo.findOne({
      where: {
        profile: {
          id: profileId,
        },
        post: {
          id: postId,
        },
      },
    });
  }

  async addLikeToPost(like: PostLike): Promise<void> {
    await this.repo.save(like);
  }

  async removeLikeFromPost(
    profileId: ProfileId,
    postId: string
  ): Promise<DeleteResult> {
    return this.repo.delete({
      profile: {
        id: profileId,
      },
      post: {
        id: postId,
      },
    });
  }

  async getLikeCountForPost(postId: string): Promise<number> {
    return this.repo.count({
      where: {
        post: {
          id: postId,
        },
      },
    });
  }

  async getPaginatedLikesForPost(
    postId: string,
    page: number,
    pageSize: number
  ): Promise<PostLike[]> {
    const items = await this.repo.findAndCount({
      where: {
        post: {
          id: postId,
        },
      },
      relations: ["profile"],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: "ASC" },
    });
    return items[0];
  }
}
