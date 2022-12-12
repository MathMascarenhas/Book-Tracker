import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { BookRepository } from './book.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
