import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.JWT_PRIVATE_KEY, (error, data) => {
    if (error) {
      res.sendStatus(401);
    } else {
      next();
    }
  });
}
