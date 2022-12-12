import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from 'src/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
