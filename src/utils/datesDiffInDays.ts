import { differenceInDays } from "date-fns";

export function datesDiffInDays(laterDate: Date, earlierDate?: Date) {
  try {
    return Math.abs(differenceInDays(laterDate, earlierDate ?? new Date()));
  } catch (error) {
    return 0;
  }
}
