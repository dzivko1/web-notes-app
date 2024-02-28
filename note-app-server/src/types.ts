import { User } from "./models/user";
import { Request } from "express";

interface UserRequest extends Request {
  user?: User;
}

export { UserRequest };
