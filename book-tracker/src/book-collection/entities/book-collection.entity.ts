import { Book } from '@prisma/client';

export interface IBookCollection {
  id: string;
  userId: string;
  name: string;
  books: Book[];
}
