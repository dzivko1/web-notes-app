import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import userRepository from "../repositories/userRepository";
import { UserRequest } from "../types";

export default function requireAuth(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, Config.JWT_PRIVATE_KEY, (error: any, data: any) => {
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
