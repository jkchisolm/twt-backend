import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TweetsService as TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-post.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Tweet } from './entities/tweet.entity';
import { User } from '../users/entities/user.entity';

@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new tweet' })
  @ApiBody({ type: CreateTweetDto })
  @ApiResponse({
    status: 201,
    description: 'Created a new tweet',
    type: Tweet,
  })
  create(@Body() createPostDto: CreateTweetDto) {
    return this.tweetsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all tweets' })
  @ApiResponse({
    status: 200,
    description: 'All tweets in the database',
    type: [Tweet],
  })
  findAll() {
    return this.tweetsService.findAll();
  }

  @ApiOperation({ summary: 'Returns a single tweet' })
  @ApiResponse({
    status: 200,
    description: 'A single tweet',
    type: Tweet,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(+id);
  }

  @Get('author/:id')
  @ApiOperation({ summary: 'Returns all tweets by a given author' })
  @ApiResponse({
    status: 200,
    description: 'All tweets by a given author',
    type: [Tweet],
  })
  findByAuthor(@Param('id') id: string) {
    return this.tweetsService.findByAuthor(+id);
  }

  @Get('authorInfo/:id')
  @ApiOperation({ summary: 'Gets the information of the author of a tweet' })
  @ApiResponse({
    status: 200,
    description: 'The information of the author of a tweet',
    type: User,
  })
  findAuthorInfo(@Param('id') id: string) {
    return this.tweetsService.findAuthorInfo(+id);
  }

  @ApiOperation({ summary: 'Deletes a tweet' })
  @ApiResponse({
    status: 200,
    description: 'The deleted tweet',
    type: Tweet,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tweetsService.remove(+id);
  }
}
