import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "../../user/entities/user.entity";
import { File } from "./file.entity";

@Entity("posts")
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  textContent: string;

  @Column("jsonb", {
    nullable: true,
    transformer: {
      to(value: object): string {
        return JSON.stringify(value);
      },
      from(value: string): object {
        return JSON.parse(value);
      },
    },
  })
  jsonContent?: object;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @OneToOne(() => File, (file) => file.path, { cascade: true, eager: true })
  @JoinColumn()
  imageContent: File;

  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
  })
  author: User;
}
