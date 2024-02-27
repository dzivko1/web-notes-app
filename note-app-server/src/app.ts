import express, { Application, Request, Response, Router } from "express";
import authController from "./controllers/authController";
import noteController from "./controllers/noteController";
import requireAuth from "./middleware/authMiddleware";

const app: Application = express();
const api: Router = express.Router();

app.use(express.json());
app.use("/api", api);

api.post("/register", authController.registerUser);
api.post("/auth", authController.authUser);

api.use(requireAuth);

api.get("/notes", noteController.getNotes);
api.post("/notes", noteController.createNote);
api.patch("/notes/:id", noteController.updateNote);
api.delete("/notes/:id", noteController.deleteNote);

export default app;
