import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INote } from './entities/note.entity';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async getNotes(userId: string): Promise<INote[]> {
    return await this.noteRepository.findAllNotes(userId);
  }

  async getNoteById(noteId: string): Promise<INote> {
    const singleNote = await this.noteRepository.findNoteById(noteId);
    return singleNote;
  }

  async createNote(note: CreateNoteDto): Promise<INote> {
    const createdNote = await this.noteRepository.createNote(note);
    return createdNote;
  }

  async updateNote(note: UpdateNoteDto): Promise<INote> {
    const updatedNote = await this.noteRepository.updateNote(note);
    return updatedNote;
  }

  async deleteNote(noteId: string): Promise<INote> {
    const deletedNote = await this.noteRepository.deleteNote(noteId);
    return deletedNote;
  }
}
