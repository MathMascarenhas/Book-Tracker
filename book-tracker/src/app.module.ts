import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookCollectionModule } from './book-collection/book-collection.module';
import { DatabaseModule } from './prisma/database.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    BookCollectionModule,
    NoteModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
