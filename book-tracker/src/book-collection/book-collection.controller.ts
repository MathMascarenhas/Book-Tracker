import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { BookCollectionService } from './book-collection.service';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';

@Controller('book-collection')
export class BookCollectionController {
  constructor(private readonly bookCollectionService: BookCollectionService) {}

  @Post()
  async create(@Body() createBookCollectionDto: CreateBookCollectionDto) {
    try {
      return await this.bookCollectionService.create(createBookCollectionDto);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.bookCollectionService.findAll();
    } catch (error) {
      HandleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') collectionId: string) {
    try {
      return await this.bookCollectionService.findOne(collectionId);
    } catch (error) {
      HandleException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') collectionId: string,
    @Body() updateBookCollectionDto: UpdateBookCollectionDto,
  ) {
    try {
      const updateCollection = { ...updateBookCollectionDto, id: collectionId };
      return await this.bookCollectionService.update(updateCollection);
    } catch (error) {
      HandleException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') collectionId: string): Promise<string> {
    try {
      await this.bookCollectionService.remove(collectionId);
      return 'List deleted successfully';
    } catch (error) {
      HandleException(error);
    }
  }
}
