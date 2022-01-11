import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const { sub: userId, email } = verify(
      refreshToken,
      auth.secretRefreshToken
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exist!");
    }

    const token = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    });

    return token;
  }
}

export { RefreshTokenUseCase };
