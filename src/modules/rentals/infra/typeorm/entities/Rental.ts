import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "start_date", type: "timestamp" })
  startDate: Date;

  @Column({ name: "end_date", type: "timestamp" })
  endDate: Date;

  @Column({ name: "expect_return_date", type: "timestamp" })
  expectReturnDate: Date;

  @Column({ name: "total", type: "timestamp" })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
