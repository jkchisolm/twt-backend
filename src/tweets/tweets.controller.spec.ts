import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

describe('PostsController', () => {
  let controller: TweetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers: [TweetsService, { provide: TweetsService, useValue: {} }],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
