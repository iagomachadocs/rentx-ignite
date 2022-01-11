import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_tokens")
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "expiration_date" })
  expirationDate: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserToken };
