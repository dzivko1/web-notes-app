import { Request, Response } from "express";
import noteRepository from "../repositories/noteRepository";
import { UserRequest } from "../types";

class NoteController {
  getNotes(req: UserRequest, res: Response) {
    const user = req.user!;
    res.send(noteRepository.getNotesForUser(user.id));
  }

  createNote(req: UserRequest, res: Response) {
    const user = req.user!;
    const { title, content } = req.body;
    res.send(noteRepository.createNote(user.id, title, content));
  }

  updateNote(req: Request, res: Response) {
    const { id } = req.params;
    res.send(noteRepository.updateNote(id, req.body));
  }

  deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    res.send(noteRepository.deleteNote(id));
  }
}

export default new NoteController();
