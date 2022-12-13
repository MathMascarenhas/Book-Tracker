import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddBookToCollection {
  @ApiProperty()
  @IsString()
  collectionId: string;

  @ApiProperty()
  @IsString()
  bookId: string;
}
