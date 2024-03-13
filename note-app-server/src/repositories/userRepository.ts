import { User } from "../models/user";
import { generateUserToken, Token } from "../utils/jwtUtils";
import { collections } from "../db";
import { Collection } from "mongodb";

class UserRepository {
  async getUser(id: string): Promise<User | null> {
    return collections.users!.findOne({ id: id });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return collections.users!.findOne({ username: username });
  }

  async registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<[User, Token]> {
    if (await collections.users!.findOne({ username: username }))
      throw new Error("Username already exists");

    const userId: string = crypto.randomUUID();
    const user: User = {
      id: userId,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    await collections.users!.insertOne(user);
    return [user, generateUserToken(userId)];
  }

  async authUser(username: string, password: string): Promise<[User?, Token?]> {
    const user = await collections.users!.findOne({ username: username });
    if (user && user.password === password) {
      return [user, generateUserToken(user.id)];
    } else {
      return [];
    }
  }
}

export default new UserRepository();
