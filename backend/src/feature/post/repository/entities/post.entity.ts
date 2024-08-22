import { Profile } from "@feature/profile/repository/profile.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Content } from "./content.entity";
import { Hashtag } from "./hashtag.entity";
import { Mention } from "./mention.entity";
import { ProfileId } from "@CommonTypes/profile.type";
import { Comment } from "@feature/comment/repository/entity/comment.entity";

@Entity()
export class Post {
  @Column()
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Profile)
  @JoinColumn()
  owner: Profile;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    nullable: true,
  })
  caption?: string;

  @OneToMany(() => Content, (c) => c.post, { cascade: true })
  @JoinTable()
  contents: Content[];

  @ManyToMany(() => Hashtag, { cascade: true })
  @JoinTable()
  hashtags?: Hashtag[];

    @OneToMany(() => Mention, (mention) => mention.post, { cascade: true })
    mentions: Mention[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
}
