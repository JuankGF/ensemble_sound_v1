import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  type DateOrTimeView,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { isSameDay } from "date-fns";

type Props = {
  id?: string;
  timePicker?: boolean;
  helperText?: string;
  min?: Date;
  max?: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disabledDates?: Date[];
};

export default function DateTimeInput({
  id,
  timePicker,
  helperText,
  min,
  max,
  disableFutureDates,
  disablePastDates,
  disabledDates,
}: Props) {
  const views = [
    "year",
    "day",
    "hours",
    "minutes",
    "seconds",
  ] as DateOrTimeView[];

  const shouldDisableDates = (day: Date) => {
    return disabledDates?.find((date) => isSameDay(date, day)) !== undefined;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {timePicker ? (
        <DateTimePicker
          views={views}
          slotProps={{
            textField: { size: "small", helperText: helperText, id: id },
          }}
          disableFuture={disableFutureDates}
          disablePast={disablePastDates}
          minDateTime={min}
          maxDateTime={max}
          shouldDisableDate={shouldDisableDates}
        />
      ) : (
        <DatePicker
          slotProps={{
            textField: {
              size: "small",
              helperText: helperText,
              id: id,
            },
          }}
          disableFuture={disableFutureDates}
          disablePast={disablePastDates}
          minDate={min}
          maxDate={max}
          shouldDisableDate={shouldDisableDates}
        />
      )}
    </LocalizationProvider>
  );
}
