import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // Hash password
    const password = createUserDto.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    // create user
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Save user to database
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // find user
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      // update user
      Object.assign(user, updateUserDto);

      // save user
      this.usersRepository.save(user);

      // return updated user
      return user;
    } else {
      return undefined;
    }
  }

  remove(id: number) {
    // Find user
    const user = this.usersRepository.findOne({ where: { id } });
    if (user) {
      // Delete user
      this.usersRepository.delete({ id });
      return user;
    } else {
      return undefined;
    }

    // return `This action removes a #${id} user`;
  }
}
