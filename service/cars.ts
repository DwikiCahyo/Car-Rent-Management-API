import { Cars } from "../model/cars";
import CarsRepository from "../repository/cars";

export default class CarsService {
  repository: CarsRepository;

  constructor() {
    this.repository = new CarsRepository();
  }

  async getAllCar(
    available?: string,
    capacity?: number,
    date?: string,
    number?: string,
    page?: string,
    pageSize?: string,
    isPaginate?: string
  ) {
    return await this.repository.getAllData(
      available,
      capacity,
      date,
      number,
      page || "1",
      pageSize || "10",
      isPaginate || "true"
    );
  }

  async getCarById(id: string) {
    return await this.repository.getCarById(id);
  }

  async addCar(car: Cars) {
    const cars = await this.repository.addCar(car);
    return cars;
  }

  async updateCar(id: string, car: Partial<Cars>) {
    const cars = await this.repository.udpateCar(id, car);
    return cars;
  }

  async deleteCar(id: string, userId: number) {
    const cars = await this.repository.deleteCar(id, userId);
    return cars;
  }
}
