import { IBook } from "src/book/entities/book.entity";

export interface IBookCollection {
    id: string;
    name: string;
    bookCollectiion: IBook[];
}
