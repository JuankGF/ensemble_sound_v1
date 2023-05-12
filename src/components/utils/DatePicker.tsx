import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  type DateOrTimeView,
  DatePicker,
  DateTimePicker,
  type DateTimeValidationError,
} from "@mui/x-date-pickers";
import { isSameDay } from "date-fns";
import { type PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";

type Props = {
  id?: string;
  timePicker?: boolean;
  helperText?: string;
  min?: Date;
  max?: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disabledDates?: Date[];
  className?: string;
  value?: Date | null;
  onChange: (
    value: Date | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => void;
  onBlur: () => void;
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
  className,
  value,
  onChange,
  onBlur,
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
            textField: {
              size: "small",
              helperText: helperText,
              id: id,
              required: true,
            },
          }}
          disableFuture={disableFutureDates}
          disablePast={disablePastDates}
          minDateTime={min}
          maxDateTime={max}
          shouldDisableDate={shouldDisableDates}
          onChange={onChange}
          value={value}
          onClose={onBlur}
          className={className}
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
          onChange={onChange}
          value={value}
          onClose={onBlur}
          className={className}
        />
      )}
    </LocalizationProvider>
  );
}
