import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 120.0,
      license_plate: "CCD-1111",
      fine_amount: 60.0,
      brand: "Brand 1",
      category_id: "1",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 120.0,
      license_plate: "CCD-1111",
      fine_amount: 60.0,
      brand: "Brand 1",
      category_id: "1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 120.0,
      license_plate: "CCD-1222",
      fine_amount: 60.0,
      brand: "Brand 1",
      category_id: "1",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car 1" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 120.0,
      license_plate: "CCD-1111",
      fine_amount: 60.0,
      brand: "Brand 1",
      category_id: "1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 120.0,
      license_plate: "CCD-1222",
      fine_amount: 60.0,
      brand: "Brand 2",
      category_id: "1",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand 1" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 120.0,
      license_plate: "CCD-1111",
      fine_amount: 60.0,
      brand: "Brand 1",
      category_id: "1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 120.0,
      license_plate: "CCD-1222",
      fine_amount: 60.0,
      brand: "Brand 2",
      category_id: "2",
    });

    const cars = await listAvailableCarsUseCase.execute({ categoryId: "1" });

    expect(cars).toEqual([car]);
  });
});
