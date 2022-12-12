import { Module } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { BookCollectionRepository } from './book-collection.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BookCollectionController],
  providers: [BookCollectionService, BookCollectionRepository],
})
export class BookCollectionModule {}
