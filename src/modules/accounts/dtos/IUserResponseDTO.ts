interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  avatar: string;
  driverLicense: string;
  avatarUrl(): string;
}

export { IUserResponseDTO };
