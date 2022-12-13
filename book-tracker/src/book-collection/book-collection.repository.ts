import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { AddBookToCollection } from './dto/add-book.dto';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { IBookCollection } from './entities/book-collection.entity';

@Injectable()
export class BookCollectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCollection(
    collection: CreateBookCollectionDto,
  ): Promise<IBookCollection> {
    try {
      const createdCollection = await this.prisma.bookCollection.create({
        data: collection,
        include: { books: true },
      });
      return createdCollection;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'A list with this name already exists in the database',
      );
    }
  }

  async findAllCollection(): Promise<IBookCollection[]> {
    try {
      const allCollections = await this.prisma.bookCollection.findMany({
        include: { books: true },
      });
      return allCollections;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findCollectionById(collectionId: string): Promise<IBookCollection> {
    try {
      const foundCollection = await this.prisma.bookCollection.findFirstOrThrow(
        {
          where: { id: collectionId },
          include: { books: true },
        },
      );
      return foundCollection;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'List could not be found in the database',
      );
    }
  }

  async updateCollection(
    collectionData: UpdateBookCollectionDto,
  ): Promise<IBookCollection> {
    try {
      const updatedCollection = await this.prisma.bookCollection.update({
        where: { id: collectionData.id },
        data: collectionData,
        include: { books: true },
      });
      return updatedCollection;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async addBookCollection(
    updateData: AddBookToCollection,
  ): Promise<IBookCollection> {
    try {
      const updatedCollection = await this.prisma.bookCollection.update({
        where: { id: updateData.collectionId },
        data: {
          books: {
            connect: { id: updateData.bookId },
          },
        },
        include: { books: true },
      });
      return updatedCollection;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteCollection(collectionId: string): Promise<IBookCollection> {
    try {
      const deletedCollection = await this.prisma.bookCollection.delete({
        where: { id: collectionId },
        include: { books: true },
      });
      return deletedCollection;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'List not found in the database',
      );
    }
  }
}
