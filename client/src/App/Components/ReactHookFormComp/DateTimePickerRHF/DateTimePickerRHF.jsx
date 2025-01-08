import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { bool, func, string } from "prop-types";
import "./DateTimePickerRHF.styles.scss";
import { vi } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import PSCInputSkeleton from "../../PSCInputSkeleton";
import { getError, getErrorMessage } from "src/App/Until/common";

const MIN_DATE = new Date("1900-01-01T00:00:00");
const MAX_DATE = new Date("2200-01-01T00:00:00");

const DateTimePickerRHF = (props) => {
  const componentID = "DateTimePickerRHF";
  const {
    name,
    minDate,
    maxDate,
    required,
    placeholder,
    skeletonLoading,
    onChangeCallback,
    ...otherProps
  } = props;

  const {
    formState: { errors },
    control,
  } = useFormContext();

  // Watch the values of minDate and maxDate
  const watchingMinDateRaw = useWatch({ control, name: minDate });
  const watchingMaxDateRaw = useWatch({ control, name: maxDate });

  // Ensure minDate and maxDate are valid Date objects
  const watchingMinDate = minDate ? new Date(watchingMinDateRaw || MIN_DATE) : MIN_DATE;
  const watchingMaxDate = maxDate ? new Date(watchingMaxDateRaw || MAX_DATE) : MAX_DATE;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onBlur, onChange, value ,...rest} }) => (
        <PSCInputSkeleton loading={skeletonLoading}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DateTimePicker
              minDate={watchingMinDate}
              maxDate={watchingMaxDate}
              className={componentID}
              label="Ngày bắt đầu"
              inputFormat="dd/MM/yyyy HH:mm"
              value={value || null} // Ensure a default value
              onChange={(x) => {
                if (x instanceof Date && !isNaN(x)) {
                  onChange(x);
                  onChangeCallback?.(x);
                } else {
                  onChange(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth={true}
                  error={!!getError(errors, name)}
                  helperText={getErrorMessage(errors, name)}
                  onBlur={onBlur}
                  inputProps={{
                    ...params.inputProps,
                    placeholder,
                  }}
                />
              )}
              {...rest}
              {...otherProps}
            />
          </LocalizationProvider>
        </PSCInputSkeleton>
      )}
    />
  );
};

// Prop Types
DateTimePickerRHF.propTypes = {
  name: string.isRequired,
  minDate: string,
  maxDate: string,
  placeholder: string,
  required: bool,
  skeletonLoading: bool,
  onChangeCallback: func,
};

// Default Props
DateTimePickerRHF.defaultProps = {
  minDate: "",
  maxDate: "",
  placeholder: "",
  required: false,
  skeletonLoading: false,
};

export default memo(DateTimePickerRHF);
