import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { IGenre } from './entities/genre.entity';

@Injectable()
export class GenreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createGenre(createGenre: CreateGenreDto): Promise<IGenre> {
    try {
      const createdGenre = await this.prisma.genre.create({data: createGenre, include: {books: true}});
      return createdGenre;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'A genre with this name already exists in the database',
      );
    }
  }

  async findAllGenres(): Promise<IGenre[]> {
    try {
      const findAllGenres = await this.prisma.genre.findMany({
        include: { books: true },
      });
      return findAllGenres;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findGenreById(genreId: string): Promise<IGenre> {
    try {
      const foundGenre = await this.prisma.genre.findFirstOrThrow({
        where: { id: genreId },
        include: { books: true },
      });
      return foundGenre;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Genre could not be found in the database',
      );
    }
  }

  async updateGenre(updateData: UpdateGenreDto): Promise<IGenre> {
    try {
      const updatedGenre = await this.prisma.genre.update({
        where: { id: updateData.id },
        data: updateData,
        include: { books: true },
      });
      return updatedGenre;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteGenre(genreId: string): Promise<IGenre> {
    try {
      const deletedGenre = await this.prisma.genre.delete({
        where: { id: genreId }
      });
      return deletedGenre;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Genre not found in the database',
      );
    }
  }
}