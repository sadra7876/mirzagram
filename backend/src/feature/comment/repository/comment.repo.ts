import { IsNull, Repository } from "typeorm";
import { Comment } from "./entity/comment.entity";

export interface ICommentRepository {
  createComment(comment: Comment): Promise<Comment>;
  getComment(id: string): Promise<Comment | null>;
  getCommentCountByPostId(postId: string): Promise<number>;
  getPaginatedTopLevelCommentsForPost(
    postId: string,
    page: number,
    pageSize: number
  ): Promise<Comment[]>;
  getPaginatedReplies(
    commentId: string,
    page: number,
    pageSize: number
  ): Promise<Comment[]>;
}

export class CommentRepository implements ICommentRepository {
  constructor(private readonly repo: Repository<Comment>) {
    this.repo = repo;
  }

  async getComment(id: string): Promise<Comment | null> {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: ["post"],
    });
  }

  async getCommentCountByPostId(postId: string): Promise<number> {
    return this.repo
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.post", "post")
      .where("comment.postId = :postId", { postId })
      .getCount();
  }

  async createComment(comment: Comment): Promise<Comment> {
    return this.repo.save(comment);
  }

  async getPaginatedTopLevelCommentsForPost(
    postId: string,
    page: number,
    pageSize: number
  ): Promise<Comment[]> {
    const items = await this.repo.findAndCount({
      where: {
        post: {
          id: postId,
        },
        repliedTo: IsNull(),
      },
      relations: ["author", "post", "likes"],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: "ASC" },
    });
    return items[0];
  }

  async getPaginatedReplies(
    commentId: string,
    page: number,
    pageSize: number
  ): Promise<Comment[]> {
    const items = await this.repo.findAndCount({
      where: {
        repliedTo: {
          id: commentId,
        },
      },
      relations: ["author", "post", "likes"],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: "ASC" },
    });
    return items[0];
  }
}
