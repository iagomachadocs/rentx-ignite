import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    categoryId?: string
  ): Promise<Car[]> {
    const carQuery = this.repository
      .createQueryBuilder()
      .where("available = :available", { available: true });

    if (name) {
      carQuery.andWhere("name = :name", { name });
    }

    if (brand) {
      carQuery.andWhere("brand = :brand", { brand });
    }

    if (categoryId) {
      carQuery.andWhere("category_id = :categoryId", { categoryId });
    }

    const cars = await carQuery.getMany();

    return cars;
  }
}

export { CarsRepository };
