import { Collection, Db, MongoClient } from "mongodb";
import { User, UserPassword } from "./models/user";
import { Note } from "./models/note";

const dbUrl = "mongodb://localhost:27017";
const dbName = "notes";

export async function connectToDatabase() {
  const dbClient = new MongoClient(dbUrl);
  await dbClient.connect();
  const db = dbClient.db(dbName);
  collections.initCollections(db);
}

class Collections {
  private collections: Partial<{
    users: Collection<User>;
    passwords: Collection<UserPassword>;
    notes: Collection<Note>;
  }> = {};

  initCollections(db: Db) {
    this.collections.users = db.collection("users");
    this.collections.passwords = db.collection("passwords");
    this.collections.notes = db.collection("notes");
  }

  get users() {
    if (!this.collections.users) {
      throw Error(
        "Tried to access non-initialized collection 'users'. Please check your code flow.",
      );
    }
    return this.collections.users;
  }

  get passwords() {
    if (!this.collections.passwords) {
      throw Error(
        "Tried to access non-initialized collection 'passwords'. Please check your code flow.",
      );
    }
    return this.collections.passwords;
  }

  get notes() {
    if (!this.collections.notes) {
      throw Error(
        "Tried to access non-initialized collection 'notes'. Please check your code flow.",
      );
    }
    return this.collections.notes;
  }
}

export const collections = new Collections();
