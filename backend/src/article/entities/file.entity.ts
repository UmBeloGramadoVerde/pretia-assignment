// file.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  contentType: string;

  @OneToOne(() => Article, (article) => article.imageContent)
  @JoinColumn()
  article: Article;
}
