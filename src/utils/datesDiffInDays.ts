import { differenceInDays } from "date-fns";

export function datesDiffInDays(laterDate: Date, earlierDate?: Date) {
  try {
    return differenceInDays(laterDate, earlierDate ?? new Date());
  } catch (error) {
    return 0;
  }
}
