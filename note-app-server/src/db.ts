import { Collection, MongoClient } from "mongodb";
import { User } from "./models/user";

const dbUrl = "mongodb://localhost:27017";
const dbName = "notes";

export async function connectToDatabase() {
  const dbClient = new MongoClient(dbUrl);
  await dbClient.connect();
  const db = dbClient.db(dbName);

  collections.users = db.collection<User>("users");
}

export const collections: { users?: Collection<User> } = {};
