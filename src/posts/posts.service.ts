import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  @Inject(UsersService)
  private usersService: UsersService;

  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    // return 'This action adds a new post';
    // get author by author id
    const author = await this.usersService.findOne(createPostDto.authorId);

    const post = new Post();
    post.body = createPostDto.body;
    post.authorId = author.id;

    // save post
    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    const post = this.postsRepository.findOne({ where: { id } });
    if (post) {
      return post;
    } else {
      return undefined;
    }
  }

  remove(id: number) {
    const post = this.postsRepository.findOne({ where: { id } });
    if (post) {
      this.postsRepository.delete(id);
      return post;
    } else {
      return undefined;
    }
  }
}
