import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const { expectReturnDate, carId } = request.body;
    const { id } = request.user;

    const rental = await createRentalUseCase.execute({
      carId,
      expectReturnDate,
      userId: id,
    });

    return response.status(201).send(rental);
  }
}

export { CreateRentalController };
