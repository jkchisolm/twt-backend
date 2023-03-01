import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

const postArray = [
  {
    id: 1,
    body: 'This is a post.',
    created_at: new Date(),
    author: new User(),
  },
];

const createdPost = new Tweet();
createdPost.body = 'This is a post.';
createdPost.authorId = 1;

const createPostDto: CreateTweetDto = {
  body: 'This is a post.',
  authorId: 1,
};

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }),
);

describe('PostsService', () => {
  let service: TweetsService;
  let usersService: UsersService;
  let repository: MockType<Repository<Tweet>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetsService,
        {
          provide: getRepositoryToken(Tweet),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
    usersService = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(Tweet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a post', async () => {
      repository.create.mockReturnValue(postArray[0]);
      repository.save.mockReturnValue(postArray[0]);
      const user = new User();
      user.id = 1;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      expect(await service.create(createPostDto)).toEqual(postArray[0]);
      expect(repository.save).toHaveBeenCalledWith(createdPost);
    });
  });

  describe('findAll()', () => {
    it('should find all posts', async () => {
      repository.find.mockReturnValue(postArray);
      // expect(service.findAll()).resolves.toEqual(postArray);
      expect(await service.findAll()).toEqual(postArray);
    });
  });

  describe('findOne()', () => {
    describe('when post exists', () => {
      it('should return the post', async () => {
        repository.findOne.mockReturnValue(postArray[0]);
        // expect(service.findOne(1)).resolves.toEqual(postArray[0]);
        expect(await service.findOne(1)).toEqual(postArray[0]);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      });
    });
    describe("when post doesn't exist", () => {
      it('should return undefined', async () => {
        repository.findOne.mockReturnValue(undefined);
        expect(await service.findOne(1)).toBeUndefined();
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      });
    });
  });

  describe('findByAuthor()', () => {
    describe('when author exists', () => {
      it('should return the posts', async () => {
        repository.find.mockReturnValue(postArray);
        const user = new User();
        user.id = 1;
        jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
        expect(await service.findByAuthor(1)).toEqual(postArray);
        expect(repository.find).toHaveBeenCalledWith({
          where: { authorId: 1 },
        });
      });
      it('should return an empty array if no posts exist', async () => {
        repository.find.mockReturnValue([]);
        const user = new User();
        user.id = 1;
        jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
        expect(await service.findByAuthor(1)).toEqual([]);
        expect(repository.find).toHaveBeenCalledWith({
          where: { authorId: 1 },
        });
      });
    });
    describe("when author doesn't exist", () => {
      it('should return undefined', async () => {
        repository.find.mockReturnValue(undefined);
        expect(await service.findByAuthor(1)).toBeUndefined();
        expect(repository.find).not.toHaveBeenCalled();
      });
    });
  });

  describe('remove()', () => {
    describe('when post exists', () => {
      it('should remove the post', async () => {
        repository.findOne.mockReturnValue(postArray[0]);
        expect(await service.remove(1)).toEqual(postArray[0]);
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(repository.delete).toHaveBeenCalledWith(1);
      });
    });
    describe('when post does not exist', () => {
      it('should return undefined', async () => {
        repository.findOne.mockReturnValue(undefined);
        expect(await service.remove(0)).toBeUndefined();
        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
        expect(repository.delete).not.toHaveBeenCalled();
      });
    });
  });
});
