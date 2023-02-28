import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

const postArray = [
  {
    id: 1,
    body: 'This is a post.',
    created_at: new Date(),
    author: new User(),
  },
];

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            find: jest.fn((entity) => entity),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all posts', () => {
      jest.spyOn(repository, 'find').mockResolvedValue(postArray);
      expect(service.findAll()).resolves.toEqual(postArray);
    });
  });

  describe('findOne()', () => {
    describe('when post exists', () => {
      it('should return the post', () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(postArray[0]);
        expect(service.findOne(1)).resolves.toEqual(postArray[0]);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      });
    });
    describe("when post doesn't exist", () => {
      it('should return undefined', () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
        expect(service.findOne(1)).resolves.toBeUndefined();
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      });
    });
  });
});
