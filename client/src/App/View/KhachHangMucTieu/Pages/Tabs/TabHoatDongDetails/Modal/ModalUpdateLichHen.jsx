import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validateDatePicker } from "src/App/Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  useGetAllTrangThaiThucHienQuery,
} from "src/App/Api/GetDataApi";
import { useUpdateLichHenMutation } from "src/App/Api/LichhenApi";
import moment from "moment";
// ------ Form Config ------ //
const modelObj = {
  tieuDe: "tieuDe",
  moTa: "moTa",
  ngayBatDau: "ngayBatDau",
  ngayKetThuc: "ngayKetThuc",
  diaDiem: "diaDiem",
  trangThaiThucHienId: "trangThaiThucHienId",
  khachHangTiemNangId: "khachHangTiemNangId",
  khachHangMucTieuId: "khachHangMucTieuId"
},
  labelObj = {
    tieuDe: "Tiêu đề",
    moTa: "Mô tả ",
    ngayBatDau: "Ngày bắt đầu",
    ngayKetThuc: "Ngày kết thúc",
    diaDiem: "Địa điểm",
    trangThaiThucHienId: "Trạng thái thực hiện",
  },
  initialFormState = {
    [modelObj.tieuDe]: "",
    [modelObj.moTa]: "",
    [modelObj.ngayBatDau]: new Date(),
    [modelObj.ngayKetThuc]: new Date(),
    [modelObj.diaDiem]: "",
    [modelObj.trangThaiThucHienId]: "",
    [modelObj.khachHangTiemNangId]: "",
    [modelObj.khachHangMucTieuId]: ""
  },
  schema = yup.object().shape({
    [modelObj.tieuDe]: validateString(),
    [modelObj.moTa]: validateString(),
    [modelObj.ngayBatDau]: validateDatePicker(),
    [modelObj.ngayKetThuc]: validateDatePicker(),
    [modelObj.diaDiem]: validateString(),
    [modelObj.trangThaiThucHienId]: validateString(),
  });
// ------ End Of Form Config ------ //



const ModalUpdateLichHen = (props) => {
  const {
    showModal,
    closeModal,
    typeModal,
    selectedItem,
    refetch,
  } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    [updateLichHen, { isLoading: isUpdateCuocGoi }] =
      useUpdateLichHenMutation(),
    header = "Cập nhật lịch hẹn";
  const { data: trangThaiThucHienData, isFetching: isGetTrangThaiThucHienFetching } =
    useGetAllTrangThaiThucHienQuery();
  const isLoading =
    isUpdateCuocGoi;
  const submitForm = (data) => {
    const tempData = {
      id: data.id,
      [modelObj.tieuDe]: data[modelObj.tieuDe],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.ngayBatDau]: moment(data[modelObj.ngayBatDau]).format(),
      [modelObj.ngayKetThuc]: moment(data[modelObj.ngayKetThuc]).format(),
      [modelObj.diaDiem]: data[modelObj.diaDiem],
      [modelObj.trangThaiThucHienId]: data[modelObj.trangThaiThucHienId],
      [modelObj.khachHangTiemNangId]: null,
      [modelObj.khachHangMucTieuId]: id,
    };
    callApiUpdate(tempData);
  },
    callApiUpdate = async (paramData) => {
      try {
        await updateLichHen(paramData).unwrap();
        toast.success("Chỉnh sửa thành công thành công");
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
      }
    },
    closeModalWithOtherFunc = () => {
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
          [modelObj.ngayBatDau]: selectedItem[modelObj.ngayBatDau]
            ? new Date(selectedItem[modelObj.ngayBatDau])
            : null,
          [modelObj.ngayKetThuc]: selectedItem[modelObj.ngayKetThuc]
            ? new Date(selectedItem[modelObj.ngayKetThuc])
            : null,
          [modelObj.diaDiem]: selectedItem[modelObj.diaDiem],
          [modelObj.trangThaiThucHienId]: selectedItem[modelObj.trangThaiThucHienId],
          [modelObj.khachHangTiemNangId]: selectedItem[modelObj.khachHangTiemNangId],
          [modelObj.khachHangMucTieuId]: selectedItem[modelObj.khachHangMucTieuId],
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    if (selectedItem[0]) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0]]);

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
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.moTa}
            label={labelObj.moTa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.ngayBatDau}
            label={labelObj.ngayBatDau}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.ngayKetThuc}
            label={labelObj.ngayKetThuc}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <TextFieldRHF
            name={modelObj.diaDiem}
            label={labelObj.diaDiem}
            disabled={isLoading}
            required
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

export default ModalUpdateLichHen;
