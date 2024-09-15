import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {
  Password,
  Username,
  Email,
  ProfileId,
} from "../../../types/profile.type";
import { Follow } from "@feature/follow/repository/follow.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("increment")
  id: ProfileId;

  @Column({ unique: true })
  username: Username;

  @Column({ unique: true })
  email: Email;

  @Column()
  password: Password;

  @Column({
    nullable: true,
  })
  firstName?: string;

  @Column({
    nullable: true,
  })
  lastName?: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    default: false,
  })
  isPrivate: boolean;

  @Column({
    type: "text",
    nullable: true,
  })
  bio?: string;

  @Column({
    nullable: true,
  })
  profilePicture?: string;

  @Column({
    type: "timestamptz",
  })
  createdAt: Date;

  @OneToMany(() => Follow, (f) => f.following)
  followers: Follow[];

  @OneToMany(() => Follow, (f) => f.follower)
  followings: Follow[];
}
