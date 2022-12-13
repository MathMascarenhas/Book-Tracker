import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/user/entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthService } from './auth.service';
import { IsAdminAuthorization } from './decorators/is-admin.decorator';
import { userLogged } from './decorators/user-logged.decorator';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    try {
      return await this.authService.validateUser(data);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  async getUser(@userLogged() user: IUserEntity) {
    return user;
  }
}
