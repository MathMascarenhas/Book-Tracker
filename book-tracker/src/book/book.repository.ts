import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook } from './entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(book: CreateBookDto): Promise<IBook> {
    try {
      const createdBook = await this.prisma.book.create({ data: book });
      return createdBook;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'A book with this title already exists in the database',
      );
    }
  }

  async findAllBooks(): Promise<IBook[]> {
    try {
      const findAllBooks = await this.prisma.book.findMany({
        include: { genres: true },
      });
      return findAllBooks;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findBookById(bookId: string): Promise<IBook> {
    try {
      const foundBook = await this.prisma.book.findFirstOrThrow({
        where: { id: bookId },
        include: { genres: true },
      });
      return foundBook;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Book could not be found in the database',
      );
    }
  }

  async updateBook(updateData: UpdateBookDto): Promise<IBook> {
    try {
      const updatedBook = await this.prisma.book.update({
        where: { id: updateData.id },
        data: updateData,
        include: { genres: true },
      });
      return updatedBook;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteBook(bookId: string): Promise<IBook> {
    try {
      const deletedBook = await this.prisma.book.delete({
        where: { id: bookId },
        include: { genres: true },
      });
      return deletedBook;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Book not found in the database',
      );
    }
  }
}
