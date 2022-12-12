import { Genre } from "src/genre/entities/genre.entity";

export interface IBook {
    id: string;
    title: string;
    description: string;
    author: string;
    pages: number;
    rate: number;
    price: number;
    genres: Genre[]
}
