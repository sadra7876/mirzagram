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

  @Column()
  profileEmail: Email;
}
