import { Grid2 } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "src/App/Until/validateYup";
import moment from "moment";
import * as yup from "yup";
import { toast } from "react-toastify";
import { validateDatePicker } from "src/App/Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  useGetAllMucDoUuTienQuery,
  useGetAllTrangThaiThucHienQuery,
} from "src/App/Api/GetDataApi";
import { useAddNhiemVuMutation } from "src/App/Api/NhiemVuApi";
import { useGetUserByPhongBanIdQuery } from "src/App/Api/UserApi";
import { useGetKhachHangTiemNangByNguoiDungIdQuery, useGetKhachHangTiemNangByPhongBanIdContextQuery } from "src/App/Api/KhachHangTiemNangApi";
import { useGetKhachHangMucTieuByNguoiDungIdQuery, useGetKhachHangMucTieuByPhongBanIdQuery } from "src/App/Api/KhachHangMucTieuApi";
// ------ Form Config ------ //
const modelObj = {
    tieuDe: "tieuDe",
    moTa: "moTa",
    hanHoanThanh: "hanHoanThanh",
    khachHangTiemNangId: "khachHangTiemNangId",
    khachHangId:"khachHangId",
    mucDoUuTienId: "mucDoUuTienId",
    trangThaiThucHienId: "trangThaiThucHienId",
    nguoiDungId:"nguoiDungId",
  },
  labelObj = {
    tieuDe: "Tiêu đề",
    moTa: "Mô tả ",
    hanHoanThanh: "Hạn hoàn thành",
    mucDoUuTienId: "Mức độ ưu tiên",
    khachHangTiemNangId :"Tiềm năng",
    khachHangId :"Khách hàng ",
    trangThaiThucHienId: "Trạng thái thực hiện",
    nguoiDungId:"Nhân viên",
  },
  initialFormState = {
    [modelObj.tieuDe]: "",
    [modelObj.moTa]: "",
    [modelObj.hanHoanThanh]: new Date(),
    [modelObj.mucDoUuTienId]: "",
    [modelObj.trangThaiThucHienId]: null,
    [modelObj.khachHangTiemNangId]: null,
    [modelObj.khachHangId]: null,
    [modelObj.nguoiDungId]: "",
  },
  schema = yup.object().shape({
    [modelObj.tieuDe]: validateString(),
    [modelObj.hanHoanThanh]: validateDatePicker(),
    [modelObj.mucDoUuTienId]: validateString(),
    [modelObj.trangThaiThucHienId]: validateString(),
  });
// ------ End Of Form Config ------ //



export const ModalThemNhiemVu = (props) => {
  const {
      showModal,
      closeModal,
      typeModal,
      refetch,
    } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    isLoading = false,
    header = "Thêm nhiệm vụ";
  const [nguoidungId, setNguoiDungId] = useState('')
  const { data: trangThaiThucHienData, isFetching: isGetTrangThaiThucHienFetching } =
  useGetAllTrangThaiThucHienQuery({skip: showModal== false});
  const { data: nguoiDungData, isFetching: isGetNguoiDungFetching } =
  useGetUserByPhongBanIdQuery({skip: showModal== false});
  const { data: khachhangTiemNangData, isFetching: isGetKhachHangTiemNangFetching } =
  useGetKhachHangTiemNangByNguoiDungIdQuery(nguoidungId,{skip: showModal== false});
  const { data: khachhangMucTieuData, isFetching: isGetKhachHangMucTieuFetching } =
  useGetKhachHangMucTieuByNguoiDungIdQuery(nguoidungId,{skip: showModal== false});
  const { data: mucDoUuTienData, isFetching: isGetMucDoUuTienFetching } =
  useGetAllMucDoUuTienQuery({skip: showModal== false});
  const [addNhiemVu] = useAddNhiemVuMutation();
  const submitForm = (data) => {
      const tempData = {
        [modelObj.tieuDe]: data[modelObj.tieuDe],
        [modelObj.moTa]: data[modelObj.moTa],
        [modelObj.hanHoanThanh]: moment(data[modelObj.hanHoanThanh]).format(),
        [modelObj.mucDoUuTienId]: data[modelObj.mucDoUuTienId],
        [modelObj.trangThaiThucHienId]: data[modelObj.trangThaiThucHienId],
        [modelObj.khachHangTiemNangId]: data[modelObj.khachHangTiemNangId],
        [modelObj.khachHangId]: data[modelObj.khachHangId],
        [modelObj.nguoiDungId]: data[modelObj.nguoiDungId],
      };
        callApiInsert(tempData);
    },
    callApiInsert = async (data) => {
      try {
        await addNhiemVu(data).unwrap();
        toast.success("Thêm mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi khi xảy ra!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } 
    },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    };
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
          <TextAreaRHF
            name={modelObj.moTa}
            label={labelObj.moTa}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.nguoiDungId}
            label={labelObj.nguoiDungId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(nguoiDungData, "name")}
            skeletonLoading={isGetNguoiDungFetching}
            onChangeCallback={(e)=> setNguoiDungId(e)}
          />
        </Grid2>
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.khachHangTiemNangId}
            label={labelObj.khachHangTiemNangId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(khachhangTiemNangData, "name")}
            skeletonLoading={isGetKhachHangTiemNangFetching}
          />
        </Grid2>
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.khachHangId}
            label={labelObj.khachHangId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(khachhangMucTieuData, "name")}
            skeletonLoading={isGetKhachHangMucTieuFetching}
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.hanHoanThanh}
            label={labelObj.hanHoanThanh}
            disabled={isLoading}
            required
          />
        </Grid2> 
        <Grid2 size={12}>
          <AutocompleteRHF
            name={modelObj.mucDoUuTienId}
            label={labelObj.mucDoUuTienId}
            isGetOnlyId
            disabled={isLoading}
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


