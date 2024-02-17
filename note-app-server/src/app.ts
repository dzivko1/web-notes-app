import { Application, Request, Response, Router } from "express"
import { Note } from "./models/note"
import noteController from "./controllers/noteController"

const express = require('express')
const cors = require("cors")
const app: Application = express()
const api: Router = express.Router()

app.use(cors())
app.use(express.json());
app.use("/api", api)

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

export default app