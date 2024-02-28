import { User } from "../models/user";
import { generateUserToken, Token } from "../utils/jwtUtils";

class UserRepository {
  private users: User[] = [];

  getUser(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Token {
    if (this.users.some((user) => user.username === username))
      throw new Error("Username already exists");

    const userId: string = crypto.randomUUID();

    this.users.push({
      id: userId,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    return generateUserToken(userId);
  }

  authUser(username: string, password: string): Token | undefined {
    const user = this.users.find((user) => user.username === username);
    if (user && user.password === password) {
      return generateUserToken(user.id);
    } else {
      return undefined;
    }
  }
}

export default new UserRepository();
