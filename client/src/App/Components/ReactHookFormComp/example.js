import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  validateAutocomplete,
  validateDatePicker,
  validateEndDateGreaterThanOrEqualStartDate,
  validateNumberRHF,
  validateString,
} from "src/ultis/validateYup";
import * as yup from "yup";
/**
 * { 2 Way Import }
 */
// import TextFieldRHF from './TextFieldRHF';
// import DatePickerRHF from './DatePickerRHF';
// import CheckBoxRHF from './CheckBoxRHF';
// import RadioRHF from './RadioRHF';
// import SelectRHF from './SelectRHF';
// import SwitchRHF from './SwitchRHF';
// import AutocompleteRHF from './AutocompleteRHF';
import { Button, Card, Grid } from "@mui/material";
import {
  AutocompleteRHF,
  CheckBoxRHF,
  CKEditorRHF,
  DatePickerRHF,
  NumberFormatRHF,
  RadioRHF,
  RadioSingleRHF,
  SelectRHF,
  SwitchRHF,
  TextFieldRHF,
} from "./index";

const Test = () => {
  // Set Up Init State Here
  const initialFormState = {
    firstName: "",
    lastName: "",
    class: "",
    gender: "",
    startDate: new Date(),
    endDate: new Date(),
    testCheck: false,
    testRadio: "",
    testRadioSingle: "",
    testSelect: "",
    testSwitch: false,
    testAutocomplete: null,
    testNumberFormat: 0,
    testCKeditor: "",
  };

  // Name Field Control
  const modelObj = {
    firstName: "firstName",
    lastName: "lastName",
    class: "class",
    gender: "gender",
    startDate: "startDate",
    endDate: "endDate",
    testCheck: "testCheck",
    testRadio: "testRadio",
    testRadioSingle: "testRadioSingle",
    testSelect: "testSelect",
    testSwitch: "testSwitch",
    testAutocomplete: "testAutocomplete",
    testNumberFormat: "testNumberFormat",
    testCKeditor: "testCKeditor",
  };

  // Label Input
  const labelObj = {
    firstName: "Tên",
    lastName: "Họ,tên đệm",
    class: "Lớp",
    gender: "Giới Tính",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    testSelect: "Vui Lòng Chọn",
    testAutocomplete: "Autocomplete Test",
    testNumberFormat: "Number Formatter",
  };

  // Set Up Yup Validation Funcs With Dynamic field names
  const schema = yup.object().shape({
    [modelObj.firstName]: validateString(),
    [modelObj.lastName]: validateString(),
    [modelObj.class]: validateString(),
    [modelObj.gender]: validateString(),
    [modelObj.startDate]: validateDatePicker(),
    [modelObj.endDate]: validateEndDateGreaterThanOrEqualStartDate(
      modelObj.startDate
    ),
    [modelObj.testSelect]: validateString(),
    [modelObj.testAutocomplete]: validateAutocomplete(),
    // validateNumberRHF : u should pass a field name for all case
    [modelObj.testNumberFormat]: validateNumberRHF(modelObj.testNumberFormat)(
      0,
      100
    ), //Currying function >> need pass 2 param min && max
    [modelObj.testCKeditor]: validateString(),
  });

  /**
   * @Description - Config React Hook Form
   * @resolver - Config Yup Validation
   * @defaultValues - Setting Initial Value in Form
   * @mode - Setting Mode to validate form's data ( Recommend Mode All )
   * @shouldFocusError - Focus First Error
   * @shouldUseNativeValidation - Enable Native Web Browser Validation
   */
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState,
    mode: "all",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  // Get Method U Needed
  const { handleSubmit, reset } = methods;

  const submitForm = (data) => {
    alert(JSON.stringify(data));
    clearAllInput();
  };

  const clearAllInput = () => {
    reset(initialFormState);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <form
          // Temp Css
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit(submitForm)}
          noValidate
        >
          {/* Text Field */}
          <TextFieldRHF
            name={modelObj.firstName}
            label={labelObj.firstName}
            required
          />

          <TextFieldRHF
            name={modelObj.lastName}
            label={labelObj.lastName}
            required
          />

          <TextFieldRHF name={modelObj.class} label={labelObj.class} required />

          <TextFieldRHF
            name={modelObj.gender}
            label={labelObj.gender}
            required
          />
          {/* End Of Text Field */}

          {/* Date Picker */}
          <DatePickerRHF
            name={modelObj.startDate}
            label={labelObj.startDate}
            required
          />

          <DatePickerRHF
            name={modelObj.endDate}
            label={labelObj.endDate}
            required
          />
          {/* End Of Date Picker */}

          {/* Checkbox */}
          <CheckBoxRHF name={modelObj.testCheck} />
          {/* End Of Checkbox */}

          {/* Radio */}
          <RadioRHF
            name={modelObj.testRadio}
            data={[
              {
                label: "hello1",
                value: "hello1",
              },
              {
                label: "hello2",
                value: "hello2",
              },
            ]}
            orientation="vertical"
          />
          {/* End Radio */}

          {/* Radio Single*/}
          <RadioSingleRHF
            name={modelObj.testRadioSingle}
            color="primary"
            valueProps="false"
            disabled
          />
          {/* End Radio Single*/}
          {/* Select */}
          <SelectRHF
            name={modelObj.testSelect}
            label={labelObj.testSelect}
            data={[
              {
                label: "hello1",
                value: "hello1",
              },
              {
                label: "hello2",
                value: "hello2",
              },
            ]}
            required
          />
          {/* End Of Select */}

          {/* Switch */}
          <SwitchRHF name={modelObj.testSwitch} />
          {/* End Of Switch */}

          {/* Autocomplete */}
          <AutocompleteRHF
            name={modelObj.testAutocomplete}
            label={labelObj.testAutocomplete}
            data={[
              {
                label: "hello1",
                value: "hello1",
              },
              {
                label: "hello2",
                value: "hello2",
              },
            ]}
            required
          />
          {/* End Of Autocomplete */}

          {/* Number Formatter Input*/}
          <NumberFormatRHF
            name={modelObj.testNumberFormat}
            label={labelObj.testNumberFormat}
            suffix=" (VNĐ)"
            required
          />
          {/* End Of Number Formatter Input*/}

          {/* CKEditor */}
          <CKEditorRHF name={modelObj.testCKeditor} />
          {/* End Of CKEditor */}

          <Grid container>
            <Grid item xs={3}>
              <Button variant="contained" color="secondary" type="submit">
                Submit Form
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Card>
  );
};

export default Test;

/*
    Two Way submit outside form In react-hook-form
    1. Call this function >>> handleSubmit(submitForm)()
    2. Create button with attribute form="id-form"
    e.g:
    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
        your awesome form
    </form>
    <button type="submit" form="hook-form">Submit</button>
*/

// NumericFormat watching another field ( similar TextField )
// function NumberFormatWatchingAnotherField(props) {
//     const { control, fieldNameWatching, ...otherProp } = props
//      1. control : control method receive from parent component ( useForm or useFormContext )
//      2. fieldNameWatching : field name to watching value change event
//     const valueWatching = useWatch({
//         control,
//         name: fieldNameWatching,
//     });

//     return (
//         <NumberFormatRHF
//             disabled
//             value={valueWatching}
//             {...otherProp}
//             required
//             fullWidth
//         />
//     );
// }
