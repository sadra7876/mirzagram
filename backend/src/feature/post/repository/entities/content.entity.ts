import { Profile } from "@feature/profile/repository/profile.entity"
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm"
import { Post } from "./post.entity"
import { ProfileId } from "@CommonTypes/profile.type"

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    fileName: string

    @Column()
    order: number
    
    @ManyToOne(() => Profile)
    @JoinColumn()
    owner: Profile

    @ManyToOne(() => Post, (post) => post.contents)
    post: Post
}