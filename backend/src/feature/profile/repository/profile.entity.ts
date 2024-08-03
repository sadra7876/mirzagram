import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn,
  } from "typeorm";
import { UserAuth } from "../../auth/respositories/user-auth.entity";
  
  @Entity()
  export class Profile {
    @PrimaryColumn()
    @OneToOne(() => UserAuth)
    @JoinColumn()
    id: string;

    @Column({
      unique: true
    })
    username: string 

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({
      default: true
    })
    isActive: boolean;
    
    @Column({
      default: false
    })
    isPrivate: boolean;

    @Column({
      nullable: true
    })
    bio: string;
  
    @Column()
    createdAt: Date;

    @Column()
    profilePicture: string;
  }