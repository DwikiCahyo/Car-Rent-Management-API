import { Express, Request, Response, NextFunction } from "express";
import CarsService from "../service/cars";
import { Cars } from "../model/cars";
import upload from "../middleware/multer";
import cloudinary from "../middleware/cloudinary";
import { authToken } from "../middleware/userAuth";

interface carQuery {
  available: string;
  capacity: number;
  date: string;
  time: string;
}

interface CarParams {
  id: string;
}

export default class CarController {
  app: Express;
  service: CarsService;

  constructor(app: Express) {
    this.app = app;
    this.service = new CarsService();
  }

  init() {
    this.app.get(
      "/cars",
      (req: Request<{}, {}, {}, carQuery>, res, next: NextFunction) =>
        this.getCar(req, res, next)
    );
    this.app.get("/cars/:id", (req: Request<CarParams>, res) =>
      this.getCarById(req, res)
    );
    this.app.post(
      "/cars",
      (req: Request, res: Response, next: NextFunction) =>
        authToken(req, res, next),
      upload.single("image"),
      (req: Request<{}, {}, Cars>, res: Response) => this.postCar(req, res)
    );
    this.app.patch(
      "/cars/:id",
      (req: Request, res: Response, next: NextFunction) =>
        authToken(req, res, next),
      upload.none(),
      (req: Request, res: Response) => this.updateCar(req, res)
    );
    this.app.delete("/cars/:id", authToken, (req: Request, res: Response) =>
      this.deleteCar(req, res)
    );
  }

  async getCar(
    req: Request<{}, {}, {}, carQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { available, capacity, date, time } = req.query;
      const car = await this.service.getAllCar(available, capacity, date, time);
      res.locals.data = car;
      res.status(200).json({ status: 200, length: car.length, data: car });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }

  async getCarById(req: Request<CarParams>, res: Response) {
    try {
      const id = req.params.id;
      const car = await this.service.getCarById(id);

      res.status(200).json({ data: car });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  }

  async postCar(req: Request<{}, {}, Cars>, res: Response) {
    try {
      const role = req.user?.role_id;
      if (!(role === 1 || role === 2)) {
        return res.status(403).json({ message: "Resctricted" });
      }

      const fileBase64 = req.file?.buffer.toString("base64");
      const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

      console.log(file);

      //upload image
      const result = await cloudinary.uploader.upload(file, {
        folder: "rent_car",
        public_id: "car_image",
      });

      const imageUrl = result.secure_url;
      console.log(imageUrl);

      const user = req.user?.id;
      const body = {
        ...req.body,
        image: imageUrl,
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        created_by: user,
      };

      const car = await this.service.addCar(body);
      res
        .status(200)
        .json({ status: 200, message: "Success add car", data: car });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: errorMssg });
    }
  }

  async updateCar(req: Request, res: Response) {
    try {
      const role = req.user?.role_id;
      if (!(role === 1 || role === 2)) {
        return res.status(403).json({ message: "Resctricted" });
      }

      console.log(req.params.id);
      const user = req.user?.id;
      const body = {
        ...req.body,
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        updated_by: user,
      };

      const car = await this.service.updateCar(req.params.id, body);

      if (typeof car === "string") {
        return res.status(404).json({ status: 404, message: car });
      }

      res
        .status(200)
        .json({ status: 200, message: "Success edit car", data: car });
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: errorMssg });
    }
  }

  async deleteCar(req: Request, res: Response) {
    try {
      const role = req.user?.role_id;
      if (!(role === 1 || role === 2)) {
        return res.status(403).json({ message: "Resctricted" });
      }
      const userId = req.user?.id;
      const params = req.params;
      const paramsId = params.id;
      if (userId) {
        const car = await this.service.deleteCar(paramsId, userId);
        return res.status(200).json({
          status: 200,
          message: `Success delete car ${paramsId}`,
        });
      }
    } catch (error) {
      const errorMssg = (error as Error).message;
      res.locals.errorMessage = errorMssg;
      res.status(500).json({ err: errorMssg });
    }
  }
}
