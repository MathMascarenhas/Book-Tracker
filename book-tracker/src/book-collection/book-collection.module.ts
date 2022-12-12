import { Module } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';
import { DatabaseModule } from 'src/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookCollectionController],
  providers: [BookCollectionService],
})
export class BookCollectionModule {}
