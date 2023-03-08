import { Module } from '@nestjs/common';
import { TweetsService as TweetsService } from './tweets.service';
import { TweetsController as TweetsController } from './tweets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
