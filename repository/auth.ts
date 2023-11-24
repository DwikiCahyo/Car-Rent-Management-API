import * as bcrypt from "bcryptjs";
import { Express, Request, Response, query } from "express";
import { UserModel, Users } from "../model/users";

export default class AuthRepository {
  async registerUser(body: Users) {
    const { email, password } = body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const reqBody = {
      ...body,
      password: hashPassword,
    };

    const user = await UserModel.query().insert(reqBody).returning("*");
    return user;
  }

  async loginUser(body: Users) {
    const { email, password } = body;
    const user = await UserModel.query().findOne({ email: email });
    return user;
  }

  async updateRole(body: Users, id: string) {
    const userId = id;
    const reqBody = body.role_id;
    const checkId = await UserModel.query().findById(userId);
    if (checkId) {
      const user = await UserModel.query()
        .findById(userId)
        .patch({ role_id: reqBody })
        .returning("*");
      return user;
    }
    return null;
  }
}
