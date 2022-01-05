import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionUseCase } from "./DevolutionUseCase";

class DevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id } = request.params;

    const devolutionUseCase = container.resolve(DevolutionUseCase);
    const rental = await devolutionUseCase.execute({ id, userId });

    return response.json(rental);
  }
}

export { DevolutionController };
