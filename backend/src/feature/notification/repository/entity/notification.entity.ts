import { Post } from "@feature/post/repository/entities/post.entity";
import { Profile } from "@feature/profile/repository/profile.entity";
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Profile)
  targetProfile: Profile;

  @Column({ default: false })
  isRead: boolean;
}

@ChildEntity()
export class LikeNotification extends Notification {
  @ManyToOne(() => Profile)
  likedByProfile: Profile;

  @ManyToOne(() => Post)
  likedPost: Post;
}

@ChildEntity()
export class FollowRequestNotification extends Notification {
  @ManyToOne(() => Profile)
  requestorProfile: Profile;
}

@ChildEntity()
export class FollowRequestResultNotification extends Notification {
  @ManyToOne(() => Profile)
  requestedProfile: Profile;
}

@ChildEntity()
export class FollowNotification extends Notification {
  @ManyToOne(() => Profile)
  followedByProfile: Profile;
}

@ChildEntity()
export class MentionNotification extends Notification {
  @ManyToOne(() => Post)
  post: Post;
}
