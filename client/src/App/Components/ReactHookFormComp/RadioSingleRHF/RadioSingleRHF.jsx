import { Radio } from "@mui/material";
import React, { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { deepCompareObj } from "src/ultis/common";

const RadioSingleRHF = ({
  name,
  valueProps,
  disabled = false,
  ...otherProps
}) => {
  const { trigger } = useFormContext();
  return (
    <>
      <Controller
        render={({
          field: { onChange: onFieldChange, value },
          formState: { isSubmitting },
        }) => (
          <Radio
            {...otherProps}
            checked={valueProps === value}
            onChange={(e) => {
              onFieldChange(e);
              trigger(name);
            }}
            value={valueProps}
            name={name}
            disabled={disabled || isSubmitting}
          />
        )}
        onChange={([, data]) => data}
        name={name}
      />
    </>
  );
};

export default memo(RadioSingleRHF, deepCompareObj);
