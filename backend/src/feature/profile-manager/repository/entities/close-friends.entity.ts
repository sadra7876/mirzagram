import { Profile } from "@feature/profile/repository/profile.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
// import { Profile } from ".";

@Entity()
export class CloseFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  profile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.id, { cascade: true })
  friend: Profile;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;
}
