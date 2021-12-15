import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const { name, brand, categoryId } = request.query;

    const cars = await listAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };