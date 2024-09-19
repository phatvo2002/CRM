import { createContext, forwardRef, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  autocompleteClasses,
  ListSubheader,
  Popper,
  Skeleton,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import { VariableSizeList } from "react-window";
import { getError, getErrorMessage } from "src/ultis/common";

const LISTBOX_PADDING = 5;

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const renderRow = ({ data, index, style }) =>
  Object.hasOwn(data?.[index], "group") ? (
    <ListSubheader
      key={data?.[index]?.key}
      component="div"
      style={{
        ...style,
        top: style.top + LISTBOX_PADDING,
      }}
    >
      {data?.[index]?.group}
    </ListSubheader>
  ) : (
    <Typography
      component="li"
      {...data?.[index]?.props}
      noWrap
      style={{
        ...style,
        top: style.top + LISTBOX_PADDING,
      }}
    >
      {data?.[index]?.option?.label}
    </Typography>
  );

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => (
  <div ref={ref} {...props} {...useContext(OuterElementContext)} />
));
OuterElementType.displayName = "OuterElementType";

const useResetCache = (data) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
};

const ListboxComponent = forwardRef(({ children, ...other }, ref) => {
  const itemData = children
    ?.map((item) => [item, ...(item?.children || [])])
    ?.flat();

  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const gridRef = useResetCache(itemCount);

  const getChildSize = (child) =>
    Object.hasOwn(child, "group") ? 48 : itemSize;

  const getHeight = () =>
    itemCount > 8
      ? 8 * itemSize
      : itemData.map(getChildSize).reduce((a, b) => a + b, 0);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={15}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
ListboxComponent.displayName = "ListboxComponent";

const FormVirtualizedAutoComplete = ({
  name,
  label,
  options = [],
  onChange,
  defaultValue = null,
  alertType = true,
  disabled,
  isLoading = false,
  required,
  filterOption = null,
  ...otherProps
}) => {
  const {
    trigger,
    loading,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        render={({
          field: { onChange: onFieldChange, value, ref },
          formState: { isSubmitting },
        }) =>
          !disabled && (loading || isLoading || isSubmitting) ? (
            <Skeleton variant="rounded" width={"100%"}>
              <TextField variant="outlined" size="small" fullWidth />
            </Skeleton>
          ) : (
            <Autocomplete
              value={options?.find((r) => r.value === value) ?? null}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              disabled={disabled || isSubmitting}
              size="small"
              options={options}
              getOptionLabel={(option) => option?.label ?? ""}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(_, data) => {
                onFieldChange(data?.value ?? defaultValue);
                onChange?.(data?.value ?? defaultValue);
              }}
              onBlur={(e) => {
                //onFieldBlur(e);
                trigger(name);
              }}
              filterOptions={(options, state) =>
                options?.filter(
                  (option) =>
                    (filterOption?.(option) ?? true) &&
                    option?.label
                      ?.toLowerCase()
                      ?.includes(state?.inputValue?.toLowerCase())
                )
              }
              renderOption={(props, option) => ({ props, option })}
              renderGroup={(params) => params}
              renderInput={(params) => (
                <TextField
                  inputRef={ref}
                  error={getError(errors, name)}
                  helperText={getErrorMessage(errors, name)}
                  label={label}
                  {...params}
                  variant="outlined"
                  disabled={disabled}
                  fullWidth
                  required={required}
                />
              )}
              {...otherProps}
            />
          )
        }
        defaultValue={defaultValue}
        name={name}
      />
    </>
  );
};

export default FormVirtualizedAutoComplete;
