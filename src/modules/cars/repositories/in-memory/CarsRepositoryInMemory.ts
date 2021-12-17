import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    name,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    name?: string,
    brand?: string,
    categoryId?: string
  ): Promise<Car[]> {
    if (name || brand || categoryId) {
      return this.cars
        .filter((car) => car.available)
        .filter(
          (car) =>
            (name && car.name === name) ||
            (brand && car.brand === brand) ||
            (categoryId && car.category_id === categoryId)
        );
    }

    return this.cars.filter((car) => car.available);
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }
}

export { CarsRepositoryInMemory };
