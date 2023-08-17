import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity('articles')
export class Article {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
  })
  author: User;
}
