import { CarsModel, Cars } from "../model/cars";

export default class CarsRepository {
  async getAllData(
    available?: string,
    capacity?: number,
    date?: string,
    time?: string
  ) {
    const parseAvailable = available === "true" ? true : false;

    let query = CarsModel.query();

    if (available) {
      query = query.where("available", "=", parseAvailable);
    }

    if (capacity) {
      query = query.where("capacity", ">=", capacity);
    }

    if (date) {
      query = query
        .select("*")
        .whereRaw('DATE("cars"."availableAt") = ?', [date])
        .orderBy("cars.availableAt");
    }

    if (time) {
      query = query
        .select("*")
        .whereRaw('TO_CHAR("cars"."availableAt" , ?) <= ? ', ["HH24:MI", time])
        .orderBy("cars.availableAt");
    }

    const cars = await query
      .where("deleted_by", null)
      .withGraphFetched("created")
      .withGraphFetched("updated")
      .withGraphFetched("deleted");

    const formatedCar = cars.map(
      ({ created_by, deleted_by, updated_by, ...car }) => {
        const data = {
          ...car,
          created_by: car.created?.email || null,
          deleted_by: car.deleted?.email || null,
          updated_by: car.updated?.email || null,
        };
        const { updated, deleted, created, ...cars } = data;
        return cars;
      }
    );

    return formatedCar;
  }

  async getCarById(id: string) {
    const car = await CarsModel.query().findById(id);
    if (!car) {
      return `car with id ${id} not found`;
    }
    return car;
  }

  async addCar(car: Cars) {
    const cars = await CarsModel.query().insert(car).returning("*");
    return cars;
  }

  async udpateCar(id: string, car: Partial<Cars>) {
    const cars = await CarsModel.query().findById(id).patch(car).returning("*");
    if (!cars) {
      const message = `car with id ${id} not found`;
      return message;
    }
    return cars;
  }

  async deleteCar(id: string, userId: number) {
    const cars = await CarsModel.query()
      .findById(id)
      .patch({ deleted_by: userId })
      .returning("*");
    if (!cars) {
      const message = `car with id ${id} not found`;
      return message;
    }
    return cars;
  }
}
