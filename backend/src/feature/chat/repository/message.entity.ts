import { Profile } from "@feature/profile/repository/profile.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Profile)
  from: Profile;

  @ManyToOne(() => Profile)
  to: Profile;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;
}
