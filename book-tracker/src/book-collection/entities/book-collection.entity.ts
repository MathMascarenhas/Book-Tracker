import { IBook } from 'src/book/entities/book.entity';

export interface IBookCollection {
  id: string;
  profileId: string;
  name: string;
  bookCollectiion: IBook[];
}
