import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Created a new user',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. User already exists',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = this.usersService.create(createUserDto);
    if (result) {
      res.status(201).send(result);
      return result;
    } else {
      res.status(400).send('User already exists.');
      return undefined;
    }
    // return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users in the database.',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The user with the given id',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: undefined,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The deleted user',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: undefined,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
