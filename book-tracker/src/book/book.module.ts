import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { BookRepository } from './book.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}
