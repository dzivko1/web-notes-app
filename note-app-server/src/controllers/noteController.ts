import { Request, Response } from "express";
import noteRepository from "../repositories/noteRepository";
import { UserRequest } from "../types";

class NoteController {
  async getNotes(req: UserRequest, res: Response) {
    const user = req.user!;
    res.send(await noteRepository.getNotesForUser(user._id.toString()));
  }

  async createNote(req: UserRequest, res: Response) {
    const user = req.user!;
    const { title, content } = req.body;
    res.send(
      await noteRepository.createNote(user._id.toString(), title, content),
    );
  }

  async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    res.send(await noteRepository.updateNote(id, req.body));
  }

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    res.send(await noteRepository.deleteNote(id));
  }
}

export default new NoteController();
