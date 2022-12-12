import { IBookCollection } from 'src/book-collection/entities/book-collection.entity';

export interface IProfile {
  id: string;
  userId: string;
  username: string;
  imageUrl: string;
  bookCollections: IBookCollection[];
}
