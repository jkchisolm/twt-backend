import { ApiProperty } from '@nestjs/swagger';

export class CreateTweetDto {
  @ApiProperty({
    example: 'Hello World!',
    description: 'The content of the tweet.',
  })
  readonly body: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the tweet author.',
  })
  readonly authorId: number;
}
