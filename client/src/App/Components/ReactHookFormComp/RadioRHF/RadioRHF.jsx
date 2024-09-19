import { Controller, useFormContext } from "react-hook-form";
import { oneOf } from "prop-types";
import { memo } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const RadioRHF = (props) => {
  const {
      name,
      orientation,
      data,
      onChangeCallback,
      defaultValue,
      ...otherProps
    } = props,
    { control } = useFormContext();
  return (
    <Controller
      render={({ field }) => (
        <RadioGroup
          aria-label={name}
          defaultValue={defaultValue}
          // {...field}
          style={{
            flexDirection: orientation === "horizontal" ? "row" : "column",
          }}
        >
          {!!data &&
            data.map((ele, index) => {
              return (
                <FormControlLabel
                  key={index}
                  {...otherProps}
                  value={ele?.value ?? ""}
                  control={<Radio />}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    onChangeCallback?.(e.target.value);
                  }}
                  label={ele.label}
                />
              );
            })}
        </RadioGroup>
      )}
      name={name}
      control={control}
    />
  );
};

RadioRHF.prototype = {
  orientation: oneOf(["horizontal", "vertical"]),
};

RadioRHF.defaultProps = {
  orientation: "horizontal",
};

export default memo(RadioRHF);
