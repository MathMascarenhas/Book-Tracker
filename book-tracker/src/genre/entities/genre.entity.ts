import { IBook } from 'src/book/entities/book.entity';

export class IGenre {
  id: string;
  name: string;
  books: IBook[];
}
