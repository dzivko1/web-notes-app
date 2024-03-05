import axios from "../axiosClient";
import { User } from "../models/user.ts";

type RegisterUserResult = { type: "success" } | { type: "conflict" };
type AuthUserResult = { type: "success" } | { type: "invalid" };

class AuthService {
  async getLoggedInUser(): Promise<User | null> {
    const response = await axios.get("/api/user");
    return response.status === 200 ? response.data : null;
  }

  async registerUser(formData: FormData): Promise<RegisterUserResult> {
    const response = await axios.post(
      "/api/register",
      Object.fromEntries(formData),
    );
    if (response.status === 409) return { type: "conflict" };
    if (response.status !== 200) throw new Error(response.statusText);

    return { type: "success" };
  }

  async authUser(formData: FormData): Promise<AuthUserResult> {
    const response = await axios.post(
      "/api/login",
      Object.fromEntries(formData),
    );
    if (response.status === 400) return { type: "invalid" };
    if (response.status !== 200) throw new Error(response.statusText);

    return { type: "success" };
  }

  async logoutUser() {
    const response = await axios.post("/api/logout");
    if (response.status !== 200) throw new Error(response.statusText);
  }
}

export default new AuthService();
