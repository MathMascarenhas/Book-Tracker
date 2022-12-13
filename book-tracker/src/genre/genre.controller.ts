import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';
import { AddBookToGenre } from './dto/add-book-to-genre.dto';
import { IGenre } from './entities/genre.entity';
import { BookService } from 'src/book/book.service';

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
  constructor(
    private readonly genreService: GenreService,
    private readonly bookService: BookService,
  ) {}

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    try {
      return await this.genreService.create(createGenreDto);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Post('/add')
  async addBookToCollection(
    @Body() { bookId, genreId }: AddBookToGenre,
  ): Promise<IGenre> {
    try {
      await this.bookService.findOne(bookId);
      const updateGenre = { genreId: genreId, bookId: bookId };
      return await this.genreService.addBook(updateGenre);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll() {
    try {
      return await this.genreService.findAll();
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') genreId: string) {
    try {
      return await this.genreService.findOne(genreId);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') genreId: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    try {
      const updateData = { ...updateGenreDto, id: genreId };
      return await this.genreService.update(updateData);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') genreId: string): Promise<string> {
    try {
      await this.genreService.remove(genreId);
      return 'Genre deleted successfully';
    } catch (error) {
      HandleException(error);
    }
  }
}
