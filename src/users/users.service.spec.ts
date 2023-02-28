import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

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

const createUserDto: CreateUserDto = {
  name: 'John Doe',
  email: 'john@doe.com',
  handle: 'johnDoe',
  password: 'password',
};

const updateUserDto = {
  id: 1,
  name: 'Johnathan Doe',
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

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    describe('given the user does not exist', () => {
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword' as any);
      it('should hash password correctly', async () => {
        await service.create(createUserDto);
        expect(bcrypt.hashSync).toHaveBeenCalledWith(
          createUserDto.password,
          10,
        );
      });
      it('should create a user with correct properties', async () => {
        await service.create(createUserDto);
        expect(repositoryMock.create).toHaveBeenCalledWith({
          ...createUserDto,
          password: 'hashedPassword',
        });
      });
      it('should save the user', async () => {
        jest.spyOn(repositoryMock, 'create').mockReturnValueOnce({
          ...createUserDto,
          password: 'hashedPassword',
        });
        await service.create(createUserDto);
        expect(repositoryMock.save).toHaveBeenCalledTimes(1);
        expect(repositoryMock.save).toHaveBeenCalledWith({
          ...createUserDto,
          password: 'hashedPassword',
        });
      });
    });
    describe('given the user already exists', () => {
      it('should return undefined', async () => {
        repositoryMock.findOne.mockReturnValue(user);
        await expect(service.create(createUserDto)).toEqual(undefined);
      });
    });
  });

  describe('findAll()', () => {
    it('should find all users', async () => {
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

  describe('update()', () => {
    it('should update a user if the user exists', async () => {
      repositoryMock.findOne.mockReturnValue(user);
      repositoryMock.save.mockReturnValue(user);
      expect(await service.update(1, updateUserDto)).toEqual({
        ...user,
        ...updateUserDto,
      });
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('should return undefined if the user does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(await service.update(0, user)).toBeUndefined();
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
      expect(repositoryMock.update).not.toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove a user if the user exists', async () => {
      repositoryMock.findOne.mockReturnValue(user);
      expect(await service.remove(1)).toEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repositoryMock.delete).toHaveBeenCalledWith({ id: 1 });
    });
    it('should return undefined if the user does not exist', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(await service.remove(0)).toBeUndefined();
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
      expect(repositoryMock.delete).not.toHaveBeenCalled();
    });
  });
});
