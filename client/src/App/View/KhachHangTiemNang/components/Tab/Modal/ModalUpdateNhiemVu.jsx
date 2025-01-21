import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "../../../../../Until/validateYup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from "moment";
import { validateDatePicker } from "../../../../../Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { useGetAllMucDoUuTienQuery, useGetAllTrangThaiThucHienQuery } from "src/App/Api/GetDataApi";
import { useUpdateNhiemVuMutation } from "src/App/Api/NhiemVuApi";
// ------ Form Config ------ //
const modelObj = {
  tieuDe: "tieuDe",
  moTa: "moTa",
  hanHoanThanh: "hanHoanThanh",
  mucDoUuTienId: "mucDoUuTienId",
  trangThaiThucHienId: "trangThaiThucHienId",
  khachHangTiemNangId: "khachHangTiemNangId",
},
  labelObj = {
    tieuDe: "Tiêu đề",
    moTa: "Mô tả ",
    hanHoanThanh: "Hạn hoàn thành",
    mucDoUuTienId: "Mức độ ưu tiên",
    trangThaiThucHienId: "Trạng thái thực hiện",
  },
  initialFormState = {
    [modelObj.tieuDe]: "",
    [modelObj.moTa]: "",
    [modelObj.hanHoanThanh]: new Date(),
    [modelObj.mucDoUuTienId]: "",
    [modelObj.trangThaiThucHienId]: "",
    [modelObj.khachHangTiemNangId]: "",
  },
  schema = yup.object().shape({
    [modelObj.tieuDe]: validateString(),
    [modelObj.hanHoanThanh]: validateDatePicker(),
    [modelObj.mucDoUuTienId]: validateString(),
    [modelObj.trangThaiThucHienId]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Xem nhiệm vụ",
  };
  return title[typeModal] ?? "";
};

const ModalUpdateNhiemVu = (props) => {
  const {
    showModal,
    closeModal,
    typeModal,
    setLoading,
    selectedItem,
    setTypeModal,
    refetch,
  } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    [updateNhiemVu] = useUpdateNhiemVuMutation(),
    header = getHeader(typeModal);
  const { data: trangThaiThucHienData, isFetching: isGetTrangThaiThucHienFetching } =
    useGetAllTrangThaiThucHienQuery();
  const { data: mucDoUuTienData, isFetching: isGetMucDoUuTienFetching } =
    useGetAllMucDoUuTienQuery();
  const isLoading = isGetTrangThaiThucHienFetching || isGetMucDoUuTienFetching
  const submitForm = (data) => {
    const tempData = {
      id: data.id,
      [modelObj.tieuDe]: data[modelObj.tieuDe],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.hanHoanThanh]: moment(data[modelObj.hanHoanThanh]).format(),
      [modelObj.mucDoUuTienId]: data[modelObj.mucDoUuTienId],
      [modelObj.trangThaiThucHienId]: data[modelObj.trangThaiThucHienId],
      [modelObj.khachHangTiemNangId]: id,
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },
    callApiUpdate = async (paramData) => {
      try {
        await updateNhiemVu(paramData).unwrap();
        toast.success("Chỉnh sửa thành công ");
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận quản trị hệ thống");
      } finally {
        setLoading(false);
      }
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          id: selectedItem?.id,
          [modelObj.tieuDe]: selectedItem[modelObj.tieuDe],
          [modelObj.moTa]: selectedItem[modelObj.moTa],
          [modelObj.hanHoanThanh]: selectedItem[modelObj.hanHoanThanh],
          [modelObj.mucDoUuTienId]: selectedItem[modelObj.mucDoUuTienId],
          [modelObj.trangThaiThucHienId]: selectedItem[modelObj.trangThaiThucHienId],
          [modelObj.khachHangTiemNangId]: selectedItem[modelObj.khachHangTiemNangId],
        },
        { keepDirty: true }
      );
    };

  console.log(selectedItem[0]?.ngayBatDau)
  useEffect(() => {
    if (selectedItem[0] && typeModal === TYPE_MODAL.UPDATE) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0], typeModal]);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <RHFDrawer
    handleClose={closeModalWithOtherFunc}
    submitForm={submitForm}
    isOpen={showModal}
    header={header}
    type={typeModal}
    loading={isLoading}
    initialFormState={initialFormState}
    schema={schema}
    ref={modalRef}
  >
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <TextFieldRHF
          name={modelObj.tieuDe}
          label={labelObj.tieuDe}
          disabled={true}
          required
        />
      </Grid2>
      <Grid2 size={12}>
        <TextFieldRHF
          name={modelObj.moTa}
          label={labelObj.moTa}
          disabled={true}
          required
        />
      </Grid2>
      <Grid2 size={6}>
        <DateTimePickerRHF
          name={modelObj.hanHoanThanh}
          label={labelObj.hanHoanThanh}
          disabled={true}
          required
        />
      </Grid2> 
      <Grid2 size={12}>
        <AutocompleteRHF
          name={modelObj.mucDoUuTienId}
          label={labelObj.mucDoUuTienId}
          isGetOnlyId
          disabled={true}
          data={commonMapDataAutocomplete(mucDoUuTienData, "name")}
          skeletonLoading={isGetMucDoUuTienFetching}
        />
      </Grid2>
       <Grid2 size={12}>
        <AutocompleteRHF
          name={modelObj.trangThaiThucHienId}
          label={labelObj.trangThaiThucHienId}
          isGetOnlyId
          disabled={isLoading}
          data={commonMapDataAutocomplete(trangThaiThucHienData, "name")}
          skeletonLoading={isGetTrangThaiThucHienFetching}
        />
      </Grid2>
    </Grid2>
  </RHFDrawer>
  );
};

export default ModalUpdateNhiemVu;
