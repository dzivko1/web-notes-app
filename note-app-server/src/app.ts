import { Application, Request, Response, Router } from "express"
import { Note } from "./models/note"
import noteController from "./controllers/noteController"

const express = require('express')
const app: Application = express()
const api: Router = express.Router()

api.get("/notes", (req: Request, res: Response) => {
    res.send(noteController.getNotes())
})

api.post("/notes", (req: Request, res: Response) => {
    res.send(noteController.createNote(req.body.title, req.body.content))
})

api.patch("/notes/:id", (req: Request, res: Response) => {
    res.send(noteController.updateNote(req.params.id, req.body))
})

api.delete("/notes/:id", (req: Request, res: Response) => {
    res.send(noteController.deleteNote(req.params.id))
})

app.use(express.json());
app.use("/api", api)

export default app