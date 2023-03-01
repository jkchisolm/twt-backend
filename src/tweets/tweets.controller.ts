import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TweetsService as TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-post.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Tweet } from './entities/tweet.entity';

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
