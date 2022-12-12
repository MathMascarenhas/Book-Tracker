import { IBook } from 'src/book/entities/book.entity';

export class Genre {
  id: string;
  name: string;
  books: IBook[];
}
