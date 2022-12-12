import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { GenreRepository } from './genre.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
