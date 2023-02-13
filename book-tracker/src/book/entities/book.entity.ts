import { Decimal } from '@prisma/client/runtime';

export interface IBook {
  id: string;
  userId: string;
  title: string;
  description: string;
  author: string;
  pages: number;
  rate: Decimal;
  price: Decimal;
}
