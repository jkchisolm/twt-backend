import { ApiProperty } from '@nestjs/swagger';
import { Tweet } from '../../tweets/entities/tweet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: "The user's automatically generated id.",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john@doe.com',
    description: 'The email of the user.',
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column('text')
  name: string;

  @ApiProperty({ example: 'johnDoe', description: "The user's unique handle." })
  @Column('text', { unique: true })
  handle: string;

  @Column('text')
  password: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: "The user's creation date.",
  })
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Tweet, (post) => post.author)
  posts: Tweet[];
}
