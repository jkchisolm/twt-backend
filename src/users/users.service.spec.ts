import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const userArray = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    handle: 'johnDoe',
    created_at: new Date(),
  },
];

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  handle: 'johnDoe',
  created_at: new Date(),
};

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
    findOne: jest.fn(),
  }),
);

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
          // useValue: {
          //   find: jest.fn().mockResolvedValue(userArray),
          //   findOne: jest.fn().mockResolvedValue(user),
          // },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // repository = module.get<Repository<User>>(getRepositoryToken(User));
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all users', async () => {
      // const users = await service.findAll();
      // expect(users).toEqual(userArray);
      repositoryMock.find.mockReturnValue(userArray);
      expect(await service.findAll()).toEqual(userArray);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne()', () => {
    it('should return one user if found', async () => {
      repositoryMock.findOne.mockReturnValue(user);
      expect(await service.findOne(1)).toEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('should return undefined if user not found', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(await service.findOne(0)).toBeUndefined();
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
    });
  });
});
