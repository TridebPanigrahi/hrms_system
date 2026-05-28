import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: String;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => User, (user) => user.organization)
  users!: User[];
}
