import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      userId: "12345",
      carId: "1234444",
      expectReturnDate: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if the user already has an open rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "1234444",
        expectReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "12345",
        carId: "333333",
        expectReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "333333",
        expectReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "54321",
        carId: "333333",
        expectReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "333333",
        expectReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
