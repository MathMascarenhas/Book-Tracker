import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { GenreRepository } from './genre.repository';
import { PassportModule } from '@nestjs/passport';
import { BookService } from 'src/book/book.service';
import { BookRepository } from 'src/book/book.repository';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository, BookService, BookRepository],
})
export class GenreModule {}
