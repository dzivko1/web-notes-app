import express, { Application, Request, Response, Router } from "express"
import noteController from "./controllers/noteController"

const app: Application = express()
const api: Router = express.Router()

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