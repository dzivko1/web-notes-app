import { Note } from "../models/note";
import { timestampSeconds } from "../utils/dateUtils";

class NoteRepository {
  private notes: Note[] = [];

  getNotes(): Note[] {
    return this.notes;
  }

  createNote(title: string, content: string): Note {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title,
      content: content,
      createdAt: timestampSeconds(),
      updatedAt: null,
    };
    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: string, newNote: Partial<Note>): Note {
    const existingNote = this.notes.find((note) => note.id === id);
    if (!existingNote) throw new Error("Note not found");

    const updatedNote = {
      ...existingNote,
      ...newNote,
      updatedAt: timestampSeconds(),
    };

    this.notes = this.notes.map((note) =>
      updatedNote.id === id ? updatedNote : note,
    );

    return updatedNote;
  }

  deleteNote(id: string): string {
    this.notes = this.notes.filter((note) => note.id !== id);
    return id;
  }
}

export default new NoteRepository();
