import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Storage {
  @PrimaryColumn()
  fileName: string;

  @Column({
    type: "timestamptz",
  })
  timeCreated: Date;
  @Column({
    default: "other",
  })
  uploadType: "post" | "profile" | "other";

  @Column()
  path: string;
}
