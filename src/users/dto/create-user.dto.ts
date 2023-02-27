import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly handle: string;

  @IsString()
  readonly password: string;
}
