import {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import UserService from "../service/users";
import { authToken } from "../middleware/userAuth";

export default class UserController {
  app: Express;
  service: UserService;

  constructor(app: Express) {
    this.app = app;
    this.service = new UserService();
  }

  init() {
    this.app.get(
      "/users",
      (req: Request, res: Response, next: NextFunction) =>
        authToken(req, res, next),
      (req: Request, res: Response) => this.getAllUser(req, res)
    );
  }

  async getAllUser(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const role = req.user?.role_id;
      res.locals.anyMssg = "G355I";
      if (!(role === 1 || role === 2)) {
        return res.status(401).json({ message: "Access Unauthorized" });
      }
      const user = await this.service.getAllUser();
      return res.status(200).json({ status: 200, data: user });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }
}
