import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookCollectionModule } from './book-collection/book-collection.module';
import { GenreModule } from './genre/genre.module';
import { DatabaseModule } from './prisma/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProfileModule,
    UserModule,
    BookModule,
    BookCollectionModule,
    GenreModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
