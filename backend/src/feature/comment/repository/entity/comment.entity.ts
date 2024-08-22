import { Post } from "@feature/post/repository/entities/post.entity"
import { Profile } from "@feature/profile/repository/profile.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CommentLike } from "./comment-like.entity"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    text: string

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post

    @OneToMany(() => Comment, (comment) => comment.repliedTo)
    replies: Comment[]

    @ManyToOne(() => Comment, (comment) => comment.replies)
    repliedTo: Comment

    @ManyToOne(() => Profile)
    @JoinColumn()
    author: Profile

    @OneToMany(() => CommentLike, (like) => like.comment)
    likes: CommentLike[]
}

export { CommentLike }
