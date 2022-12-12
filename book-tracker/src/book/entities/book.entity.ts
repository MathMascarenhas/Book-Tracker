import { Decimal } from '@prisma/client/runtime';
import { IGenre } from 'src/genre/entities/genre.entity';

export interface IBook {
  id: string;
  title: string;
  description: string;
  author: string;
  pages: number;
  rate: Decimal;
  price: Decimal;
}
