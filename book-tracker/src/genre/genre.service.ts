import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { IGenre } from './entities/genre.entity';
import { GenreRepository } from './genre.repository';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async create(createGenreDto: CreateGenreDto): Promise<IGenre> {
    return await this.genreRepository.createGenre(createGenreDto)
  }

  async findAll(): Promise<IGenre[]> {
    return await this.genreRepository.findAllGenres();
  }

  async findOne(genreId: string): Promise<IGenre> {
    return this.genreRepository.findGenreById(genreId);
  }

  async update(updateData: UpdateGenreDto): Promise<IGenre> {
    return await this.genreRepository.updateGenre(updateData);
  }

  async remove(genreId: string): Promise<boolean> {
	const genreDeleted = await this.genreRepository.deleteGenre(genreId);
  if (genreDeleted){
    return true
  } else {
    throw new Exception(
      Exceptions.InvalidData,
      'Genre not found in the database',
    );
  }
}
}
