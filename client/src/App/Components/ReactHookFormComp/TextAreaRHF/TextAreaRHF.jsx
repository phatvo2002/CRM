import { memo, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { bool, number, oneOf, oneOfType, string } from "prop-types";
import { getError ,getErrorMessage } from "../../../Until/common";
import { TextField } from "@mui/material";
import PSCInputSkeleton from "../../PSCInputSkeleton";
const TextAreaRHF = (props) => {
  const inputRef = useRef(),
    {
      name,
      direction,
      disabled,
      defaultValue,
      skeletonLoading,
      minRows,
      ...otherProps
    } = props,
    {
      formState: { errors, isSubmitting },
      control,
    } = useFormContext();

  useEffect(() => {
    if (inputRef.current?.dir) {
      inputRef.current.dir = direction;
    }
  }, []);
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
     
      render={({ field }) => (
        <PSCInputSkeleton
          loading={skeletonLoading}
          multiline={minRows > 1 ? minRows - 1 : 1}
        >
          <TextField
            inputRef={inputRef}
            {...field}
            fullWidth
            multiline
            rows={4}
            error={getError(errors, name)}
            helperText={getErrorMessage(errors, name)}
            inputProps={{
              autoComplete: "new-password",
            }}
          
            disabled={disabled || isSubmitting}
            minRows={minRows}
            {...otherProps}
          />
        </PSCInputSkeleton>
      )}
    />
  );
};

TextAreaRHF.propTypes = {
  name: string.isRequired,
  defaultValue: oneOfType([string, number]),
  skeletonLoading: bool,
  direction: oneOf(["ltr", "rtl"]),
  minRows: number,
};

TextAreaRHF.defaultProps = {
  direction: "ltr",
  skeletonLoading: false,
  defaultValue: "",
  minRows: 1,
};

export default memo(TextAreaRHF);
