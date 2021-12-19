import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    userId,
    carId,
    expectReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const carNotAvailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carNotAvailable) {
      throw new AppError("Car is not available.");
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (userHasOpenRental) {
      throw new AppError("User already has an open rental.");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expectReturnDate);

    if (compare < minimumHours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
