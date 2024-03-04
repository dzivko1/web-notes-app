import express, { Application, Router } from "express";
import authController from "./controllers/authController";
import noteController from "./controllers/noteController";
import requireAuth from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";

const app: Application = express();
const api: Router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use("/api", api);

api.post("/register", authController.registerUser);
api.post("/login", authController.authUser);
api.post("/logout", authController.logoutUser);

api.use(requireAuth);

api.get("/user", authController.getUser);

api.get("/notes", noteController.getNotes);
api.post("/notes", noteController.createNote);
api.patch("/notes/:id", noteController.updateNote);
api.delete("/notes/:id", noteController.deleteNote);

export default app;
