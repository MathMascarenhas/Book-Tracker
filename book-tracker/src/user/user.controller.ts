import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Omit<IUserEntity,"password">> {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Omit<IUserEntity[],"password">> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Omit<IUserEntity,"password">> {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<Omit<IUserEntity,"password">> {
    try {
      const userData = { ...updateUser, id: userId };
      return await this.userService.update(userData);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
