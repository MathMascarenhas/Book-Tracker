import { Module } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { BookCollectionRepository } from './book-collection.repository';
import { PassportModule } from '@nestjs/passport';
import { BookService } from 'src/book/book.service';
import { BookRepository } from 'src/book/book.repository';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookCollectionController],
  providers: [
    BookCollectionService,
    BookCollectionRepository,
    BookService,
    BookRepository,
  ],
})
export class BookCollectionModule {}
