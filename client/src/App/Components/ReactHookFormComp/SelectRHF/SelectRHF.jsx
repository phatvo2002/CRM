import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from "lodash";
import { string, array, bool } from 'prop-types';
import { getError } from 'src/ultis/common';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import { MUI_Select_Theme } from 'src/ultis/themes';
import PSCInputSkeleton from 'src/components/PSCInputSkeleton';

const FONT_SIZE_HELPER_TEXT = "0.8rem"
const SelectRHF = (props) => {
    const { name, label, data, required, skeletonLoading, ...otherProps } = props,
        labelId = `input-label-${name}`,
        { formState: { errors }, control } = useFormContext(),
        getErrorMessage = () => {
            if (errors[name]) return <FormHelperText sx={{ fontSize: FONT_SIZE_HELPER_TEXT }}>{errors[name]?.message}</FormHelperText>;
            if (get(errors, name)?.message) return <FormHelperText sx={{ fontSize: FONT_SIZE_HELPER_TEXT }}>{get(errors, name)?.message}</FormHelperText>;
            return "";
        }

    return (
        <Controller
            render={({ field }) => (
                <ThemeProvider theme={MUI_Select_Theme}>
                    <FormControl
                        error={getError(errors, name)}
                        variant="outlined"
                        size="small"
                        required={Boolean(required)}
                        fullWidth
                    >
                        <PSCInputSkeleton loading={skeletonLoading}>
                            {/* Label */}
                            <InputLabel id={labelId}>{label}</InputLabel>
                            <Select
                                // Fix Bug Material-UI TextField Outline Label  is overlapping with border when conditionally rendered
                                labelId={labelId}
                                label={label}
                                {...field}
                                {...otherProps}
                                sx={{
                                    height: "36.7px",
                                    width: "100%"
                                }}
                            >
                                {
                                    !!data && data.map((ele, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                value={ele.value}
                                            >
                                                {ele.label}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            {getErrorMessage()}
                        </PSCInputSkeleton>
                    </FormControl>
                </ThemeProvider>
            )}
            name={name}
            control={control}
        />
    )
}

SelectRHF.prototype = {
    name: string.isRequired,
    label: string,
    data: array,
    required: bool,
    skeletonLoading: bool,
}

SelectRHF.defaultProps = {
    data: [],
    required: false,
    skeletonLoading: false
}

export default memo(SelectRHF);