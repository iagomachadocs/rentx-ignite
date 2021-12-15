import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  brand?: string;
  name?: string;
  categoryId?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, name, categoryId }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      categoryId
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
