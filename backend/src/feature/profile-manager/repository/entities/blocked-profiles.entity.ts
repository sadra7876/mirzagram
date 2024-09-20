import { Profile } from "@feature/profile/repository/profile.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class BlockedProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  profile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  blocked: Profile;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;
}
