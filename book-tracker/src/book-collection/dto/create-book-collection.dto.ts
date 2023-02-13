import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBookCollectionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(25, { message: 'The list title is too long' })
  name: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
