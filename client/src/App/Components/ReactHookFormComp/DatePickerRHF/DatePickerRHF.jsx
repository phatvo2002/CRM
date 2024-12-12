import { memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { bool, func, string } from "prop-types";
import "./DatePickerRHF.styles.scss";
import { vi } from "date-fns/locale";
import { getError, getErrorMessage }  from "../../../Until/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import PSCInputSkeleton from "../../PSCInputSkeleton";
import { styled } from "@mui/material";
import Textfield from "../../../CustomCard"

// const MIN_DATE = new Date("1900-01-01"),
//   MAX_DATE = new Date("2200-01-01");
const StyledDatePicker = styled(Textfield)(() => ({
  "& .MuiInputBase-input": {
    padding: "16.5px 14px !important",
    height: "1.25em",
  },
}));
const DatePickerRHF = (props) => {
  const componentID = "DatePickerRHF",
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
    } = useFormContext();
  // watchingMinDate = minDate ? useWatch({ control, name: minDate }) : MIN_DATE,
  // watchingMaxDate = maxDate ? useWatch({ control, name: maxDate }) : MAX_DATE;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onBlur, onChange, ...rest } }) => (
        <PSCInputSkeleton loading={skeletonLoading}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DesktopDatePicker
              // minDate={watchingMinDate}
              // maxDate={watchingMaxDate}
              className={componentID}
              label="Date picker dialog"
              disableToolbar
              variant="outlined"
              size="small"
              format="dd/MM/yyyy"
              inputVariant="outlined"
              fullWidth
              closeOnSelect={false}
              onChange={(x) => {
                onChange(x);
                onChangeCallback?.(x);
              }}
              renderInput={(params) => (
                <StyledDatePicker
                  {...params}
                  error={getError(errors, name)}
                  helperText={getErrorMessage(errors, name)}
                  size="small"
                  fullWidth
                  onBlur={onBlur}
                  // required={required}
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
DatePickerRHF.propTypes = {
  name: string.isRequired,
  minDate: string,
  maxDate: string,
  placeholder: string,
  required: bool,
  skeletonLoading: bool,
  onChangeCallback: func,
};

// Specifies Default for props:
DatePickerRHF.defaultProps = {
  minDate: "",
  maxDate: "",
  placeholder: "dd/mm/yyyy",
  required: true,
  skeletonLoading: false,
};

export default memo(DatePickerRHF);
