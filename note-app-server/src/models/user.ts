import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  username: string;
  firstName: string;
  lastName: string;
}

export interface UserPassword {
  userId: string;
  passwordHash: string;
}
