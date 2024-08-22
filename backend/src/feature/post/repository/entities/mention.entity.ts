import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { Profile } from "@feature/profile/repository/profile.entity";

@Entity()
export class Mention {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Post, (post) => post.mentions)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Profile, (profile) => profile.id)
  @JoinColumn()
  mentionedProfile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.id)
  @JoinColumn()
  mentioningProfile: Profile;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;
}
