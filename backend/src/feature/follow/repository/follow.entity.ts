import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Profile } from "@feature/profile/repository/profile.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followerId" })
  follower: Profile;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followingId" })
  following: Profile;
}
