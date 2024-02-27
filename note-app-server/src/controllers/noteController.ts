import { Request, Response } from "express";
import noteRepository from "../repositories/noteRepository";

class NoteController {
  getNotes(req: Request, res: Response) {
    res.send(noteRepository.getNotes());
  }

  createNote(req: Request, res: Response) {
    const { title, content } = req.body;
    res.send(noteRepository.createNote(title, content));
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
