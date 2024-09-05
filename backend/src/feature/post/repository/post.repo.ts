import { DataSource, Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { ProfileId } from "@CommonTypes/profile.type";

export interface IPostRepository {
  createOrUpdatePost(post: Post): Promise<string>;
  getPost(id: string): Promise<Post | null>;
  getPostsByProfile(id: ProfileId): Promise<Post[] | null>;
  getPostCountByProfile(profileId: ProfileId): Promise<number>;
  getPostsByProfileIds(
    ids: ProfileId[],
    page: number,
    pagelimit: number
  ): Promise<Post[] | null>;
}

export class PostRepository implements IPostRepository {
  private readonly repository: Repository<Post>;

  constructor(ds: DataSource) {
    this.repository = ds.getRepository(Post);
  }

  async createOrUpdatePost(post: Post): Promise<string> {
    const result = await this.repository.save(post);
    return result.id;
  }

  async getPost(id: string): Promise<Post | null> {
    return this.repository.findOne({
      relations: [
        "owner",
        "contents",
        "hashtags",
        "mentions",
        "mentions.mentioningProfile",
        "mentions.mentionedProfile",
      ],
      where: {
        id,
      },
    });
  }

  getPostsByProfile(id: ProfileId): Promise<Post[] | null> {
    return this.repository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.contents", "content")
      .where("post.ownerId = :id", { id })
      .getMany();
  }

  async getPostCountByProfile(id: ProfileId): Promise<number> {
    return this.repository
      .createQueryBuilder("post")
      .where("post.ownerId = :id", { id })
      .getCount();
  }

  async getPostsByProfileIds(
    ids: ProfileId[],
    page: number,
    pagelimit: number
  ): Promise<Post[] | null> {
    const quryBuilder = this.repository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.contents", "content")
      .leftJoinAndSelect("post.owner", "profile")
      .where("post.ownerId IN (:...ids)", { ids })
      .orderBy("post.createdAt", "DESC");

    return quryBuilder
      .skip((page - 1) * pagelimit)
      .take(pagelimit)
      .getMany();
  }
}
