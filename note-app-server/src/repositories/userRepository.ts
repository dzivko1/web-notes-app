import { User } from "../models/user";
import { generateUserToken, Token } from "../utils/jwtUtils";

class UserRepository {
  private users: User[] = [];

  getUser(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  getUserToken(username: string): Token | undefined {
    if (this.getUser(username)) {
      return generateUserToken(username);
    } else {
      return undefined;
    }
  }

  registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Token {
    if (this.users.some((user) => user.username === username))
      throw new Error("Username already exists");

    this.users.push({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    return generateUserToken(username);
  }

  authUser(username: string, password: string): Token | undefined {
    const user = this.users.find((user) => user.username === username);
    if (user && user.password === password) {
      return generateUserToken(username);
    } else {
      return undefined;
    }
  }
}

export default new UserRepository();
