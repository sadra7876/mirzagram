import { Entity, Column, PrimaryColumn } from "typeorm";
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
