import DualListBox from "react-dual-listbox";
import { Controller } from "react-hook-form";
import { DLB_BUTTON } from "src/ultis/constant";
import { commonMapDataDualListBox } from "src/ultis/mapData.helper";
import { translateDualListBox } from "src/ultis/translate.helper";

const DualListboxRHF = ({
  name,
  options = [],
  label = "",
  availableHeader = "",
  selectedHeader = "",
  disabled = false,
  ...otherProps
}) => {
  return (
    <>
      <Controller
        render={({ field: { onChange, value, ref } }) => (
          <DualListBox
            availableRef={ref}
            selected={commonMapDataDualListBox(value, label) ?? []}
            onChange={(selectedValue = []) => {
              onChange(
                options?.filter((x) =>
                  selectedValue?.some((item) => x?.id ? x?.id === item.value :  x?.oid === item.value)
                )
              );
            }}
            lang={{
              availableHeader,
              selectedHeader,
              ...translateDualListBox
            }}
            canFilter
            name={name}
            disabled={disabled}
            showHeaderLabels
            icons={DLB_BUTTON}
            allowDuplicates={false}
            simpleValue={false}
            options={commonMapDataDualListBox(options, label) ?? []}
            filterPlaceholder={"Tìm kiếm..."}
            {...otherProps}
          />
        )}
        name={name}
      />
    </>
  );
};

export default DualListboxRHF;
