import jwt from "jsonwebtoken";
import { Config } from "../config";

export type Token = string;

export function generateUserToken(id: string): string {
  return jwt.sign({ id: id }, Config.JWT_PRIVATE_KEY);
}
