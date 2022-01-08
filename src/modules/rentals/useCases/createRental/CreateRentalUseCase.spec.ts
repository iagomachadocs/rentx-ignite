import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand",
      name: "Test car",
      category_id: "1234",
      daily_rate: 100,
      description: "Test car description",
      fine_amount: 40,
      license_plate: "test",
    });

    const rental = await createRentalUseCase.execute({
      userId: "12345",
      carId: car.id,
      expectReturnDate: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if the user already has an open rental", async () => {
    await rentalsRepositoryInMemory.create({
      carId: "4444444",
      userId: "54321",
      expectReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: "54321",
        carId: "333333",
        expectReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an open rental."));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      carId: "333333",
      userId: "test",
      expectReturnDate: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: "54321",
        carId: "333333",
        expectReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available."));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        userId: "12345",
        carId: "333333",
        expectReturnDate: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
