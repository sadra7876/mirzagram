import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Profile } from "../../profile/repository/profile.entity";
import { Email } from "@CommonTypes/profile.type";

@Entity()
export class ForgetPasswordToken {
  // @PrimaryGeneratedColumn("increment")
  // id: number;

  @PrimaryColumn({
    unique: true,
  })
  resetPasswordToken: string;

  @Column({
    type: "timestamptz",
  })
  expirationDate: Date;

  @Column({
    default: false,
  })
  expired: boolean;

  // @OneToOne(() => Profile)
  @Column()
  profileEmail: Email;
}
