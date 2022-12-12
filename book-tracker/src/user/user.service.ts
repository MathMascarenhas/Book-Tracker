import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<IUserEntity> {
    const user = createUserDto;
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  async findAll(): Promise<IUserEntity[]> {
    const users = await this.userRepository.findAllUsers();
    users.map((user) => delete user.password);
    return users;
  }

  async findOne(userId: string): Promise<IUserEntity> {
    const foundUser = await this.userRepository.findUserById(userId);
    delete foundUser.password;
    return foundUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<IUserEntity> {
    const updatedUser = await this.userRepository.updateUser(updateUserDto);
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(userId: string): Promise<boolean> {
    try {
      await this.userRepository.deleteUser(userId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
