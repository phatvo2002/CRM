import { memo, Fragment, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { string, array, bool, func, number } from "prop-types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { filterSelectedItemsAutocompleteRHF } from "../../../Until/mapData.helper";
import PSCInputSkeleton from "../../PSCInputSkeleton";
import { getError, getErrorMessage } from "../../../Until/common";

const AutocompleteRHF = (props) => {
  const {
    name,
    shouldFilterOptions,
    parentName,
    keyCompare,
    labelCompare,
    index,
    data = [],
    disabled = false,
    triggerInput = false,
    loading = false,
    loadingText = "Đang Tải...",
    onFocusCallback,
    onChangeCallback,
    isGetOnlyId = false,
    skeletonLoading = false,
    ...otherProps
  } = props;

  const {
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useFormContext();

  const filterOptions = useCallback(() => {
    if (!shouldFilterOptions) return {};

    return {
      filterOptions: (options, state) => {
        const filteredData = filterSelectedItemsAutocompleteRHF({
          data: options,
          valueArrFieldWatching: getValues(parentName),
          keyCompare,
          label: labelCompare,
        });

        const inputValue = state.inputValue.toLowerCase();
        const filteredOptions = filteredData.filter((item) =>
          item[labelCompare]?.toLowerCase().includes(inputValue)
        );

        const currentSelection = !isGetOnlyId
          ? getValues(parentName)?.[index]?.[keyCompare]
          : null;

        return [currentSelection, ...filteredOptions].filter(Boolean);
      },
    };
  }, [
    shouldFilterOptions,
    parentName,
    keyCompare,
    labelCompare,
    getValues,
    index,
    isGetOnlyId,
  ]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={isGetOnlyId ? "" : null}
      render={({ field: { onBlur, onChange, value } }) => (
        <PSCInputSkeleton loading={skeletonLoading}>
          <Autocomplete
            onBlur={onBlur}
            onChange={(event, item) => {
              const newValue = isGetOnlyId ? item?.value || "" : item || null;
              onChange(newValue);
              onChangeCallback?.(newValue);
            }}
            onFocus={() => {
              onFocusCallback?.();
              if (triggerInput) trigger(name);
            }}
            value={
              isGetOnlyId
                ? data.find((r) => r.value === value) || null
                : value
            }
            options={data}
            disabled={disabled}
            getOptionLabel={(item) => item.label || ""}
            isOptionEqualToValue={(option, value) => {
              return isGetOnlyId
                ? option?.value === value?.value
                : value === "" || option?.value === value?.value;
            }}
            loading={loading}
            {...filterOptions()}
            loadingText={loadingText}
            noOptionsText="Chưa có dữ liệu ..."
            renderOption={(props, option) => (
              <li {...props} key={option?.value}>
                {option?.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={getError(errors, name)}
                helperText={getErrorMessage(errors, name)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading && <CircularProgress color="primary" size={22} />}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
                {...otherProps}
              />
            )}
          />
        </PSCInputSkeleton>
      )}
    />
  );
};

AutocompleteRHF.propTypes = {
  name: string.isRequired,
  data: array, // Array of objects ({label, value})
  disabled: bool,
  triggerInput: bool,
  onFocusCallback: func,
  loading: bool,
  loadingText: string,
  shouldFilterOptions: bool,
  keyCompare: string,
  labelCompare: string,
  parentName: string,
  index: number,
  isGetOnlyId: bool,
  onChangeCallback: func,
  skeletonLoading: bool,
};

AutocompleteRHF.defaultProps = {
  data: [],
  disabled: false,
  triggerInput: false,
  loading: false,
  shouldFilterOptions: false,
  loadingText: "Đang Tải...",
  keyCompare: "",
  labelCompare: "",
  parentName: "",
  index: 0,
  isGetOnlyId: false,
  skeletonLoading: false,
};

export default memo(AutocompleteRHF);
