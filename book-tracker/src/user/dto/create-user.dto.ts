import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsString({ message: 'Email should be a string' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'Password should be a string' })
  @MinLength(6, { message: 'password too short' })
  @ApiProperty()
  password: string;

  @IsString({ message: 'CPF should be a string' })
  @ApiProperty()
  cpf: string;

  @IsBoolean({ message: 'IsAdmin should be a boolean' })
  @ApiProperty()
  isAdmin: boolean;
}
