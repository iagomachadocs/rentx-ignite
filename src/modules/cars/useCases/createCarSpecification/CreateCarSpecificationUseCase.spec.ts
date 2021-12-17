import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "IAG-0123",
      fine_amount: 50,
      brand: "Car Brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Test description",
      name: "Test name",
    });

    const specificationsId = [specification.id];

    const carSpecification = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    expect(carSpecification).toHaveProperty("specifications");
    expect(carSpecification.specifications.length).toBe(1);
  });

  it("should not be able to add a specification to a non-existent car", async () => {
    expect(async () => {
      const carId = "111111";

      const specificationsId = ["12345"];

      await createCarSpecificationUseCase.execute({
        carId,
        specificationsId,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
