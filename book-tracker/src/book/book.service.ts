import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto): Promise<IBook> {
    return await this.bookRepository.createBook(createBookDto);
  }

  async findAll(): Promise<IBook[]> {
    return await this.bookRepository.findAllBooks();
  }

  async findOne(bookId: string): Promise<IBook> {
    return await this.bookRepository.findBookById(bookId);
  }

  async update(updateBookDto: UpdateBookDto): Promise<IBook> {
    return await this.bookRepository.updateBook(updateBookDto);
  }

  async remove(bookId: string): Promise<boolean> {
    const bookDeleted = await this.bookRepository.deleteBook(bookId);
    if (bookDeleted) {
      return true;
    } else {
      throw new Exception(
        Exceptions.InvalidData,
        'Book not found in the database',
      );
    }
  }
}
