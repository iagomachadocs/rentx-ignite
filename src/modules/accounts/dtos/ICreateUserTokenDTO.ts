interface ICreateUserTokenDTO {
  userId: string;
  expirationDate: Date;
  refreshToken: string;
}

export { ICreateUserTokenDTO };
