import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("car_images")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "image_name" })
  imageName: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
