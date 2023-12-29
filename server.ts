import express, { type Express, type Response, type Request } from "express";
import dotenv from "dotenv";
import CarController from "./controller/cars";
import UserController from "./controller/user";
import { Model } from "objection";
import { config } from "./knexfile";
import morgan from "morgan";
import knex from "knex";
import bodyParser from "body-parser";
import { logger } from "./util/logger";
import AuthController from "./controller/auth";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { NotFoundError } from "./middleware/notFound";

dotenv.config();

const openApi = yaml.load("./openapi.yaml");

class App {
  app: Express;

  constructor() {
    const app: Express = express();
    this.app = app;
    // this.app.use(cors);
    this.app.use(cors());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApi));

    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    Model.knex(knex(config.production));
    morgan.token("logger", (req: Request, res: Response) => logger(req, res));
    this.app.use(morgan(":status :logger"));
    this.routes();
    this.app.use(NotFoundError);
    // eslint-disable-next-line @typescript-eslint/unbound-method
  }

  routes(): void {
    new CarController(this.app).init();
    new UserController(this.app).init();
    new AuthController(this.app).init();
  }
}

export default App;
