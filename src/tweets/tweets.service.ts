import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-post.dto';
import { Tweet } from './entities/tweet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  @Inject(UsersService)
  private usersService: UsersService;

  constructor(
    @InjectRepository(Tweet) private postsRepository: Repository<Tweet>,
  ) {}

  async create(createPostDto: CreateTweetDto) {
    // return 'This action adds a new post';
    // get author by author id
    const author = await this.usersService.findOne(createPostDto.authorId);

    const post = new Tweet();
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

  findByAuthor(authorId: number) {
    // Check if author exists
    const author = this.usersService.findOne(authorId);
    if (!author) {
      return undefined;
    }
    // Find all posts by author
    return this.postsRepository.find({ where: { authorId } });
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
