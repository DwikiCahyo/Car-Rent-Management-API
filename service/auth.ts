import { Users } from "../model/users";
import AuthRepository from "../repository/auth";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthService {
  repository: AuthRepository;
  constructor() {
    this.repository = new AuthRepository();
  }

  async registerUser(body: Users) {
    return await this.repository.registerUser(body);
  }

  async loginUser(body: Users, tokenSecret: string) {
    const password = body.password;
    const user = await this.repository.loginUser(body);
    if (!user) {
      const messageError: string = "User not found, please register";
      return messageError;
    }
    const expectedPassword = await bcrypt.compare(password, user.password);
    if (expectedPassword) {
      const token = jwt.sign(
        { email: user.email, id: user.id, role_id: user.role_id },
        tokenSecret,
        {
          expiresIn: "1h",
        }
      );

      const data: dataLogin = {
        id: user.id,
        email: user.email,
        token: token,
      };
      return data;
    }
    const errCredential: string = "Wrong Credentials";

    return errCredential;
  }

  async updateRole(body: Users, id: string) {
    const userId = id;
    const user = await this.repository.updateRole(body, userId);

    if (user === null) {
      return "user not found";
    }
    return user;
  }
}
