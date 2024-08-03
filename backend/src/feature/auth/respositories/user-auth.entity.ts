import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class UserAuth {
  @Index({ unique: true })
  @PrimaryColumn()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  //   constructor(username: string, email: string, password: string) {
  //     this.username = username;
  //     this.email = email;
  //     this.password = password;
  //   }

  //   static create(data: Partial<UserAuth>) {
  //     const model = new UserAuth();
  //     Object.assign(model, data);
  //     return model;
  //   }
}
