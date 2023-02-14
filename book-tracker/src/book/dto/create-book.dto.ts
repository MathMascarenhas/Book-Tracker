import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000, { message: 'Description too long' })
  description: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNumber()
  pages: number;

  @ApiProperty()
  @IsNumber()
  @Max(5, { message: 'The highest value for a rate is 5' })
  rate: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  userId?: string;
}
