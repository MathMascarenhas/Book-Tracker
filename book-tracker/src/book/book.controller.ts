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
import { IUserEntity } from 'src/user/entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';

@Controller('book')
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async create(@Body() createBookDto: CreateBookDto,
  @userLogged() userLogged: IUserEntity) {
    try {
      return await this.bookService.create({...createBookDto, userId: userLogged.id});
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll(@userLogged() userLogged: IUserEntity) {
    try {
      return await this.bookService.findAll(userLogged.id);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') bookId: string) {
    try {
      return await this.bookService.findOne(bookId);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const updateBook = { ...updateBookDto, id: bookId };
      return await this.bookService.update(updateBook);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') bookId: string) {
    try {
      await this.bookService.remove(bookId);
      return 'Book deleted successfully';
    } catch (error) {
      HandleException(error);
    }
  }
}
