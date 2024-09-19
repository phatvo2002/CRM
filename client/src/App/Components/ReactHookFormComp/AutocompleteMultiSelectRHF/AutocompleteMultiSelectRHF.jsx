import { Fragment, useEffect, useState } from "react";
import { array, bool, func, string } from "prop-types";
import { Autocomplete, Checkbox, CircularProgress, createFilterOptions, TextField, Chip } from "@mui/material";
import PSCInputSkeleton from "src/components/PSCInputSkeleton";
import { number } from "prop-types";
import { getError, getErrorMessage } from "src/ultis/common";
import { Controller, useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { filterSelectedItemsAutocompleteRHF } from "src/ultis/mapData.helper";

const PSCAutocompleteMultiSelect = (props) => {
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
                        multiple
                        id="multiple-limit-tags"
                        options={data}
                        getOptionLabel={(item) => item.label || ""}
                        value={value}
                        renderInput={(params) => (
                            <TextField {...params}/>
                        )}
                    />
                    {/* <Autocomplete
                        multiple
                        onBlur={onBlur}
                        // onChange={(event, item) => {
                        //     isGetOnlyId ? onChange(item?.value ?? "") : onChange(item);
                        //     isGetOnlyId
                        //         ? onChangeCallback?.(item?.value ?? "")
                        //         : onChangeCallback?.(item);
                        // }}
                        // onFocus={() => {
                        //     onFocusCallback && onFocusCallback();
                        //     triggerInput && trigger(name);
                        // }}
                        value={value}
                        options={data}
                        disabled={disabled}
                        getOptionLabel={(item) => item.label || ""}
                        // isOptionEqualToValue={(option, value) => {
                        //     if (isGetOnlyId) {
                        //         return option?.value === value?.value;
                        //     }
                        //     return value === "" || option?.value === value?.value;
                        // }}
                        loading={loading}
                        // {...filterOptions()}
                        loadingText={loadingText}
                        noOptionsText="Chưa có dữ liệu ..."
                        // renderOption={(props, option) => {
                        //     return (
                        //         <li {...props} key={option?.value}>
                        //             {option?.label}
                        //         </li>
                        //     );
                        // }}
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
                    /> */}
                </PSCInputSkeleton>
            )}
        />
    );
};

// Specifies Type for props:
PSCAutocompleteMultiSelect.propTypes = {
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
PSCAutocompleteMultiSelect.defaultProps = {
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

export default PSCAutocompleteMultiSelect;

// Example
/**
 * selectedItem ( State )
 * items ( Options || List )
 * setSelectedItem ( Set State )
 */
{/* <PSCAutocompleteMultiSelect
    initialValue={selectedItem}
    loading={QuanLyDeTai.isFetching || HoiDongDeTai.isFetching}
    items={mapDataDanhSachHoiDong(QuanLyDeTai?.data, "TenDeTai") ?? []}
    onChange={setSelectedItem}
    label="Label Autocomplete"
    placeholder="Nhấn vào để nhập (chọn) đề tài kèm chủ nhiệm"
    selectAllLabel="Chọn Tất Cả"
/> */}