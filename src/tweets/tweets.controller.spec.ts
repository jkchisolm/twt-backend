import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

describe('PostsController', () => {
  let controller: TweetsController;
  let service: TweetsService;

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
