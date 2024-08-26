import { Profile } from "@feature/profile/repository/profile.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn()
  comment: Comment;

  @ManyToOne(() => Profile)
  @JoinColumn()
  user: Profile;
}
