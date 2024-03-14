import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import { UserRequest } from "../types";
import { User } from "../models/user";

class AuthController {
  getUser(req: UserRequest, res: Response) {
    res.send(req.user);
  }

  async registerUser(req: Request, res: Response) {
    const { username, password, firstName, lastName } = req.body;
    if (
      username?.length < 3 ||
      password?.length < 6 ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).send("Invalid input data");
    }

    const existingUser = await userRepository.getUserByUsername(username);
    if (existingUser)
      return res.status(409).send("Username already registered");

    const [user, token] = await userRepository.registerUser(
      username,
      password,
      firstName,
      lastName,
    );

    res
      .cookie("authToken", token, { httpOnly: true, sameSite: "strict" })
      .send(user);
  }

  async authUser(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Invalid input data");
    }

    const [user, token] = await userRepository.authUser(username, password);
    if (user && token) {
      res
        .cookie("authToken", token, { httpOnly: true, sameSite: "strict" })
        .send(user);
    } else {
      res.status(400).send("Invalid account details");
    }
  }

  logoutUser(req: Request, res: Response) {
    res.clearCookie("authToken").sendStatus(200);
  }
}

export default new AuthController();
