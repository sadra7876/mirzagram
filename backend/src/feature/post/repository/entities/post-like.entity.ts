import { Profile } from "@feature/profile/repository/profile.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class PostLike {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  likedAt: Date;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
