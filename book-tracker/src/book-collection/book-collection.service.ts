import { Injectable } from '@nestjs/common';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { BookCollectionRepository } from './book-collection.repository';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { IBookCollection } from './entities/book-collection.entity';

@Injectable()
export class BookCollectionService {
  constructor(private readonly bookCollection: BookCollectionRepository) {}

  async create(
    createBookCollectionDto: CreateBookCollectionDto,
  ): Promise<IBookCollection> {
    return await this.bookCollection.createCollection(createBookCollectionDto);
  }

  async findAll(): Promise<IBookCollection[]> {
    return await this.bookCollection.findAllCollection();
  }

  async findOne(collectionId: string): Promise<IBookCollection> {
    return await this.bookCollection.findCollectionById(collectionId);
  }

  async update(
    updateBookCollectionDto: UpdateBookCollectionDto,
  ): Promise<IBookCollection> {
    return await this.bookCollection.updateCollection(updateBookCollectionDto);
  }

  async remove(collectionId: string): Promise<boolean> {
    const deletedCollection = await this.bookCollection.deleteCollection(
      collectionId,
    );
    if (deletedCollection) {
      return true;
    } else {
      throw new Exception(
        Exceptions.InvalidData,
        'User not found in the database',
      );
    }
  }
}
