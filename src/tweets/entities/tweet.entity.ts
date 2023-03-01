import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tweet {
  @ApiProperty({
    example: 1,
    description: "The tweet's automatically generated id.",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Hello World!',
    description: 'The text content of a tweet.',
  })
  @Column('text')
  body: string;

  @ApiProperty({
    example: new Date(),
    description: "The tweet's creation date.",
  })
  @CreateDateColumn()
  created_at: Date;

  // @ApiProperty({
  //   example: {
  //     id: 1,
  //     email: 'john@doe.com',
  //     name: 'John Doe',
  //     handle: 'johnDoe',
  //     created_at: '2021-01-01T00:00:00.000Z',
  //   },
  //   description: "The tweet's author.",
  // })
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ApiProperty({
    example: 1,
    description: "The tweet's author's id.",
  })
  @Column()
  authorId: number;
}
