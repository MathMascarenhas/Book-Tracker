import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description:
      'Corpo da nota a ser criada com limite de caracteres igual a 300',
    example: `- arroz
    -feijão
    -batata`,
  })
  @IsString()
  @MaxLength(400)
  body: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
