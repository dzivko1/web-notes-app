import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";

class AuthController {
  registerUser(req: Request, res: Response) {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password || !firstName || !lastName) {
      return res.status(400).send("Invalid input data");
    }

    const user = userRepository.getUserByUsername(username);
    if (user) return res.status(409).send("Username already registered");

    const token = userRepository.registerUser(
      username,
      password,
      firstName,
      lastName,
    );
    res.send({ token: token });
  }

  authUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = userRepository.authUser(username, password);
    if (token) {
      res.send({ token: token });
    } else {
      res.status(400).send("Invalid account details");
    }
  }
}

export default new AuthController();
