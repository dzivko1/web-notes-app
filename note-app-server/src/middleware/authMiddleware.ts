import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import userRepository from "../repositories/userRepository";
import { UserRequest } from "../types";

export default function requireAuth(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, Config.JWT_PRIVATE_KEY, (error, data: any) => {
    if (error) {
      res.sendStatus(401);
    } else {
      const user = userRepository.getUser(data.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.sendStatus(401);
      }
    }
  });
}
