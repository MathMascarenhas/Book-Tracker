import { IBookCollection } from "src/book-collection/entities/book-collection.entity";

export interface IProfile {
  id: string;
  username: string;
  imageUrl: string;
  bookCollections: IBookCollection[]
}
