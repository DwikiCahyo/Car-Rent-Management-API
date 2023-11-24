import { Express, NextFunction, Request, Response } from "express";
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
    this.app.get("/user", (req: Request, res: Response) =>
      this.getUser(req, res)
    );
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const role = req.user?.role_id;
      if (role === 1 || role === 2) {
        const user = await this.service.getAllUser();
        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(403).json({ message: "Access forbiden" });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.service.getUser();
      res.status(200).json({ data: user });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }
}
