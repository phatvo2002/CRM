/**
 * @Description Map Data Autocomplete
 * @param {Array} data Data receives from API
 * @param {String} label key obj >>> label autocomplete
 * @returns New Array
 */
const commonMapDataAutocomplete = (data, label) => {
  if (!data) return [];
  const tempData = data?.map((ele) => {
    if (!ele) {
      return;
    }
    return {
      ...ele,
      value: ele?.id ?? ele?.oid,
      label: ele?.name ?? ele?.tenGiaiDoan ?? ele?.tenKPI 
      ?? ele?.tenPhongban ?? ele?.tenBaoGia ??ele?.tenCoHoi 
      ??  ele?.tenNguonGoc?? ele?.tenLoaiTiemNang 
      ?? ele?.tenLoaiHinh ?? ele?.tenKhachHang 
      ?? ele?.tenLinhVuc ?? ele?.tenNganhNghe 
      ?? ele?.tenDoanhThu ?? ele?.tenPhongBan ?? ele?.tenChiNhanh
      ?? ele?.tenCuocGoi ?? `${ele?.hoVaDem} ${ele?.ten}`,
    };
  });
  return tempData?.filter((x) => x);
};

const commonMapDual = (data, label) => {
  if (!data) return [];
  const tempData = data?.map((ele) => {
    if (!ele) {
      return;
    }
    return {
      ...ele,
      value: ele?.id ?? ele?.oid,
      label: ele?.id ? ele?.id + "-" + ele?.name : ele?.name,
    };
  });
  return tempData?.filter((x) => x);
};
/**
 * @Description Map Data Autocomplete Checkbox Tree
 * @param {Array} data Data receives from API
 * @param {String} label key obj >>> label autocomplete
 * @returns New Array
 */
const commonMapDataAutocompleteCheckBoxTree = (data, label) => {
  if (!data) return [];

  return data
    .filter((ele) => ele)
    .map((ele) => ({
      ...ele,
      value: ele.Id ?? ele.oid,
      label: ele[label],
      icon: '',
      children: (ele.menus || []).map((child) => ({
        ...child,
        value: child.Id ?? child.oid,
        label: child[label],
        icon: ''
      })),
    }))
    .filter((x) => x);
};



const commonMapDataDualListBox = (data, label) =>
commonMapDual(data, label);

/**
 * @Description Map Data Autocomplete Filter Selected Item
 * @param {Array} data Data receives from API
 * @param {Array} valueArrFieldWatching Value receives from field arr RHF (value of fieldNameControl)
 * @param {String} keyCompare Key Name Filter
 * @param {String} label key obj >>> label autocomplete
 * @returns Array Filtered
 */
const filterSelectedItemsAutocompleteRHF = (obj) => {
  const { data, valueArrFieldWatching, keyCompare, label } = obj;
  const watchFieldArrId = [...valueArrFieldWatching]
    ?.map((x) => x[keyCompare]?.value || x[keyCompare])
    ?.filter((x) => x);
  const tempData = data?.map((ele) => {
    return {
      ...ele,
      value: ele?.Id ?? ele?.Oid,
      label: ele?.[label] ,
    };
  });
  const filterData = tempData?.filter((item) => {
    return !watchFieldArrId?.includes(item.value);
  });
  return filterData ?? [];
};

const getNameFieldArray = (mainName, i, subName) => {
  return `${mainName}.${i}.${subName}`;
};

/**
 * @Description Convert Object Value To Array
 * @param {obj} Object convert
 * @returns New Array
 */


export {
  commonMapDataAutocomplete,
  commonMapDataAutocompleteCheckBoxTree,
  commonMapDataDualListBox,
  filterSelectedItemsAutocompleteRHF,
  getNameFieldArray,
 
};
