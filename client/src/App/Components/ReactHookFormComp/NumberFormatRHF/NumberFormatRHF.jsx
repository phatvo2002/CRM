import { NumericFormat } from "react-number-format";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { string, bool, oneOf } from "prop-types";
import { getErrorMessage ,getError} from "src/App/Until/common";
import { TextField } from "@mui/material";
import { forwardRef } from "react";
import PSCInputSkeleton from "../../InputSkeleton";
import "./NumberFormatRHF.styles.scss";

const X = forwardRef(function X(props, ref) {
    const { errorclone, helpertextclone, ...otherParams } = props;

    return (
      <TextField
        {...otherParams}
        inputRef={ref}
        fullWidth
        error={errorclone}
        helperText={helpertextclone}
      />
    );
  }),
  getLabel = (required) => (label) => (direction) => {
    if (!label) return "";
    switch (true) {
      case required && direction === "ltr":
        return `${label} *`;
      case required && direction === "rtl":
        return ` ${label} *`;
      default:
        return label;
    }
  };

const NumberFormatRHF = (props) => {
  const {
      name,
      inputTotal,
      fields,
      triggerInput,
      direction,
      readOnly,
      displayType,
      label,
      required,
      skeletonLoading,
      ...otherProps
    } = props,
    {
      formState: { errors },
      setValue,
      getValues,
      control,
      trigger,
    } = useFormContext(),
    styleInput = (paramDirection) => {
      let style = {};
      if (paramDirection === "rtl") {
        return (style = { textAlign: "right" });
      }
      return style;
    },
    fieldValues = fields && getValues(fields),
    _label = getLabel(required)(label)(direction);

  useEffect(() => {
    if (inputTotal && fieldValues) {
      const total = fieldValues.reduce((p, c) => {
        return p + c;
      }, 0);
      setValue(name, total);
    }
  }, fieldValues);
  return (
    <Controller
      render={({ field: { onChange, onBlur, ref, value } }) => {
        return (
          <PSCInputSkeleton loading={skeletonLoading}>
            <NumericFormat
              className="text-right"
              value={value}
              customInput={X}
              getInputRef={ref}
              onValueChange={(target) => {
                if (!inputTotal && !readOnly) {
                  onChange(target.floatValue ?? null);
                  setValue(name, target.floatValue ?? null);
                }
              }}
              onBlur={(e) => {
                onBlur(e);
                triggerInput && trigger(name);
              }}
              displayType={displayType}
              // dir={direction}
              disabled={readOnly}
              // style={styleInput(direction)}
              thousandSeparator="."
              decimalSeparator=","
              size="small"
              // variant="outlined"
              label={_label}
              errorclone={
                displayType === "text" ? undefined : getError(errors, name)
              }
              helpertextclone={
                displayType === "text" ? "" : getErrorMessage(errors, name)
              }
              {...otherProps}
            />
          </PSCInputSkeleton>
        );
      }}
      name={name}
      control={control}
    />
  );
};

NumberFormatRHF.propTypes = {
  name: string,
  inputTotal: bool,
  triggerInput: bool,
  //direction: oneOf(["ltr", "rtl"]),
  displayType: oneOf(["input", "text"]),
  readOnly: bool,
  skeletonLoading: bool,
};

NumberFormatRHF.defaultProps = {
  inputTotal: false, // Sum All Value To Inp ( Field Array )
  fields: null, // All Field Name ( Field Array )
  triggerInput: false, // trigger ( Field Array should use )
  //direction: "rtl",
  readOnly: false,
  skeletonLoading: false,
  displayType: "input",
  label: "",
};

export default NumberFormatRHF;
