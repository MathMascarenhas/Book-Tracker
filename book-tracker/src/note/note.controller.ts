import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INote } from './entities/note.entity';
import { NoteService } from './note.service';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IUserEntity } from 'src/user/entities/user.entity';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async getNotes(@userLogged() userLogged: IUserEntity): Promise<INote[]> {
    return await this.service.getNotes(userLogged.id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async getNoteById(@Param('id') noteId: string): Promise<INote> {
    try {
      return await this.service.getNoteById(noteId);
    } catch (err) {
      throw new NotFoundException('Note not found');
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async createNote(@Body() note: CreateNoteDto): Promise<INote> {
    try {
      return await this.service.createNote(note);
    } catch (error) {
      throw new BadRequestException('It was not possible to add the note');
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch()
  async updateNote(@Body() noteData: UpdateNoteDto): Promise<INote> {
    try {
      return await this.service.updateNote(noteData);
    } catch (error) {
      throw new BadRequestException('It was not possible to update the note');
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deleteNote(@Param('id') noteId: string): Promise<string> {
    try {
      await this.service.deleteNote(noteId);
      return 'Note deleted successfully';
    } catch (err) {
      throw new NotFoundException('Note not found');
    }
  }
}
