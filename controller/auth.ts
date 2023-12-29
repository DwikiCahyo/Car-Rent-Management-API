/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UserModel, type Users } from "../model/users";
import AuthService from "../service/auth";
import {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { authToken, checkEmail } from "../middleware/userAuth";

const TOKEN_SECRET = "ini adalah token saya yang saya test";

export default class AuthController {
  service: AuthService;
  app: Express;

  constructor(app: Express) {
    this.app = app;
    this.service = new AuthService();
  }

  init() {
    this.app.post(
      "/register",
      (req: Request<{}, {}, Users>, res: Response, next: NextFunction) =>
        checkEmail(req, res, next),
      (req: Request<{}, {}, Users>, res: Response) =>
        this.registerUser(req, res)
    );
    this.app.post("/login", (req: Request<{}, {}, Users>, res: Response) =>
      this.login(req, res)
    );

    this.app.get(
      "/whoami",
      (req: Request, res: Response, next: NextFunction) =>
        authToken(req, res, next),
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      (req: Request, res: Response) => this.whoAmI(req, res)
    );

    this.app.patch(
      "/users/:id",
      (req: Request, res: Response, next: NextFunction) =>
        authToken(req, res, next),
      (req: Request, res: Response) => this.updateRole(req, res)
    );
  }

  async registerUser(req: Request<{}, {}, Users>, res: Response) {
    try {
      const body = req.body;
      const user = await this.service.registerUser(body);
      res.status(200).json({
        status: 200,
        message: "Success create account",
        data: user.email,
      });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }

  async login(req: Request<{}, {}, Users>, res: Response) {
    try {
      const body = req.body;
      const user = await this.service.loginUser(body, TOKEN_SECRET);
      if (typeof user === "string") {
        return res.status(403).json({ status: 403, message: user });
      }
      res.status(200).json({ status: 200, data: user });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const role = req.user?.role_id;
      if (!(role === 1)) {
        return res.status(403).json({ message: "Access forbiden" });
      }
      const id = req.params.id;
      const body = req.body;
      const user = await this.service.updateRole(body, id);
      if (user instanceof UserModel) {
        return res.status(200).json({ status: 200, data: user });
      }
      res.status(403).json({ status: 403, message: user });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }

  whoAmI(req: Request, res: Response) {
    try {
      const user = req.user;
      res.status(200).json({ data: user });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: 500 });
    }
  }
}
