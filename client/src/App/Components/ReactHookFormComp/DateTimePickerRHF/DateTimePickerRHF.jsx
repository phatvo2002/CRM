import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { bool, func, string } from "prop-types";
import "./DateTimePickerRHF.styles.scss";
import { vi } from "date-fns/locale";
import { getError, getErrorMessage } from "src/ultis/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import PSCInputSkeleton from "src/components/PSCInputSkeleton";

const MIN_DATE = new Date("1900-01-01 00:00"),
  MAX_DATE = new Date("2200-01-01 00:00");

const DateTimePickerRHF = (props) => {
  const componentID = "DateTimePickerRHF",
    {
      name,
      minDate,
      maxDate,
      required,
      placeholder,
      skeletonLoading,
      onChangeCallback,
      ...otherProps
    } = props,
    {
      formState: { errors },
      control,
    } = useFormContext(),
    watchingMinDate = minDate ? useWatch({ control, name: minDate }) : MIN_DATE,
    watchingMaxDate = maxDate ? useWatch({ control, name: maxDate }) : MAX_DATE;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onBlur, onChange, ...rest } }) => (
        <PSCInputSkeleton loading={skeletonLoading}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DateTimePicker
              minDate={watchingMinDate}
              maxDate={watchingMaxDate}
              className={componentID}
              label="Date time picker dialog"
              disableToolbar
              variant="outlined"
              // size="small"
              format="dd/MM/yyyy hh:ss"
              inputVariant="outlined"
              fullWidth
              closeOnSelect={false}
              onChange={(x) => {
                onChange(x);
                onChangeCallback?.(x);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={getError(errors, name)}
                  helperText={getErrorMessage(errors, name)}
                  // size="small"
                  fullWidth
                  onBlur={onBlur}
                  required={required}
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

// Specifies Type for props:
DateTimePickerRHF.propTypes = {
  name: string.isRequired,
  minDate: string,
  maxDate: string,
  placeholder: string,
  required: bool,
  skeletonLoading: bool,
  onChangeCallback: func,
};

// Specifies Default for props:
DateTimePickerRHF.defaultProps = {
  minDate: "",
  maxDate: "",
  placeholder: "dd/mm/yyyy hh:ss",
  required: true,
  skeletonLoading: false,
};

export default memo(DateTimePickerRHF);
