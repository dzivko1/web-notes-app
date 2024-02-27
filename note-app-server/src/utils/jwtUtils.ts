import jwt from "jsonwebtoken";
import { Config } from "../config";

export type Token = string;

export function generateUserToken(username: string): string {
  return jwt.sign({ username: username }, Config.JWT_PRIVATE_KEY);
}
