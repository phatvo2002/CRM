import { string, date, number, object, mixed, ref, array } from "yup";
import { dateFormat, monthFormat } from "./format";

const errorMessage = {
  string: "Vui lòng nhập (chọn) dữ liệu vào ô phía trên",
  date: "Vui lòng nhập (chọn) ngày đúng định dạng (dd/mm/yyyy)",
  yearOfBirthMax: "Vui lòng nhập lại năm sinh (nhỏ hơn năm hiện tại)",
  yearOfBirthMin: "Vui lòng nhập lại năm sinh (từ năm 1900 đến năm hiện tại)",
  endDate: "Vui lòng nhập (chọn) lại ngày kết thúc (dd/mm/yyyy)",
  month: "Vui lòng nhập (chọn) lại tháng",
  endMonth: "Vui lòng nhập (chọn) lại tháng kết thúc",
  number: "Vui lòng nhập đúng số",
  email: "Vui lòng nhập đúng định dạng email",
  numberInteger: "Vui lòng nhập đúng số nguyên dương",
  numberLessThanMin: "Vui lòng nhập số lớn hơn",
  numberLessThanMax:
    "Lưu ý tổng danh sách điểm của tất cả thành viên không vượt quá ",
  numberGreaterThanMax: "Vui lòng nhập số nhỏ hơn",
  phoneNumber: "Vui lòng nhập đúng số điện thoại",
  phoneNumberMax: "Số điện thoại tối đa 10 số",
  minRow: "Vui lòng thêm ít nhất 1 dòng để lưu!",
  maxPercent: "Vui lòng nhập tổng cộng 100%",
  ConfirmPassword: "Phải trùng với mật khẩu ",
  checkbox: "Vui lòng nhập (chọn) ít nhất 1 dòng",
  time: "Thời gian kết thúc phải sau thời gian bắt đầu"
};

// Regex && Constant
const PHONE_NUMBER_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  MIN_DATE = new Date("1900-01-01"),
  MAX_DATE = new Date("2200-01-01"),
  CHECK_MONTH = "month",
  CHECK_DATE = "date",
  CURRENT_DATE = new Date(),
  MIN_SCORE = 0,
  MAX_SCORE = 9999;
// ---------------------------- COMMON YUP VALIDATE FUNCTION ---------------------------- //
const validateString = () => {
  return string().nullable().trim().required(errorMessage.string);
};
const validateArray = () => {
  return array()
    .of(string().trim())
    .min(1, errorMessage.checkbox)
    .required(errorMessage.string);
};
const validateConfirmPassword = (val) => {
  return string()
    .nullable()
    .oneOf([ref(`${val}`), null], errorMessage.ConfirmPassword)
    .required(errorMessage.string);
};
// Sub Func Validate
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
const isMonthBefore = (paramDateEnd, paramDateStart) => {
  if (paramDateEnd && paramDateStart) {
    return paramDateStart.getMonth() > paramDateEnd.getMonth();
  }
};
const validateDatePicker = () => {
  return date(errorMessage.date)
    .nullable()
    .typeError(errorMessage.date)
    .default(null)
    .min(MIN_DATE, errorMessage.date)
    .max(MAX_DATE, errorMessage.date)
    .required(errorMessage.date);
};
const validateTime = (startTime) => {
    return date(errorMessage.date)
          .nullable()
          .typeError(errorMessage.date)
          .min(new Date(startTime),errorMessage.time)
         // .default(startTime > endTime , errorMessage.time)
          .required(errorMessage.date)
}
/**
 * Check Year Of Birth
 * @param {string}  name fieldName
 * @returns Schema (obj)
 */
const validateYearOfBirth = (name) => {
  return mixed()
    .test({
      name,
      test: function (dateParam) {
        switch (true) {
          case !dateParam: //Check end is falsy value
            return this.createError({
              message: "Vui lòng nhập (chọn) năm sinh đúng định dạng (YYYY)",
              path: name,
            });
          case !isDateValid(dateParam):
            return this.createError({
              message: "Vui lòng nhập (chọn) năm sinh đúng định dạng (YYYY)",
              path: name,
            });
          case dateParam.getYear() > CURRENT_DATE.getYear():
            return this.createError({
              message: errorMessage.yearOfBirthMax,
              path: name,
            });
          case dateParam.getYear() <= MIN_DATE.getYear():
            return this.createError({
              message: errorMessage.yearOfBirthMin,
              path: name,
            });
          default:
            return true;
        }
      },
    })
    .required(errorMessage.date);
};
/**
 * Check Date End or Month End
 * @param {string}  fieldName Field Name date(month) end
 * @param {string}  startDateFieldNameCompare Field Name in RHF need to compare
 * @param {string}  option option to compare ( check date or check month )
 * @returns Schema (obj)
 */
// const validateEndDateGreaterThanOrEqualStartDate = (
//   fieldName,
//   startDateFieldNameCompare,
//   option = CHECK_DATE,
//   condition,
//   isLoaiDeTai = false
// ) => {
//   if (typeOf(condition) === "boolean" && !condition) return null;
//   if (isLoaiDeTai) return null;
//   return mixed()
//     .test({
//       name: fieldName,
//       test: function (valueDateEnd) {
//         const valueDateStart = this.options.parent[startDateFieldNameCompare];
//         valueDateEnd = valueDateEnd ? new Date(valueDateEnd) : valueDateEnd;
//         switch (true) {
//           case !valueDateEnd: //Check endDate is falsy value
//             return this.createError({
//               message:
//                 option === CHECK_DATE ? errorMessage.date : errorMessage.month,
//               path: fieldName,
//             });
//           case !isDateValid(valueDateEnd):
//             return this.createError({
//               message:
//                 option === CHECK_DATE ? errorMessage.date : errorMessage.month,
//               path: fieldName,
//             });
//           case (option === CHECK_DATE &&
//             valueDateEnd.getTime() > MAX_DATE.getTime()) ||
//             valueDateEnd.getTime() < MIN_DATE.getTime():
//             return this.createError({
//               message:
//                 option === CHECK_DATE
//                   ? errorMessage.endDate
//                   : errorMessage.endMonth,
//               path: fieldName,
//             });
//           // Check endDate greater than start or not equal
//           case option === CHECK_DATE &&
//             isBefore(valueDateEnd, valueDateStart) &&
//             dateFormat(valueDateEnd) !== dateFormat(valueDateStart):
//             return this.createError({
//               message: errorMessage.endDate,
//               path: fieldName,
//             });
//           case option === CHECK_MONTH &&
//             isMonthBefore(valueDateEnd, valueDateStart) &&
//             monthFormat(valueDateEnd) !== monthFormat(valueDateStart):
//             return this.createError({
//               message: errorMessage.endMonth,
//               path: fieldName,
//             });
//           default:
//             return true;
//         }
//       },
//     })
//     .required(
//       option === CHECK_DATE ? errorMessage.endDate : errorMessage.endMonth
//     );
// };

const validateNumber = () => {
  return number()
    .integer(errorMessage.numberInteger)
    .positive(errorMessage.numberInteger)
    .nullable()
    .required(errorMessage.number);
};

/**
 * This func can be validate value:
 *     1. isNumber
 *     2. Less Than Min
 *     3. Greater Than Max
 *     4. Compare field value to the value of another field
 * @param {String} name Main Field Name To Validate
 * @param {String} fieldNameCompare Field Name to compare ( option )
 * @param {number} min Min Number Integer ( option )
 * @param {number} max Min Number Integer ( option )
 * @param {bool} checkInteger check Integer ( option )
 * @returns Schema (obj)
 */
const validateNumberRHF =
  (name, fieldNameCompare) =>
    (min, max, checkInteger = true) => {
      return mixed()
        .test({
          name: name,
          test: function (numberParam) {
            const valueFieldNameCompare = this.options.parent[fieldNameCompare];
            const numberValue = Number(numberParam);
            switch (true) {
              // Input Empty
              case String(numberParam).trim() === "":
                return this.createError({
                  message: errorMessage.string,
                  path: name,
                });
              // Number Less Than 0
              case numberValue < 0:
                return this.createError({
                  message: errorMessage.numberInteger,
                  path: name,
                });
              // Not A Number
              case isNaN(numberValue) ||
                (checkInteger && !Number.isInteger(numberValue)):
                return this.createError({
                  message: errorMessage.numberInteger,
                  path: name,
                });
              // Number Less Than Min
              case String(min) && numberValue <= min:
                return this.createError({
                  message: `${errorMessage.numberLessThanMin} ${min}`,
                  path: name,
                });
              // Number Greater Than Max
              case String(max) && numberValue > max:
                return this.createError({
                  message: `${errorMessage.numberGreaterThanMax} ${max}`,
                  path: name,
                });
              // Number Greater Than Value FieldName Compare
              case valueFieldNameCompare && numberValue > valueFieldNameCompare:
                return this.createError({
                  message: `${errorMessage.numberGreaterThanMax}`,
                  path: name,
                });
              default:
                return true;
            }
          },
        })
        .required(errorMessage.number);
    };

const validatePhoneNumber = () => {
  return string()
    .max(10, errorMessage.phoneNumberMax)
    .matches(PHONE_NUMBER_REGEX, errorMessage.phoneNumber)
    .nullable()
    .required(errorMessage.string);
};

const validateEmail = () => {
  return string()
    .email(errorMessage.email)
    .nullable()
    .required(errorMessage.string);
};

const validateAutocomplete = () => {
  return object()
    .shape({
      value: string().required(errorMessage.string),
      label: string().required(errorMessage.string),
    })
    .nullable()
    .required(errorMessage.string);
};

const validateAutocompleteBaseOnCondition = (condition) => {
  if (!condition) return null;
  return validateAutocomplete().when({
    is: () => condition,
    then: validateAutocomplete(),
  });
};

const validateStringBaseOnCondition = (condition, max = 5000) => {
  if (!condition) return null;
  return validateString()
    .max(max, `Vui lòng nhập ít hơn ${max} ký tự`)
    .when({
      is: () => condition,
      then: (value) => value.required(errorMessage.string),
    });
};

const validateStringBaseOnConditionMultiple = (
  condition,
  max = 5000,
  isBoolean = false
) => {
  if (!condition) return null;
  if (!isBoolean) return null;
  return validateString()
    .max(max, `Vui lòng nhập ít hơn ${max} ký tự`)
    .when({
      is: () => condition,
      then: (value) => value.required(errorMessage.string),
    });
};

const validateNumberBaseOnCondition = (
  condition,
  minNumber = 0,
  isLoaiDeTai = false
) => {
  if (!condition) return null;
  if (isLoaiDeTai) return null;
  return number()
    .typeError(errorMessage.numberInteger)
    .min(minNumber, `${errorMessage.numberLessThanMin} ${minNumber}`)
    .nullable()
    .when({
      is: () => condition,
      then: (value) => value.required(errorMessage.string),
    });
};

const validateNumberBaseOnConditionMaxScore = (condition, maxNumber = 500) => {
  if (!condition) return null;
  return number()
    .typeError(errorMessage.numberInteger)
    .max(maxNumber, `${errorMessage.numberLessThanMax} ${maxNumber}`)
    .nullable()
    .when({
      is: () => condition,
      then: (value) => value.required(errorMessage.string),
    });
};

const validateDatePickerBaseOnCondition = (condition) => {
  if (!condition) return null;
  return validateDatePicker().when({
    is: () => condition,
    then: validateDatePicker(),
  });
};

const validateDatePickerBaseOnConditionMultiple = (condition, isLoaiDeTai) => {
  if (!condition) return null;
  if (isLoaiDeTai) return null;
  return validateDatePicker().when({
    is: () => condition,
    then: validateDatePicker(),
  });
};

export {
  // Message Obj
  errorMessage,
  // Constant
  MIN_SCORE,
  MAX_SCORE,
  MIN_DATE,
  MAX_DATE,
  CHECK_MONTH,
  CHECK_DATE,
  // Validate Func
  validateString,
  validateArray,
  validateConfirmPassword,
  validateDatePicker,
  validateYearOfBirth,
  validateNumber,
  validatePhoneNumber,
  validateEmail,
  validateAutocomplete,
  validateAutocompleteBaseOnCondition,
  validateDatePickerBaseOnConditionMultiple,
  validateNumberRHF,
  validateStringBaseOnCondition,
  validateStringBaseOnConditionMultiple,
  validateNumberBaseOnCondition,
  validateNumberBaseOnConditionMaxScore,
  validateDatePickerBaseOnCondition,
  validateTime
};
