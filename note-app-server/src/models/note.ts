import { ObjectId } from "mongodb";

export interface Note {
  _id: ObjectId;
  userId: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number | null;
}
