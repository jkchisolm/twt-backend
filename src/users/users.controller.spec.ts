import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const updateUserDto: UpdateUserDto = {
  id: 1,
  name: 'Johnathan Doe',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'John Doe',
                email: 'john@doe.com',
                handle: 'johnDoe',
                created_at: new Date(),
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John Doe',
              email: 'john@doe.com',
              handle: 'johnDoe',
              created_at: new Date(),
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Johnathan Doe',
              email: 'john@doe.com',
              handle: 'johnDoe',
              created_at: new Date(),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all users', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find one user', () => {
      controller.findOne('1');
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    describe('given the user with given id exists', () => {
      it('should update the user', () => {
        controller.update('1', updateUserDto);
        expect(service.update).toHaveBeenCalled();
      });
    });
  });
});
