import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    try {
	return await this.genreService.create(createGenreDto);
} catch (error) {
	HandleException(error)
}
  }

  @Get()
  async findAll() {
  try {
	  return await this.genreService.findAll();
} catch (error) {
	HandleException(error)
}
  }

  @Get(':id')
  async findOne(@Param('id') genreId: string) {
    try {
	return await this.genreService.findOne(genreId);
} catch (error) {
	HandleException(error)
}
  }

  @Patch(':id')
  async update(@Param('id') genreId: string, @Body() updateGenreDto: UpdateGenreDto) {
    try {
	const updateData = {...updateGenreDto, id: genreId}
	    return await this.genreService.update(updateData);
} catch (error) {
	 HandleException(error)
}
  }

  @Delete(':id')
  async remove(@Param('id') genreId: string): Promise<string> {
  try {
	  await this.genreService.remove(genreId);
    return "Genre deleted successfully"
} catch (error) {
	HandleException(error)
}
  }
}
