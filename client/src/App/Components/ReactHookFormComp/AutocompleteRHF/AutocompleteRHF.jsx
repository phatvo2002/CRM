import { memo, Fragment, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { string, array, bool, func, number } from "prop-types";
import { getError, getErrorMessage } from "src/ultis/common";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { filterSelectedItemsAutocompleteRHF } from "src/ultis/mapData.helper";
import PSCInputSkeleton from "src/components/PSCInputSkeleton";

const AutocompleteRHF = (props) => {
  const {
      name,
      shouldFilterOptions,
      parentName,
      keyCompare,
      labelCompare,
      index,
      data,
      disabled,
      triggerInput,
      loading,
      loadingText,
      onFocusCallback,
      onChangeCallback,
      isGetOnlyId,
      skeletonLoading,
      ...otherProps
    } = props,
    {
      formState: { errors },
      control,
      trigger,
      getValues,
    } = useFormContext();

  const filterOptions = useCallback(() => {
    if (!shouldFilterOptions) {
      return {};
    }
    return {
      filterOptions: (options, state) => {
        const result = filterSelectedItemsAutocompleteRHF({
          data: options,
          valueArrFieldWatching: getValues(parentName),
          keyCompare: keyCompare,
          label: labelCompare,
        });

        let newOptions = [];
        result.forEach((element) => {
          if (
            element[labelCompare]
              ?.toLowerCase()
              .includes(state.inputValue.toLowerCase())
          ) {
            newOptions.push(element);
          }
        });

        return [
          !isGetOnlyId ? getValues(parentName)?.[index]?.[keyCompare] : null,
          ...newOptions,
        ].filter((x) => x);
      },
    };
  }, [shouldFilterOptions]);

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
              isGetOnlyId ? onChange(item?.value ?? "") : onChange(item);
              isGetOnlyId
                ? onChangeCallback?.(item?.value ?? "")
                : onChangeCallback?.(item);
            }}
            onFocus={() => {
              onFocusCallback && onFocusCallback();
              triggerInput && trigger(name);
            }}
            value={
              isGetOnlyId ? data?.find((r) => r.value === value) || null : value
            }
            options={data}
            disabled={disabled}
            getOptionLabel={(item) => item.label || ""}
            isOptionEqualToValue={(option, value) => {
              if (isGetOnlyId) {
                return option?.value === value?.value;
              }
              return value === "" || option?.value === value?.value;
            }}
            loading={loading}
            {...filterOptions()}
            loadingText={loadingText}
            noOptionsText="Chưa có dữ liệu ..."
            renderOption={(props, option) => {
              return (
                <li {...props} key={option?.value}>
                  {option?.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                // size="small"
                variant="outlined"
                error={getError(errors, name)}
                helperText={getErrorMessage(errors, name)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="primary" size={22} />
                      ) : null}
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

// Specifies Type for props:
AutocompleteRHF.propTypes = {
  name: string.isRequired,
  data: array, // Array Object ( must have 2 key {label , value} )
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

// Specifies the default values for props:
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

/*
    ----- Map data >>> Autocomplete Data -----
    commonMapDataAutocomplete : add 2 key ({label , value}) to object in array
    filterSelectedItemsAutocompleteRHF : Filter Selected Item ( remove them from array object )
    commonMapObjectToAutocompleteInitValue : Map Object Receive from API To Autocomplete Init Value
    getError : 2 case ( normal input , field array input )
    getErrorMessage : 2 case ( normal input , field array input )
*/
