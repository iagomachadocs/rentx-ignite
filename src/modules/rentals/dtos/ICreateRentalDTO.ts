interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectReturnDate: Date;
  id?: string;
  endDate?: Date;
  total?: number;
}

export { ICreateRentalDTO };
