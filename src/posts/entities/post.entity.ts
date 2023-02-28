import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
