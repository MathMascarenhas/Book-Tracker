import { ApiProperty } from '@nestjs/swagger';

export class AddBookToGenre {
  @ApiProperty()
  genreId: string;

  @ApiProperty()
  bookId: string;
}
