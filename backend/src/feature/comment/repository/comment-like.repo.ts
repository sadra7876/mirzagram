import { Repository } from "typeorm";
import { ProfileId } from "@CommonTypes/profile.type";
import { CommentLike } from "./entity/comment-like.entity";

export interface ICommentLikeRepository {
    addLikeToComment(like: CommentLike): Promise<void>;
    removeLikeFromComment(profileId: ProfileId, commentId: string): Promise<void>;
    getLikeCountForComment(commentId: string): Promise<number>;
}

export class CommentLikeRepository implements ICommentLikeRepository {

    constructor(private readonly repo: Repository<CommentLike>) {
        this.repo = repo;
    }

    async addLikeToComment(like: CommentLike): Promise<void> {
        await this.repo.save(like);
    }

    async removeLikeFromComment(profileId: ProfileId, commentId: string): Promise<void> {
        await this.repo.delete({
            user: {
                id: profileId
            },
            comment: {
                id: commentId
            }
        });
    }

    async getLikeCountForComment(commentId: string): Promise<number> {
        return await this.repo.count({
            where: {
                comment: {
                    id: commentId
                }
            }
        });
    }
}