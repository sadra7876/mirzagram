import { Post } from "@feature/post/repository/entities/post.entity";
import { Profile } from "@feature/profile/repository/profile.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  @JoinColumn()
  owner: Profile;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn()
  post: Post;
}
