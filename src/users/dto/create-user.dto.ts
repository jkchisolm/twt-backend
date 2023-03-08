import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Email of the user to be created',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user to be created.',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'johnDoe',
    description: 'Unique handle of the user to be created',
  })
  @IsString()
  readonly handle: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user to be created.',
  })
  @IsString()
  readonly password: string;
}
