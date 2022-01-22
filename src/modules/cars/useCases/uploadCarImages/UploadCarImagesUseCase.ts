import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imagesName }: IRequest): Promise<void> {
    imagesName.map(async (image) => {
      await this.carImagesRepository.create(carId, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
