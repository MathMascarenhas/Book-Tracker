import { PartialType } from '@nestjs/mapped-types';
import { CreateBookCollectionDto } from './create-book-collection.dto';

export class UpdateBookCollectionDto extends PartialType(
  CreateBookCollectionDto,
) {
  id: string;
}
