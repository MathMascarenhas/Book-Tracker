import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookCollectionModule } from './book-collection/book-collection.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [ProfileModule, UserModule, BookModule, BookCollectionModule, GenreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
