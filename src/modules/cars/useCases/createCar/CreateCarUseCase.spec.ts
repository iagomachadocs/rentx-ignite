import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "IAG-0123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existing license plate", async () => {
    await createCarUseCase.execute({
      name: "Gol bola",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "IAG-0123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Celta",
        description: "Car Description",
        daily_rate: 100,
        license_plate: "IAG-0123",
        fine_amount: 50,
        brand: "Car Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-0123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
