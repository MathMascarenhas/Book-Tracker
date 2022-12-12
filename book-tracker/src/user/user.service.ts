import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return;
  }

  findAll() {
    return;
  }

  findOne(id: string) {
    return;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return;
  }

  remove(id: string) {
    return;
  }
}
