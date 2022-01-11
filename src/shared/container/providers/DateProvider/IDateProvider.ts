interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  dateNow(): Date;
  addDays(days: number): Date;
}

export { IDateProvider };
