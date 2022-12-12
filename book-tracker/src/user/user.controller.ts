import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserEntity> {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @Get()
  async findAll(): Promise<IUserEntity[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUserEntity> {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<IUserEntity> {
    try {
      const userData = { ...updateUser, id: userId };
      return await this.userService.update(userData);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') userId: string): Promise<string> {
    try {
      await this.userService.remove(userId);
      return 'User deleted succeessfully';
    } catch (error) {
      HandleException(error);
    }
  }
}
