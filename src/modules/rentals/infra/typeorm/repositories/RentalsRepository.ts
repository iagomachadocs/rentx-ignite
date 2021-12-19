import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({ carId });
    return openRental;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({ userId });
    return openRental;
  }

  async create({
    userId,
    carId,
    expectReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      userId,
      carId,
      expectReturnDate,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
