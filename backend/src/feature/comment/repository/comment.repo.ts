import { Equal, IsNull, Repository } from "typeorm";
import { Comment } from "./entity/comment.entity";

export interface ICommentRepository {
    createComment(comment: Comment): Promise<Comment>;
    getComment(id: string): Promise<Comment | null>;
    getPaginatedTopLevelCommentsForPost(postId: string, page: number, pageSize: number): Promise<Comment[]>;
    getPaginatedReplies(commentId: string, page: number, pageSize: number): Promise<Comment[]>;
}

export class CommentRepository implements ICommentRepository {

    constructor(private readonly repo: Repository<Comment>) {
        this.repo = repo;
    }

    async getComment(id: string): Promise<Comment | null> {
        return await this.repo.findOne({ 
            where: {
                id
            },
            relations: ["post"]
         });
    }

    async createComment(comment: Comment): Promise<Comment> {
        return await this.repo.save(comment);
    }

    async getPaginatedTopLevelCommentsForPost(postId: string, page: number, pageSize: number): Promise<Comment[]> {
        let items = await this.repo.findAndCount({
            where: {
                post: {
                    id: postId
                },
                repliedTo: IsNull()
            },
            relations: ["author", "post", "likes"],
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { id: "ASC" }
        });
        return items[0]
        // return await this.repo.find({
        //     where: {
        //         post: {
        //             id: postId
        //         }
        //     },
        //     relations: ["replies", "replies.post", "replies.author", "replies.likes", "post", "author", "likes"]
        // })
    }

    async getPaginatedReplies(commentId: string, page: number, pageSize: number): Promise<Comment[]> {
        let items = await this.repo.findAndCount({
            where: {
                repliedTo: {
                    id: commentId
                }
            },
            relations: ["author", "post", "likes"],
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { id: "ASC" }
        });
        return items[0]
    }
}