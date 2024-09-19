import moment from "moment/moment";
const DEFAULT_LOCALE = "vi-VN";

export const formatDateWithLocale = (
  paramDate,
  paramLocale = DEFAULT_LOCALE
) => {
  const dateFormat = new Date(paramDate).toLocaleDateString(paramLocale);
  return dateFormat;
};

export const dateFormat = (date) => {
  if (date != null || date != undefined) {
    return moment(date).format("DD/MM/YYYY");
  } else {
    return null;
  }
};

export const monthFormat = (date) => moment(date).format("MM/YYYY");
export const monthFormatOnlyMonth = (date) => moment(date).format("MM");

export const yearFormat = (date) => moment(date).format("YYYY");

export const numberFormat = (number) => {
  return number.toLocaleString("en").replace(/,/g, ".");
};

export const formatDateBeforeSubmit = (date) => new Date(date).toDateString();
export const formatList = (data, x) => {
  let currentData = data;
  if (x === "NgaySinh") {
    return currentData ? moment(currentData).format("DD/MM/YYYY") : null;
  }
  if (
    x === "kinhPhiHoTro" ||
    x === "KinhPhiDuKien" ||
    x === "KinhPhiDeNghiHoTro"
  ) {
    return [`${numberFormat(currentData || 0)}`];
  }
  if (x === "ThoiGianNghienCuuDuKien") {
    return [`${currentData || 0} tháng`];
  }
  if (x === "NgayBatDau" || x === "NgayKetThuc") {
    return dateFormat(currentData || 0);
  }

  return currentData;
};

export const CurrentStudyYear = () => {
  let result = "";
  let currentDate = new Date();
  let currentYear = parseInt(currentDate.getFullYear());
  let currentMonth = parseInt(currentDate.getMonth());
  if (currentMonth >= 9)
    result = currentYear + '-' + parseInt(currentYear + 1);
else
    result = parseInt(currentYear - 1) + '-' + currentYear;
  return result;
}
