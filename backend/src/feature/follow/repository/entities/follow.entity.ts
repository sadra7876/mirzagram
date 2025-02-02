import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Profile } from "@feature/profile/repository/profile.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Profile, (follower) => follower.followings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "followerId" })
  follower: Profile;

  @ManyToOne(() => Profile, (following) => following.followers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "followingId" })
  following: Profile;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
