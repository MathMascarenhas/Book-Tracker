import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INote } from './entities/note.entity';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllNotes(userId: string): Promise<INote[]> {
    const allNotes = await this.prisma.note.findMany({
      where: { userId: userId },
    });
    return allNotes;
  }

  async findNoteById(noteId: string): Promise<INote> {
    const foundNote = await this.prisma.note.findUniqueOrThrow({
      where: { id: noteId },
    });
    return foundNote;
  }

  async createNote(note: CreateNoteDto): Promise<INote> {
    const createdNote = await this.prisma.note.create({ data: note });
    return createdNote;
  }

  async updateNote(note: UpdateNoteDto): Promise<INote> {
    const updatedNote = await this.prisma.note.update({
      where: { id: note.id },
      data: note,
    });
    return updatedNote;
  }

  async deleteNote(noteId: string): Promise<INote> {
    const deletedNote = await this.prisma.note.delete({
      where: { id: noteId },
    });
    return deletedNote;
  }
}
