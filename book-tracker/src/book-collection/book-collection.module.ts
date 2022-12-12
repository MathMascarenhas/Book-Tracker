import { Module } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';

@Module({
  controllers: [BookCollectionController],
  providers: [BookCollectionService]
})
export class BookCollectionModule {}
