import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { stringify } from 'querystring';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<IUserEntity> {
    try {
      const CreatedUser = await this.prisma.user.create({ data: user });
      return CreatedUser;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'this cpf or email already exists in the database',
      );
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    try {
      const allUsers = await this.prisma.user.findMany();
      return allUsers;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findUserById(userId: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findFirstOrThrow({
        where: { id: userId },
      });
      return foundUser;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'User could not be found in the database',
      );
    }
  }

  async updateUser(userData: UpdateUserDto): Promise<IUserEntity> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userData.id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteUser(userId: string): Promise<IUserEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'User not found in database',
      );
    }
  }
}
