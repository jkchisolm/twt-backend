import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  handle: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
