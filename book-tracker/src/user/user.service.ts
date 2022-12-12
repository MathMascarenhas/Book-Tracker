import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
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
    const deletedUser = await this.userRepository.deleteUser(userId);
    if (deletedUser) {
      return true;
    } else {
      throw new Exception(
        Exceptions.InvalidData,
        'User not found in the database',
      );
    }
  }
}
