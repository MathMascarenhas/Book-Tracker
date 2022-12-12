import { Injectable } from '@nestjs/common';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';

@Injectable()
export class BookCollectionService {
  create(createBookCollectionDto: CreateBookCollectionDto) {
    return 'This action adds a new bookCollection';
  }

  findAll() {
    return `This action returns all bookCollection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCollection`;
  }

  update(id: number, updateBookCollectionDto: UpdateBookCollectionDto) {
    return `This action updates a #${id} bookCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCollection`;
  }
}
