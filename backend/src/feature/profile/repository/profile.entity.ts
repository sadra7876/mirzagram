import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  firstName?: string;

  @Column({
    nullable: true,
  })
  lastName?: string;

  @Column({
    default: false,
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
}
