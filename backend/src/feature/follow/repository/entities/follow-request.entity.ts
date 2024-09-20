import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Profile } from "@feature/profile/repository/profile.entity";

@Entity()
export class FollowRequest {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  //   @JoinColumn({ name: "requester" })
  requester: Profile;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  //   @JoinColumn({ name: "requested" })
  requested: Profile;

  @CreateDateColumn()
  createdAt: Date;
}
