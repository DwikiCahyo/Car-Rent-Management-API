import express, { Express, Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import CarController from "./controller/CarController";
import UserController from "./controller/UserController";
import { Model } from "objection";
import { config } from "./knexfile";
import morgan from "morgan";
import knex from "knex";
import bodyParser from "body-parser";
import { logger } from "./util/logger";
import { NotFoundError } from "./middleware/notFound";
import AuthController from "./controller/AuthController";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

class App {
  app: Express;

  constructor(app: Express) {
    this.app = app;
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    Model.knex(knex(config.development));
    morgan.token("logger", (req: Request, res: Response) => logger(req, res));
    this.app.use(morgan(":status :logger"));
    this.routes();
    this.app.use((req: Request, res: Response, next: NextFunction) =>
      NotFoundError(req, res)
    );
  }

  routes() {
    new CarController(app).init();
    new UserController(app).init();
    new AuthController(app).init();
  }
}

new App(app).app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
