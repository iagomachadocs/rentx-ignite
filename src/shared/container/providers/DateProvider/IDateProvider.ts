interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  dateNow(): Date;
}

export { IDateProvider };
