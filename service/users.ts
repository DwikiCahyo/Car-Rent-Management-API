import UserRepository from "../repository/users";

export default class UserService {
  repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUser() {
    const user = await this.repository.getAllUser();
    return user;
  }

  async getUser() {
    const user = await this.repository.getUser();
    return user;
  }
}
