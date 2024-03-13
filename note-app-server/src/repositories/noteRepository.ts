import { Note } from "../models/note";
import { timestampSeconds } from "../utils/dateUtils";
import { collections } from "../db";
import { ObjectId } from "mongodb";

class NoteRepository {
  getNotesForUser(userId: string): Promise<Note[]> {
    return collections.notes.find({ userId: userId }).toArray();
  }

  async createNote(
    userId: string,
    title: string,
    content: string,
  ): Promise<Note> {
    const newNote: Note = {
      _id: new ObjectId(),
      userId: userId,
      title: title,
      content: content,
      createdAt: timestampSeconds(),
      updatedAt: null,
    };
    await collections.notes.insertOne(newNote);
    return newNote;
  }

  updateNote(id: string, newNote: Partial<Note>): Promise<Note | null> {
    return collections.notes.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...newNote,
          updatedAt: timestampSeconds(),
        },
      },
      { returnDocument: "after" },
    );
  }

  async deleteNote(id: string): Promise<string> {
    await collections.notes.deleteOne({ _id: new ObjectId(id) });
    return id;
  }
}

export default new NoteRepository();
