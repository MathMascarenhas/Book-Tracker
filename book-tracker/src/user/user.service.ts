import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<IUserEntity,"password">> {
    const user = createUserDto;
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;

    const createdUser = await this.userRepository.createUser(user);
    delete createdUser.password;
    return createdUser;
  }

  async findAll(): Promise<Omit<IUserEntity[],"password">> {
    const users = await this.userRepository.findAllUsers();
    users.map((user) => delete user.password);
    return users;
  }

  async findOne(userId: string): Promise<Omit<IUserEntity,"password">> {
    const foundUser = await this.userRepository.findUserById(userId);
    delete foundUser.password;
    return foundUser;
  }

  async findUserByEmail(userEmail: string): Promise<Omit<IUserEntity,"password">> {
    const user = await this.userRepository.findUserByEmail(userEmail);
    return user;
  }

  async update(updateUserDto: UpdateUserDto): Promise<Omit<IUserEntity,"password">> {
    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
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
