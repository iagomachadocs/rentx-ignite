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
    const openRental = await this.repository.findOne({
      where: { carId, endDate: null },
    });
    return openRental;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({
      where: { userId, endDate: null },
    });
    return openRental;
  }

  async create({
    userId,
    carId,
    expectReturnDate,
    id,
    endDate,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      userId,
      carId,
      expectReturnDate,
      id,
      endDate,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId },
      relations: ["car"],
    });
    return rentals;
  }
}

export { RentalsRepository };
