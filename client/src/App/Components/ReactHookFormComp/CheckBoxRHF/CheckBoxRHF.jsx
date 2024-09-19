import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";
import "./CheckBoxRHF.styles.scss";
import { string, node, bool } from "prop-types";
import { Checkbox } from "@mui/material";
import PSCInputSkeleton from "src/components/PSCInputSkeleton";
import { deepCompareObj } from "src/ultis/common";

const CheckBoxRHF = (props) => {
  const component = "CheckBoxRHFWrapper",
    _id = uuid(),
    { name, label, style, skeletonLoading, ...otherProps } = props,
    { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <PSCInputSkeleton loading={skeletonLoading}>
          <div className={component} style={style}>
            <Checkbox
              id={_id}
              {...otherProps}
              className="CheckBoxRHF"
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
            />
            {label && (
              <label className="disableSelect" htmlFor={_id}>
                {label}
              </label>
            )}
          </div>
        </PSCInputSkeleton>
      )}
    />
  );
};

// Specifies Type for props:
CheckBoxRHF.propTypes = {
  name: string.isRequired,
  label: node,
  skeletonLoading: bool,
};

// Specifies the default values for props:
CheckBoxRHF.defaultProps = {
  label: null,
  skeletonLoading: false,
};

export default memo(CheckBoxRHF, deepCompareObj);
