import { User } from "../models/user";
import { generateUserToken, Token } from "../utils/jwtUtils";
import { collections } from "../db";
import { ObjectId } from "mongodb";
import { hashPassword, verifyPassword } from "../utils/passwordUtils";

class UserRepository {
  getUser(id: string): Promise<User | null> {
    return collections.users.findOne({ _id: new ObjectId(id) });
  }

  getUserByUsername(username: string): Promise<User | null> {
    return collections.users.findOne({ username: username });
  }

  async registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<[User, Token]> {
    if (await collections.users.findOne({ username: username }))
      throw new Error("Username already exists");

    const userId = new ObjectId();
    const user: User = {
      _id: userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
    };

    await collections.users.insertOne(user);
    await collections.passwords.insertOne({
      userId: userId.toString(),
      passwordHash: await hashPassword(password),
    });
    return [user, generateUserToken(userId.toString())];
  }

  async authUser(username: string, password: string): Promise<[User?, Token?]> {
    const user = await collections.users.findOne({ username: username });
    if (user) {
      const hash = await collections.passwords.findOne({
        userId: user._id.toString(),
      });
      if (hash && (await verifyPassword(password, hash.passwordHash))) {
        return [user, generateUserToken(user._id.toString())];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
}

export default new UserRepository();
