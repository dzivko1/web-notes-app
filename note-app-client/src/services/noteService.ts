import axios from "../axiosClient";
import { Note } from "../models/note";

class NoteService {
  async getNotes(): Promise<Note[] | "unauthorized"> {
    const response = await axios.get("/api/notes");
    if (response.status === 401) return "unauthorized";

    return response.data;
  }

  async saveNote(title: string, content: string): Promise<Note> {
    const response = await axios.post("/api/notes", {
      title: title,
      content: content,
    });
    return response.data;
  }

  async deleteNote(id: string) {
    await axios.delete(`/api/notes/${id}`);
  }
}

export default new NoteService();
