import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUser(userId);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
