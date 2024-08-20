import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Hashtag {
  @PrimaryColumn({ unique: true })
  tag: string;

  @Column({
    type: "timestamptz",
    default: new Date(),
  })
  createdAt: Date;
}
