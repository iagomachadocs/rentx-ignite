import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    return dayjs(endDateUTC).diff(startDateUTC, "hours");
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    return dayjs(endDateUTC).diff(startDateUTC, "days");
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  private convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
