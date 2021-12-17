import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ carId, imagesName }: IRequest): Promise<void> {
    imagesName.map(async (image) => {
      await this.carImagesRepository.create(carId, image);
    });
  }
}

export { UploadCarImagesUseCase };
