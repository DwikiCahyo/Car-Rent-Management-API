import { UserModel } from "../model/users";

export default class UserRepository {
  formatData(data: UserModel[]) {
    const formatedData = data.map((user) => {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        roles: user.roles?.name,
      };
    });
    return formatedData;
  }

  async getAllUser() {
    const user = await UserModel.query().withGraphFetched("roles");
    const formated = this.formatData(user);
    return formated;
  }

  async getUser() {
    const user = await UserModel.query()
      .withGraphJoined("roles")
      .where("roles.name", "user");
    const formated = this.formatData(user);

    return formated;
  }
}
