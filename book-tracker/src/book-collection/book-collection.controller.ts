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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookService } from 'src/book/book.service';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { BookCollectionService } from './book-collection.service';
import { AddBookToCollection } from './dto/add-book.dto';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { IBookCollection } from './entities/book-collection.entity';

@Controller('book-collection')
@ApiTags('Book Collection')
export class BookCollectionController {
  constructor(
    private readonly bookCollectionService: BookCollectionService,
    private readonly bookService: BookService,
  ) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createBookCollectionDto: CreateBookCollectionDto,
  ): Promise<IBookCollection> {
    try {
      return await this.bookCollectionService.create(createBookCollectionDto);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/add')
  async addBookToCollection(
    @Body() { bookId, collectionId }: AddBookToCollection,
  ): Promise<IBookCollection> {
    try {
      await this.bookService.findOne(bookId);
      const updateList = { collectionId: collectionId, bookId: bookId };
      return await this.bookCollectionService.addBook(updateList);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<IBookCollection[]> {
    try {
      return await this.bookCollectionService.findAll();
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') collectionId: string): Promise<IBookCollection> {
    try {
      return await this.bookCollectionService.findOne(collectionId);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') collectionId: string,
    @Body() updateBookCollectionDto: UpdateBookCollectionDto,
  ): Promise<IBookCollection> {
    try {
      const updateCollection = { ...updateBookCollectionDto, id: collectionId };
      return await this.bookCollectionService.update(updateCollection);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
