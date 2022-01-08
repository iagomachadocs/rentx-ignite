import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate an existing user", async () => {
    const user: ICreateUserDTO = {
      email: "user@example.com",
      password: "password",
      driverLicense: "11223",
      name: "Test User",
    };

    await createUserUseCase.execute(user);

    const authResponse = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authResponse).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexisting user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "user@example.com",
      password: "password",
      driverLicense: "11223",
      name: "Test User",
    };

    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
  });
});
