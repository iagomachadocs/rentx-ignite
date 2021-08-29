interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
