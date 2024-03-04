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
  ): [User, Token] {
    if (this.users.some((user) => user.username === username))
      throw new Error("Username already exists");

    const userId: string = crypto.randomUUID();
    const user: User = {
      id: userId,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    this.users.push(user);
    return [user, generateUserToken(userId)];
  }

  authUser(username: string, password: string): [User?, Token?] {
    const user = this.users.find((user) => user.username === username);
    if (user && user.password === password) {
      return [user, generateUserToken(user.id)];
    } else {
      return [];
    }
  }
}

export default new UserRepository();
